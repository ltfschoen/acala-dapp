import React, { ReactElement } from 'react';

import PageDeposit from '@acala-dapp/page-deposit';
import PageLoan from '@acala-dapp/page-loan';
import PageHoma from '@acala-dapp/page-homa';
import PageSwap from '@acala-dapp/page-swap';
import PageWallet from '@acala-dapp/page-wallet';
import PageGovernance from '@acala-dapp/page-governance';
import PageLoanCharts from '@acala-dapp/page-loan-charts';
import { Fadein } from '@acala-dapp/ui-components';

import { MainLayout } from './layouts/Main';
import { sideBarConfig } from './sidebar-config';

export interface RouterConfigData {
  children?: RouterConfigData[];
  element?: ReactElement;
  path: string;
  redirectTo?: string;
}

export const config: RouterConfigData[] = [
  {
    children: [
      {
        element: <Fadein key='wallet'><PageWallet /></Fadein>,
        path: 'wallet'
      },
      {
        element: <Fadein key='deposit'><PageDeposit /></Fadein>,
        path: 'deposit'
      },
      {
        element: <Fadein key='loan'><PageLoan /></Fadein>,
        path: 'loan'
      },
      {
        element: <Fadein key='homa'><PageHoma /></Fadein>,
        path: 'homa'
      },
      {
        element: <Fadein key='swap'><PageSwap /></Fadein>,
        path: 'swap'
      },
      {
        element: <Fadein key='governance'><PageGovernance /></Fadein>,
        path: 'governance'
      },
      {
        element: <PageLoanCharts />,
        path: 'anal/loan'
      },
      {
        path: '*',
        redirectTo: 'loan'
      }
    ],
    element: <MainLayout sideBarProps={{ config: sideBarConfig }} />,
    path: '*'
  }
];
