import React, { FC, useContext } from 'react';

import { Card, List } from '@acala-dapp/ui-components';
import { getTokenName } from '@acala-dapp/react-components';
import { convertToFixed18 } from '@acala-network/app-util';
import { FormatFixed18 } from '@acala-dapp/react-components/format/FormatFixed18';

import { StakingPoolContext } from './StakingPoolProvider';

export const SystemInfo: FC = () => {
  const { stakingPool, stakingPoolHelper } = useContext(StakingPoolContext);

  if (!stakingPoolHelper || !stakingPool) {
    return null;
  }

  return (
    <Card header='System Info'
      padding={false}>
      <List style='list'>
        <List.Item
          label={`Exchange Rate (${getTokenName(stakingPool.stakingCurrency)} / ${getTokenName(stakingPool.liquidCurrency)})`}
          value={<FormatFixed18 data={stakingPoolHelper.liquidExchangeRate} />}
        />
        <List.Item
          label='Max Bonding Ratio'
          value={
            <FormatFixed18
              data={convertToFixed18(stakingPool.maxBondRatio)}
              format='percentage'
            />
          }
        />
        <List.Item
          label='Min Bonding Ratio'
          value={
            <FormatFixed18
              data={convertToFixed18(stakingPool.minBondRatio)}
              format='percentage'
            />
          }
        />
      </List>
    </Card>
  );
};
