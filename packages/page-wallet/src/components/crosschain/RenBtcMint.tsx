import React, { FC, createContext, useState, useContext, useCallback } from 'react';
import clsx from 'clsx';

import { Fixed18 } from '@acala-network/app-util';
import { Form, List, Button } from '@acala-dapp/ui-components';
import { NBalanceInput, FormatAddress, FormatBalance, BalanceInput } from '@acala-dapp/react-components';

import classes from './RenBtc.module.scss';

type MintStep = 'input' | 'confirm' | 'watch' | 'success';

interface RenBtcMintContextData {
  step: MintStep;
  setStep: (step: MintStep) => void;
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
  const [form] = Form.useForm();
  const { setStep } = useContext(RenBtcMintContext);

  const handleNext = useCallback(() => {
    setStep('confirm');
  }, [setStep]);

  return (
    <div className={classes.step}>
      <Form
        form={form}
      >
        <Form.Item
          name='mint'
          rules={[{ min: 0.00035036, required: true, type: 'number' }]}
        >
          <NBalanceInput
            className={classes.input}
            token='XBTC'
          />
        </Form.Item>
      </Form>
      <List className={classes.inputStepInfo}>
        <List.Item
          className={clsx(classes.item, classes.destination)}
          label='Destination'
          value={
            <div>
              <FormatAddress address='0xE4A5sdfsdfsdfsd9b07c3662' />
            </div>
          }
        />
        <List.Item
          className={clsx(classes.item, classes.receive)}
          label='You will receive'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(1)}
              currency='XBTC'
            />
          }
        />
      </List>
      <div className={classes.actionArea}>
        <Button
          className={classes.nextBtn}
          color='primary'
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const ConfirmStep: FC = () => {
  const { setStep } = useContext(RenBtcMintContext);

  const handlePrev = useCallback(() => {
    setStep('input');
  }, [setStep]);

  return (
    <div className={classes.step}>
      <BalanceInput
        disabled={true}
        token='XBTC'
        value={1}
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
              <FormatAddress address='0xE4A5sdfsdfsdfsd9b07c3662' />
            </div>
          }
        />
        <List.Item
          className={classes.item}
          label='RenVM Fee'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(1)}
              currency='XBTC'
            />
          }
        />
        <List.Item
          className={classes.item}
          label='Bitcoin Network Fee'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(1)}
              currency='XBTC'
            />
          }
        />
        <List.Item
          className={classes.item}
          label='You Will Receive'
          value={
            <FormatBalance
              balance={Fixed18.fromNatural(1)}
              currency='XBTC'
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
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const Inner: FC = () => {
  const context = useContext(RenBtcMintContext);

  if (context.step === 'input') return <InputStep />;

  if (context.step === 'confirm') return <ConfirmStep />;

  return null;
};

export const RenBtcMint: FC = () => {
  const [step, setStep] = useState<MintStep>('input');

  return (
    <RenBtcMintContext.Provider
      value={{
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