import React, { ReactNode, FC } from 'react';
import { BareProps } from './types';
import clsx from 'clsx';
import './NList.scss';

interface ItemProps extends BareProps {
  label: string | ReactNode;
  value: string | ReactNode;
}

const Item: FC<ItemProps> = ({
  className,
  label,
  value
}) => {
  return (
    <li className={clsx('aca-list__item', className)}>
      <div>{label}</div>
      <div>{value}</div>
    </li>
  );
};

type NListComponent = FC<BareProps> & { Item: FC<ItemProps> };

const _NList: FC<BareProps> = ({ children, className }) => {
  return (
    <ul className={clsx(className, 'aca-list')}>
      {children}
    </ul>
  );
};

(_NList as any).Item = Item;

export const NList = _NList as NListComponent;
