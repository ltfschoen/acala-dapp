import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';

import { Fixed18 } from '@acala-network/app-util';
import { BareProps } from '@acala-dapp/ui-components/types';
import { Tooltip } from '@acala-dapp/ui-components';

import { thousand, effectiveDecimal } from '../utils';
import classes from './format.module.scss';

export interface FormatFixed18Props extends BareProps {
  data?: Fixed18;
  format?: 'percentage' | 'number' | 'thousand';
  prefix?: string;
  primary?: boolean;
  withTooltip?: boolean;
  effectiveDecimalLength?: number;
  maxDecimalLength?: number;
}

export const FormatFixed18: FC<FormatFixed18Props> = ({
  className,
  data,
  effectiveDecimalLength = 2,
  format = 'thousand',
  maxDecimalLength = 6,
  prefix,
  primary = false,
  withTooltip = false
}) => {
  const _data = (data || Fixed18.ZERO);

  const getRenderText = (data: Fixed18): string => {

    let _text = '';

    if (!data.isFinity()) {
      return 'NaN';
    }

    if (format === 'number') {
      _text = effectiveDecimal(data.toString(18, 3), effectiveDecimalLength, maxDecimalLength);
    }

    if (format === 'thousand') {
      _text = effectiveDecimal(thousand(data.toNumber(18, 3)), effectiveDecimalLength, maxDecimalLength);
    }

    if (format === 'percentage') {
      _text = data.mul(Fixed18.fromNatural(100)).toString(2, 3) + '%';
    }

    return `${prefix || ''}${_text}`;
  };

  return (
    <Tooltip
      placement='left'
      show={withTooltip}
      title={_data.toString(18, 3)}
    >
      <span
        className={
          clsx(
            className,
            {
              [classes.primary]: primary
            }
          )
        }
      >
        {getRenderText(_data)}
      </span>
    </Tooltip>
  );
};
