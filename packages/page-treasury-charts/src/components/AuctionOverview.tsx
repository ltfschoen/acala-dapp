import React, { FC } from 'react';

import { Card, Grid } from '@acala-dapp/ui-components';
import { Statistic } from 'antd';
import { useAuctionOverview } from '@acala-dapp/react-hooks';
import { getTokenName } from '@acala-dapp/react-components';

export const AuctionOverview: FC = () => {
  const overview = useAuctionOverview();

  if (!overview) return null;

  return (
    <Grid container>
      <Grid
        item
        span={6}
      >
        <Card>
          <Statistic
            title='Total Target Auction'
            value={overview.totalTarget.toNumber(2, 2)}
          />
        </Card>
      </Grid>
      <Grid
        item
        span={6}
      >
        <Card>
          <Statistic
            title='Total Surplus Auction'
            value={overview.totalSurplus.toNumber(2, 2)}
          />
        </Card>
      </Grid>
      <Grid
        item
        span={6}
      >
        <Card>
          <Statistic
            title='Total Debit Auction'
            value={overview.totalDebit.toNumber(2, 2)}
          />
        </Card>
      </Grid>
      {
        overview.totalCollateral.map((item) => {
          return (
            <Grid
              item
              key={`collateral-${item.currency}`}
              span={6}
            >
              <Card>
                <Statistic
                  title={`Total Collateral Auction(${getTokenName(item.currency)})`}
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
