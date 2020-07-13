import React, { FC, memo, ReactNode, useMemo } from 'react';

import { BareProps } from '@acala-dapp/ui-components/types';
import { Copy } from '@acala-dapp/ui-components';
import Identicon from '@polkadot/react-identicon';

import classes from './format.module.scss';

const LAMINAR = '5CLaminarAUSDCrossChainTransferxxxxxxxxxxxxxwisu';

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
    if (address === LAMINAR) {
      return 'Laminar';
    }

    if (withFullAddress) {
      return address;
    }

    return address.replace(/(\w{6})\w*?(\w{6}$)/, '$1......$2');
  }, [address, withFullAddress]);

  return (
    <Copy
      className={className}
      render={(): ReactNode => {
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
      }}
      text={address}
      withCopy={withCopy}
    />
  );
});

FormatAddress.displayName = 'FormatAddress';
