import React, { FC, useMemo, useCallback, useState, useRef } from 'react';
import { noop } from 'lodash';

import { Fixed18 } from '@acala-network/app-util';
import { Card, Tabs, NList } from '@acala-dapp/ui-components';
import { TxButton, TwoWayBalanceInput, FormatBalance } from '@acala-dapp/react-components';
import { useConstants, useStakingPoolHelper } from '@acala-dapp/react-hooks';

import classes from './ExpressConsole.module.scss';

const Price: FC = () => {
  const { liquidCurrency, stakingCurrency } = useConstants();
  const helper = useStakingPoolHelper();

  const exchangeRate = useMemo<Fixed18>((): Fixed18 => {
    if (!helper) return Fixed18.ZERO;

    return Fixed18.fromNatural(1).div(helper.liquidExchangeRate);
  }, [helper]);

  return (
    <FormatBalance
      pair={[
        {
          balance: 1,
          currency: stakingCurrency
        },
        {
          balance: exchangeRate,
          currency: liquidCurrency
        }
      ]}
      pairSymbol='='
    />
  );
};

const StakePanel: FC = () => {
  const { liquidCurrency, stakingCurrency } = useConstants();
  const helper = useStakingPoolHelper();
  const [amount, setAmount] = useState<number>(0);
  const resetForm = useRef<() => void>(noop);
  const [error, setError] = useState<boolean>(false);

  const exchangeRate = useMemo<Fixed18>((): Fixed18 => {
    if (!helper) return Fixed18.ZERO;

    return Fixed18.fromNatural(1).div(helper.liquidExchangeRate);
  }, [helper]);

  const params = useMemo(() => {
    return [Fixed18.fromNatural(amount).innerToString()];
  }, [amount]);

  const isDisabled = useMemo<boolean>((): boolean => {
    if (!amount) return true;

    return error;
  }, [error, amount]);

  const onSuccess = useCallback(() => {
    setAmount(0);
    resetForm.current();
  }, [setAmount]);

  return (
    <div className={classes.panelContent}>
      <div className={classes.main}>
        <TwoWayBalanceInput
          className={classes.balanceInput}
          exchangeRate={exchangeRate}
          exposeReset={(reset: () => void): void => { resetForm.current = reset; }}
          initCurrencies={[stakingCurrency, liquidCurrency]}
          onChange={setAmount}
          onError={setError}
          swap={false}
        />
        <NList>
          <NList.Item
            label='Price'
            value={<Price />}
          />
        </NList>
      </div>
      <TxButton
        className={classes.actionBtn}
        disabled={isDisabled}
        method='mint'
        onSuccess={onSuccess}
        params={params}
        section='homa'
        size='large'
      >
        Stake
      </TxButton>
    </div>
  );
};

const UnStakePanel: FC = () => {
  const { liquidCurrency, stakingCurrency } = useConstants();
  const helper = useStakingPoolHelper();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const resetForm = useRef<() => void>(noop);
  const exchangeRate = useMemo<Fixed18>((): Fixed18 => {
    if (!helper) return Fixed18.ZERO;

    return helper.liquidExchangeRate;
  }, [helper]);

  const params = useMemo(() => {
    return [Fixed18.fromNatural(amount).innerToString(), 'Immediately'];
  }, [amount]);

  const isDisabled = useMemo<boolean>((): boolean => {
    if (!amount) return true;

    return error;
  }, [error, amount]);

  const onSuccess = useCallback(() => {
    setAmount(0);
    resetForm.current();
  }, [setAmount]);

  const fee = useMemo<Fixed18>((): Fixed18 => {
    if (!helper || !amount) return Fixed18.ZERO;

    return helper.claimFee(Fixed18.fromNatural(amount), helper.currentEra);
  }, [helper, amount]);

  return (
    <div className={classes.panelContent}>
      <div className={classes.main}>
        <TwoWayBalanceInput
          className={classes.balanceInput}
          exchangeRate={exchangeRate}
          exposeReset={(reset: () => void): void => { resetForm.current = reset; }}
          initCurrencies={[liquidCurrency, stakingCurrency]}
          onChange={setAmount}
          onError={setError}
        />
        <NList>
          <NList.Item
            label='Price'
            value={<Price />}
          />
          <NList.Item
            label='Fee'
            value={
              <FormatBalance
                balance={fee}
                currency={liquidCurrency}
              />
            }
          />
        </NList>
      </div>
      <TxButton
        className={classes.actionBtn}
        disabled={isDisabled}
        method='redeem'
        onSuccess={onSuccess}
        params={params}
        section='homa'
        size='large'
      >
        Unstake
      </TxButton>
    </div>
  );
};

export const ExpressConsole: FC = () => {
  return (
    <Card
      padding={false}
    >
      <Tabs type='card'>
        <Tabs.Panel
          key='stake'
          tab='Stake'
        >
          <StakePanel />
        </Tabs.Panel>
        <Tabs.Panel
          key='unstake'
          tab='Unstake'
        >
          <UnStakePanel />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};
