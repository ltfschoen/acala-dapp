import React, { FC, memo, ReactNode } from 'react';

import { CurrencyId } from '@acala-network/types/interfaces';
import { Table, TableConfig, Card } from '@acala-dapp/ui-components';
import { useAccounts, useConstants } from '@acala-dapp/react-hooks';

import { Token } from '../Token';
import { UserBalance } from '../UserBalance';
import { Price } from '../Price';
import { TransferButton } from '../TransferButton';

type TableData = CurrencyId[];

type TableShowCellType = 'token' | 'balance' | 'price' | 'amount' | 'action';

interface Props {
  title?: string;
  showHeader?: boolean;
  showCell?: TableShowCellType[];
}

export const WalletBalanceCard: FC<Props> = memo(({
  title,
  showHeader = false,
  showCell = ['token', 'balance', 'amount']
}) => {
  const { active } = useAccounts();
  const { allCurrencies: allToken } = useConstants();

  if (!active) {
    return null;
  }

  const _tableConfig: TableConfig[] = [
    {
      align: 'left',
      key: 'token',
      /* eslint-disable-next-line react/display-name */
      render: (token: CurrencyId): ReactNode => <Token currency={token} />,
      title: 'Token',
      width: 1
    },
    {
      align: 'right',
      key: 'balance',
      /* eslint-disable-next-line react/display-name */
      render: (token: CurrencyId): ReactNode => (
        <UserBalance
          token={token}
          withIcon={false}
        />
      ),
      title: 'Balance',
      width: 2
    },
    {
      align: 'right',
      key: 'price',
      /* eslint-disable-next-line react/display-name */
      render: (token): ReactNode => <Price currency={token} />,
      title: 'Price',
      width: 2
    },
    {
      align: 'right',
      key: 'amount',
      /* eslint-disable-next-line react/display-name */
      render: (token: CurrencyId): ReactNode => (
        <UserBalance
          token={token}
          withPrice
        />
      ),
      title: 'Amount',
      width: 2
    },
    {
      align: 'right',
      key: 'action',
      /* eslint-disable-next-line react/display-name */
      render: (token: CurrencyId): ReactNode => <TransferButton currency={token} />,
      title: 'Action',
      width: 2
    }
  ];

  const tableConfig = _tableConfig.filter((item) => {
    if (item.key) {
      return showCell.includes(item.key);
    }

    return true;
  });

  return (
    <Card
      header={title || 'Wallet Balance'}
      padding={false}
    >
      <Table
        cellClassName={'ac-font-black'}
        config={tableConfig}
        data={allToken}
        showHeader={showHeader}
        size='small'
      />
    </Card>
  );
});

WalletBalanceCard.displayName = 'WalletbalanceCard';
