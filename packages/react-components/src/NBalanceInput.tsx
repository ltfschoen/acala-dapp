import React, { FC, FocusEventHandler, useState, ReactNode, ChangeEventHandler, useCallback, useMemo, forwardRef } from 'react';
import clsx from 'clsx';
import { FormikErrors } from 'formik';

import { CurrencyId } from '@acala-network/types/interfaces';
import { useApi } from '@acala-dapp/react-hooks';
import { BareProps } from '@acala-dapp/ui-components/types';
import { Button, Condition } from '@acala-dapp/ui-components';

import { TokenName, TokenImage } from './Token';
import { getCurrencyIdFromName } from './utils';
import classes from './BalanceInput.module.scss';

type BalanceInputSize = 'large' | 'middle';

export interface NBalanceInputProps extends BareProps {
  currencies?: (CurrencyId | string)[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (value?: number) => void;
  value?: number;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  token: CurrencyId | string;
  tokenPosition?: 'left' | 'right';
  showMaxBtn?: boolean;
  showIcon?: boolean;
  size?: BalanceInputSize;
  onMax?: () => void;
  border?: boolean;
  decimalPlaces?: number;
}

const numberPattern = /^([1-9]\d*|0)(\.\d+)?$/;

export const NBalanceInput: FC<NBalanceInputProps> = forwardRef<HTMLDivElement, NBalanceInputProps>(({
  border = true,
  className,
  decimalPlaces = 6,
  disabled = false,
  error,
  id,
  name,
  onBlur,
  onChange,
  onFocus,
  onMax,
  placeholder,
  showIcon = true,
  showMaxBtn = false,
  size = 'large',
  token,
  tokenPosition = 'right',
  value = ''
}, ref) => {
  const { api } = useApi();
  const [focused, setFocused] = useState<boolean>(false);

  const _token = useMemo(() => {
    if (typeof token === 'string') return getCurrencyIdFromName(api, token);

    return token;
  }, [api, token]);

  const renderToken = useCallback((): ReactNode => {
    return (
      <div className={classes.token}>
        { showIcon ? <TokenImage currency={_token} /> : null }
        <TokenName currency={_token} />
      </div>
    );
  }, [showIcon, _token]);

  const _onFocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    setFocused(true);
    onFocus && onFocus(event);
  }, [setFocused, onFocus]);

  const _onBlur: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    setFocused(false);
    onBlur && onBlur(event);
  }, [setFocused, onBlur]);

  const _onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const value = e.target.value;
    const [, d] = value.split('.');

    // handle empty value
    if (!value && onChange) onChange();

    // check if number
    if (!numberPattern.test(value)) return;

    // check decimal places
    if (decimalPlaces && d && d.length > decimalPlaces) return;

    if (onChange) onChange(Number(value));
  }, [onChange, decimalPlaces]);

  const rootClasses = useMemo<string>((): string => clsx(
    className,
    classes.root,
    classes[size],
    {
      [classes.border]: border,
      [classes.error]: !!error,
      [classes.focused]: focused
    }
  ), [className, error, focused, size, border]);

  return (
    <div
      className={rootClasses}
      ref={ref}
    >
      <Condition condition={tokenPosition === 'left'}>
        {renderToken}
      </Condition>
      <input
        className={classes.input}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={_onBlur}
        onChange={_onChange}
        onFocus={_onFocus}
        placeholder={placeholder}
        type='number'
        value={value}
      />
      <Condition condition={showMaxBtn}>
        <Button
          className={classes.maxBtn}
          color='primary'
          onClick={onMax}
          type='ghost'
        >
          MAX
        </Button>
      </Condition>
      <Condition condition={tokenPosition === 'right'}>
        {renderToken()}
      </Condition>
      <p className={clsx(classes.error, { [classes.show]: !!error })}>{error ? error.toString() : ''}</p>
    </div>
  );
});

NBalanceInput.displayName = 'NBalanceInput';
