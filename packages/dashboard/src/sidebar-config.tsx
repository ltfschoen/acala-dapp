import React from 'react';

import { ReactComponent as LoanSVG } from '@acala-dapp/apps/assets/loan.svg';
import { ReactComponent as ExchangeSVG } from '@acala-dapp/apps/assets/exchange.svg';

import { SideBarConfig } from './types/sidebar';

export const sideBarConfig: SideBarConfig = {
  products: [
    {
      icon: <LoanSVG />,
      name: 'Loan',
      path: 'loan'
    },
    {
      icon: <ExchangeSVG />,
      name: 'Swap',
      path: 'swap'
    },
    {
      icon: <ExchangeSVG />,
      name: 'Treasury & Auction',
      path: 'treasury'
    }
  ]
};
