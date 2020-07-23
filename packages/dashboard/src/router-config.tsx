import React, { ReactElement, lazy, LazyExoticComponent, Suspense } from 'react';

import { PageLoading } from '@acala-dapp/ui-components';

import { MainLayout } from './layouts/Main';
import { sideBarConfig } from './sidebar-config';

export interface RouterConfigData {
  children?: RouterConfigData[];
  element?: ReactElement | LazyExoticComponent<any>;
  path: string;
  redirectTo?: string;
}

const PageLoanCharts = lazy(() => import('@acala-dapp/page-loan-charts'));
const PageSwapCharts = lazy(() => import('@acala-dapp/page-swap-charts'));
const PageTreasuryCharts = lazy(() => import('@acala-dapp/page-treasury-charts'));

export const config: RouterConfigData[] = [
  {
    children: [
      {
        element: <Suspense fallback={<PageLoading />}><PageLoanCharts/></Suspense>,
        path: 'loan'
      },
      {
        element: <Suspense fallback={<PageLoading />}><PageSwapCharts /></Suspense>,
        path: 'swap'
      },
      {
        element: <Suspense fallback={<PageLoading />}><PageTreasuryCharts /></Suspense>,
        path: 'treasury'
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
