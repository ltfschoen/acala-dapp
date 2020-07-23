import React, { FC, useMemo } from 'react';
import { Table } from 'antd';

import { Card, Tabs } from '@acala-dapp/ui-components';
import { useCollateralAuctions, useConstants, useDebitAuctions, useSurplusAuction, CollateralAuction, DebitAuction, SurplusAuction } from '@acala-dapp/react-hooks';
import { Token, FormatAddress, FormatBalance } from '@acala-dapp/react-components';

export const CollateralAuctionList: FC<{ data: CollateralAuction[]}> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'owner',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatAddress
            address={item.owner}
            withCopy
          />
        ),
        title: 'owner'
      },
      {
        key: 'currency',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <Token currency={item.currency} />,
        title: 'Currency'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={item.currency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'target',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.target}
            currency={stableCurrency}
          />
        ),
        title: 'Target'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Collateral Debit'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const DebitAuctionList: FC<{ data: DebitAuction[]}> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={stableCurrency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'fix',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.fix}
            currency={stableCurrency}
          />
        ),
        title: 'Fix Amount'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Debit Auction'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const SurplusAuctinList: FC<{ data: SurplusAuction[] }> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={stableCurrency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Surplus Auction'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const AuctionList: FC = () => {
  const collateralAuctions = useCollateralAuctions();
  const debitAuctions = useDebitAuctions();
  const surplusAuctions = useSurplusAuction();

  return (
    <Tabs
      defaultKey='collateral'
      type='button'
    >
      <Tabs.Panel
        key='collateral'
        tab={`Collateral Auction (${collateralAuctions.length})`}
      >
        <CollateralAuctionList data={collateralAuctions}/>
      </Tabs.Panel>
      <Tabs.Panel
        key='debit'
        tab={`Debit Auction (${debitAuctions.length})`}
      >
        <DebitAuctionList data={debitAuctions} />
      </Tabs.Panel>
      <Tabs.Panel
        key='surplus'
        tab={`Surplus Auction (${surplusAuctions.length})`}
      >
        <SurplusAuctinList data={surplusAuctions} />
      </Tabs.Panel>
    </Tabs>
  );
};
