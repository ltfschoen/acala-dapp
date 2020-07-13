import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { CurrencyId } from '@acala-network/types/interfaces';

import { Card, Condition } from '@acala-dapp/ui-components';
import { useConstants, useBalance } from '@acala-dapp/react-hooks';
import { TokenImage, TokenName, UserAssetBalance, UserAssetValue, tokenEq, StakingPoolExchangeRate } from '@acala-dapp/react-components';

import classes from './WalletBalance.module.scss';
import { BareProps } from '@acala-dapp/ui-components/types';

interface BalanceProps extends BareProps {
  currency: CurrencyId;
}

export const Balance: FC<BalanceProps> = ({ className, currency }) => {
  const { liquidCurrency } = useConstants();
  const liquidBalance = useBalance(liquidCurrency);

  return (
    <div className={clsx(classes.item, className)}>
      <TokenImage
        className={classes.image}
        currency={currency}
      />
      <div className={classes.content}>
        <TokenName
          className={classes.name}
          currency={currency}
        />
        <UserAssetBalance
          className={classes.balance}
          currency={currency}
        />
        <Condition
          condition={tokenEq(currency, liquidCurrency)}
          or={
            <UserAssetValue
              className={classes.amount}
              currency={currency}
              prefix='≈US$'
            />
          }>
          <StakingPoolExchangeRate
            className={classes.amount}
            liquidAmount={liquidBalance}
            showLiquidAmount={false}
          />
        </Condition>
      </div>
    </div>
  );
};

export const WalletBalance: FC = () => {
  const { allCurrencies } = useConstants();

  return (
    <Card
      contentClassName={classes.cardContent}
      divider={false}
      header='Wallet Balance'
      padding={false}
    >
      {
        allCurrencies.map((currency: CurrencyId): ReactNode => (
          <Balance
            currency={currency}
            key={`wallet-balance-${currency.toString()}`}
          />
        ))
      }
    </Card>
  );
};
