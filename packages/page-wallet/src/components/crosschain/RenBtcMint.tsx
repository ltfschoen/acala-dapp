import React, { FC, createContext, useState, useContext, useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import { noop } from 'lodash';
import clsx from 'clsx';
import { ajax } from 'rxjs/ajax';

import { Fixed18 } from '@acala-network/app-util';
import { List, Button, Grid, Condition, Modal, Dialog } from '@acala-dapp/ui-components';
import { NBalanceInput, FormatAddress, FormatBalance, BalanceInput } from '@acala-dapp/react-components';

import classes from './RenBtc.module.scss';
import { useFormValidator, useAccounts, useModal } from '@acala-dapp/react-hooks';
import { RenBtcDialog } from './RenBtcDialog';

type MintStep = 'input' | 'confirm' | 'watch' | 'success';

interface RenBtcMintContextData {
  step: MintStep;
  setStep: (step: MintStep) => void;
  amount: number;
  setAmount: (value: number) => void;
}

const RenBtcMintContext = createContext<RenBtcMintContextData>({} as RenBtcMintContextData);

const Alert: FC = () => {
  return (
    <div className={classes.alert}>
      <p>
        RenVM is new technology and security audits don't completely
      </p>
      <p>
        eliminate risks. Please don’t supply assets you can’t afford to lose.
      </p>
    </div>
  );
};

const InputStep: FC = () => {
  const { setAmount, setStep } = useContext(RenBtcMintContext);
  const validator = useFormValidator({
    amount: {
      min: 0,
      type: 'number'
    }
  });
  const form = useFormik({
    initialValues: {
      amount: '' as unknown as number
    },
    onSubmit: noop,
    validate: validator
  });

  const isDisabled = useMemo<boolean>((): boolean => {
    return !form.values.amount;
  }, [form]);

  const handleInput = useCallback((value?: number) => {
    form.setFieldValue('amount', value);
  }, [form]);

  const handleNext = useCallback(() => {
    setAmount(form.values.amount);
    setStep('confirm');
  }, [setAmount, setStep, form]);

  return (
    <div className={classes.step}>
      <Grid container>
        <Grid item>
          <NBalanceInput
            className={classes.input}
            onChange={handleInput}
            token='BTC'
            value={form.values.amount}
          />
        </Grid>
        <Grid item>
          <List className={classes.inputStepInfo}>
            <List.Item
              className={clsx(classes.item, classes.destination)}
              label='From'
              value={
                <div>BTC NetWork</div>
              }
            />
            <List.Item
              className={clsx(classes.item, classes.receive)}
              label='You will receive'
              value={
                <>
                  <span>≈</span>
                  <FormatBalance
                    balance={form.values.amount ? Fixed18.fromNatural(form.values.amount) : Fixed18.ZERO}
                    currency='RenBTC'
                  />
                </>
              }
            />
          </List>
        </Grid>
      </Grid>
      <div className={classes.actionArea}>
        <Button
          className={classes.nextBtn}
          color='primary'
          disabled={isDisabled}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const ConfirmStep: FC = () => {
  const { amount, setStep } = useContext(RenBtcMintContext);
  const { active } = useAccounts();
  const { close, open, status } = useModal();

  const handlePrev = useCallback(() => {
    setStep('input');
  }, [setStep]);

  const handleNext = useCallback(() => {
    if (!active) return;

    ajax.post(
      'https://apps.acala.network/faucet/ren',
      { address: active.address },
      {
        'Content-Type': 'application/json'
      }
    ).subscribe();

    open();
  }, [open, active]);

  return (
    <div className={classes.step}>
      <Dialog
        onCancel={close}
        onConfirm={close}
        visiable={status}
      >
        <p style={{ fontSize: 19, fontWeight: 'bold' }}>Sorry that the RenVM for Acala is still in develop, we will send you some RenBTC from the faucet for test.</p>
        <p style={{ fontSize: 14, color: '#999999' }}>you will receive 1 RenBTC and the frequency limit is one month.
        .</p>
      </Dialog>
      <BalanceInput
        disabled={true}
        token='XBTC'
        value={amount}
      />
      <List
        className={classes.confirmInfo}
        style='list'
      >
        <List.Item
          className={classes.item}
          label='Destination'
          value={
            <div>
              { active ? <FormatAddress address={active.address} /> : null }
            </div>
          }
        />
        <List.Item
          className={classes.item}
          label='RenVM Fee'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(0.000001)}
              currency='BTC'
            />
          }
        />
        <List.Item
          className={classes.item}
          label='Bitcoin Network Fee'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(0.000001)}
              currency='BTC'
            />
          }
        />
        <List.Item
          className={classes.item}
          label='You Will Receive'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(amount - 0.000002)}
              currency='RenBTC'
            />
          }
        />
      </List>
      <div className={classes.actionArea}>
        <Button
          className={classes.prevBtn}
          onClick={handlePrev}
          type='ghost'
        >
          Previous
        </Button>
        <Button
          className={classes.nextBtn}
          color='primary'
          onClick={handleNext}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const Inner: FC = () => {
  const context = useContext(RenBtcMintContext);

  return (
    <>
      <Condition condition={context.step === 'input'}>
        <InputStep />
      </Condition>
      <Condition condition={context.step !== 'input'}>
        <ConfirmStep />
      </Condition>
      <RenBtcDialog show={context.step === 'success'} />
    </>
  );
};

export const RenBtcMint: FC = () => {
  const [step, setStep] = useState<MintStep>('input');
  const [amount, setAmount] = useState<number>(0);

  return (
    <RenBtcMintContext.Provider
      value={{
        amount,
        setAmount,
        setStep,
        step
      }}
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <Alert />
          <Inner />
        </div>
      </div>
    </RenBtcMintContext.Provider>
  );
}