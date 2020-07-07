import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { CurrencyId } from '@acala-network/types/interfaces';

import { Card } from '@acala-dapp/ui-components';
import { useConstants } from '@acala-dapp/react-hooks';
import { TokenImage, TokenName, UserAssetBalance, UserAssetValue } from '@acala-dapp/react-components';

import classes from './WalletBalance.module.scss';
import { BareProps } from '@acala-dapp/ui-components/types';

interface BalanceProps extends BareProps {
  currency: CurrencyId;
}

export const Balance: FC<BalanceProps> = ({ className, currency }) => {
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
          decimalLength={2}
        />
        <UserAssetValue
          className={classes.amount}
          currency={currency}
          prefix='≈ US $'
        />
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
