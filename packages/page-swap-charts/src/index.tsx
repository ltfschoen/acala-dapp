import React, { FC } from 'react';

import { Page, Grid } from '@acala-dapp/ui-components';
import { SwapPool } from './components/SwapPool';
import { SwapPoolDetail } from './components/SwapPoolDetail';

const PageWallet: FC = () => {
  return (
    <Page>
      <Page.Title title='Swap Analysis' />
      <Page.Content fullscreen>
        <Grid container>
          <Grid
            item
            span={12}
          >
            <SwapPool />
          </Grid>
          <Grid
            item
            span={12}
          >
            <SwapPoolDetail />
          </Grid>
          <Grid
            item
            span={12}
          >
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageWallet;
