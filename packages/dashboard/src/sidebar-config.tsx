import React from 'react';

import { ReactComponent as LoanSVG } from '@acala-dapp/apps/assets/loan.svg';

import { SideBarConfig } from './types/sidebar';

export const sideBarConfig: SideBarConfig = {
  products: [
    {
      icon: <LoanSVG />,
      name: 'Loan',
      path: 'loan'
    }
  ]
};
