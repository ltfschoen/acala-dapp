import React, { FC } from 'react';
import { Steps } from 'antd';
import { Card, Grid } from '@acala-dapp/ui-components';

import { LockPrices } from './LockPrices';
import { EmergencyPrepeper } from './EmergencyPrepper';
import { EmergencyShutdownProvider } from './EmergencyShutdownProvider';
import { WithdrawNoDebitLoan } from './WithdrawNoDebitLoan';
import { RefundCollateral } from './RefundCollateral';

// import classes from './EmergencyShutdown.module.scss';
const { Step } = Steps;

export const Inner = (): JSX.Element => {
  // const { step } = useContext(EmergencyShutdownContext);

  return (
    <Grid
      container
    >
      <Grid item>
        <Card header={<p>Emergency Shutdown</p>}>
          <Steps>
            <Step title='Locked Collateral Prices'>
              <LockPrices />
            </Step>
            <Step title='Process System Debit And Auction Process'>
              <EmergencyPrepeper />
            </Step>
            <Step title='Waiting For Open Refund Collateral'>
              <RefundCollateral />
            </Step>
          </Steps>
        </Card>
      </Grid>
      <Grid item>
        <WithdrawNoDebitLoan />
      </Grid>
    </Grid>
  );
};

export const EmergencyShutdown: FC = () => {
  return (
    <EmergencyShutdownProvider>
      <Inner/>
    </EmergencyShutdownProvider>
  );
};
