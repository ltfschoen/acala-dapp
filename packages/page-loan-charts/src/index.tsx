import React, { FC } from 'react';

import { Page, Grid } from '@acala-dapp/ui-components';

import { CDPCOllateralRatio } from './components/CDPCollateralRatio';
import { TotalDebitAndCollateral } from './components/TotalDebitAndCollateral';

const PageWallet: FC = () => {
  return (
    <Page>
      <Page.Title title='Loan Analysis' />
      <Page.Content>
        <Grid container>
          <Grid span={6}>
            <TotalDebitAndCollateral />
          </Grid>
          <Grid span={6}>
            <CDPCOllateralRatio />
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageWallet;
