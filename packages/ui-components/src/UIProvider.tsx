import React, { FC } from 'react';

import 'antd/dist/antd.css';
import './styles/index.scss';
import './styles/global.css';
import { BareProps } from './types';

export const UIProvider: FC<BareProps> = ({ children }) => {
  return <>{children}</>;
};
