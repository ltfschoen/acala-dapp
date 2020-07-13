import React, { FC } from 'react';

import AntTooltip, { TooltipProps as AntTooltipProps } from 'antd/lib/tooltip';
import { Condition } from './Condition';

export type PopoverProps = AntTooltipProps & {
  show: boolean;
}

export const Tooltip: FC<PopoverProps> = ({ children, show, ...other }) => {
  return (
    <Condition
      condition={show}
      or={children}
    >
      <AntTooltip
        autoAdjustOverflow
        {...other}
      >
        {children}
      </AntTooltip>
    </Condition>
  );
};
