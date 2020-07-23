import React, { FC } from 'react';

import { Card, Grid } from '@acala-dapp/ui-components';
import { Statistic } from 'antd';
import { useTreasuryOverview } from '@acala-dapp/react-hooks';
import { getTokenName } from '@acala-dapp/react-components';

export const TreasuryOverview: FC = () => {
  const overview = useTreasuryOverview();

  if (!overview) return null;

  return (
    <Grid container>
      <Grid
        item
        span={6}
      >
        <Card>
          <Statistic
            title='Surplus Pool'
            value={overview.surplusPool.toNumber(2, 2)}
          />
        </Card>
      </Grid>
      <Grid
        item
        span={6}
      >
        <Card>
          <Statistic
            title='Debit Pool'
            value={overview.debitPool.toNumber(2, 2)}
          />
        </Card>
      </Grid>
      {
        overview.totalCollaterals.map((item) => {
          return (
            <Grid
              item
              key={`collateral-${item.currency}`}
              span={6}
            >
              <Card>
                <Statistic
                  title={`Current Collateral(${getTokenName(item.currency)})`}
                  value={item.balance.toNumber(2, 2)}
                />
              </Card>
            </Grid>
          );
        })
      }
    </Grid>
  );
};
