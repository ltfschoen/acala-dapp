import React, { FC, memo } from 'react';

import { useApi } from '@acala-dapp/react-hooks';
import { BareProps } from '@acala-dapp/ui-components/types';

import classes from './ApiStatus.module.scss';
import clsx from 'clsx';

export const ApiStatus: FC<BareProps> = memo(({ className }) => {
  const { connected, error, loading, chain } = useApi();

  const getStatusText = (): string => {
    if (loading) {
      return 'Connecting';
    }

    if (error) {
      return 'Error';
    }

    if (connected) {
      return 'Connected';
    }

    return '';
  };

  return (
    <div className={
      clsx(
        classes.root,
        className,
        classes.status,
        {
          [classes.connected]: connected,
          [classes.error]: error,
          [classes.loading]: loading
        }
      )
    }>
      <p>{chain}</p>
    </div>
  );
});

ApiStatus.displayName = 'ApiStatus';
