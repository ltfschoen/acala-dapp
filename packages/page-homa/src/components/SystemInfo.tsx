import React, { FC, useContext, useEffect, useState, ReactNode } from 'react';
import { noop } from 'lodash';

import { Card, ListConfig, List } from '@honzon-platform/ui-components';
import { StakingPoolContext, formatCurrency } from '@honzon-platform/react-components';
import { convertToFixed18 } from '@acala-network/app-util';
import { FormatFixed18 } from '@honzon-platform/react-components/format/FormatFixed18';

export const SystemInfo: FC = () => {
  const { stakingPool, stakingPoolHelper } = useContext(StakingPoolContext);

  if (!stakingPoolHelper || !stakingPool) {
    return null;
  }

  const listConfig: ListConfig[] = [
    {
      key: 'liquidExchangeRate',
      title: `Exchange Rate (${formatCurrency(stakingPool.stakingCurrency)} / ${formatCurrency(stakingPool.liquidCurrency)})`,
      render: (data): ReactNode => <FormatFixed18 data={data} />
    },
    {
      key: 'currentRatio',
      title: 'Current Bonding Ratio',
      render: (data): ReactNode => (
        <FormatFixed18
          data={data}
          format='percentage'
        />
      )
    },
    {
      key: 'maxRatio',
      title: 'Max Bonding Ratio',
      render: (data): ReactNode => (
        <FormatFixed18
          data={data}
          format='percentage'
        />
      )
    },
    {
      key: 'minRatio',
      title: 'Min Bonding Ratio',
      render: (data): ReactNode => (
        <FormatFixed18
          data={data}
          format='percentage'
        />
      )
    },
  ];

  if (!stakingPool) {
    return null;
  }

  const listData = {
    liquidExchangeRate: stakingPoolHelper.liquidExchangeRate,
    currentRatio: stakingPoolHelper.communalBondedRatio,
    maxRatio: convertToFixed18(stakingPool.maxBondRatio),
    minRatio: convertToFixed18(stakingPool.minBondRatio)
  };

  return (
    <Card header='System Info' gutter={false}>
      <List config={listConfig} data={listData} />
    </Card>
  );
};