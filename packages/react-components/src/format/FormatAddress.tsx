import React, { FC, memo, useMemo, useCallback } from 'react';

import { BareProps } from '@acala-dapp/ui-components/types';
import { Copy } from '@acala-dapp/ui-components';
import Identicon from '@polkadot/react-identicon';

import classes from './format.module.scss';
import { LAMINAR_WATCHER_ADDRESS, LAMINAR_SENDER_ADDRESS } from '../utils';

interface Props extends BareProps {
  address: string;
  withFullAddress?: boolean;
  withCopy?: boolean;
  withIcon?: boolean;
  iconWidth?: number;
}

export const FormatAddress: FC<Props> = memo(({
  address,
  className,
  iconWidth = 22,
  withCopy = false,
  withFullAddress = false,
  withIcon = false
}) => {
  const _address = useMemo<string>((): string => {
    if (address === LAMINAR_WATCHER_ADDRESS || address === LAMINAR_SENDER_ADDRESS) {
      return 'Laminar';
    }

    if (withFullAddress) {
      return address;
    }

    if (!address) return '';

    return address.replace(/(\w{6})\w*?(\w{6}$)/, '$1......$2');
  }, [address, withFullAddress]);

  const renderInner = useCallback(() => {
    return (
      <>
        {withIcon ? (
          <Identicon
            className={classes.icon}
            size={iconWidth}
            theme='substrate'
            value={address}
          />
        ) : null }
        {_address}
      </>
    );
  }, [withIcon, _address, address, iconWidth]);

  if (withCopy) {
    return (
      <Copy
        className={className}
        display='Copy Address Success'
        render={renderInner}
        text={address}
        withCopy={withCopy}
      />
    );
  }

  return renderInner();
});

FormatAddress.displayName = 'FormatAddress';
