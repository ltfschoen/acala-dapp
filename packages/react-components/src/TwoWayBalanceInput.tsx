import React, { FC, useState, useCallback, useMemo, useEffect, ChangeEventHandler } from 'react';
import { noop } from 'lodash';
import clsx from 'clsx';
import { useFormik } from 'formik';

import classes from './TwoWayBalanceInput.module.scss';
import { CurrencyLike } from '@acala-dapp/react-hooks/types';
import { Fixed18, convertToFixed18 } from '@acala-network/app-util';

import { FormatFixed18 } from './format';
import { TokenImage, TokenName } from './Token';
import { BalanceInput } from './BalanceInput';
import { Condition, SwitchIcon } from '@acala-dapp/ui-components';
import { useFormValidator, useBalance } from '@acala-dapp/react-hooks';

interface TwoWayBalanceInputProps {
  className?: string;
  initCurrencies: [CurrencyLike, CurrencyLike];
  onChange: (num: number) => void;
  onError?: (error: boolean) => void;
  exchangeRate: Fixed18;
  swap?: boolean;
  exposeReset?: (reset: () => void) => void;
  max?: number;
}

type Direction = 'forward' | 'reverse';

export const TwoWayBalanceInput: FC<TwoWayBalanceInputProps> = ({
  className,
  exchangeRate = Fixed18.ZERO,
  exposeReset,
  initCurrencies,
  onChange,
  onError,
  swap = true
}) => {
  const [direction, setDirection] = useState<Direction>('forward');
  const [focused, setFocused] = useState<boolean>(false);
  const [primaryCurrency] = useState<CurrencyLike>(initCurrencies[0]);
  const [referenceCurrency] = useState<CurrencyLike>(initCurrencies[1]);
  const primaryCurrencyBalance = useBalance(primaryCurrency);

  const referenceMax = useMemo<number>((): number => {
    if (!primaryCurrencyBalance) return 0;

    return convertToFixed18(primaryCurrencyBalance).mul(exchangeRate).toNumber(6, 3);
  }, [primaryCurrencyBalance, exchangeRate]);

  const validator = useFormValidator({
    primary: {
      currency: primaryCurrency,
      type: 'balance'
    },
    reference: {
      max: referenceMax,
      type: 'number'
    }
  });

  const form = useFormik({
    initialValues: {
      primary: '' as any as number,
      reference: '' as any as number
    },
    onSubmit: noop,
    validate: validator
  });

  const showError = useMemo(() => {
    return direction === 'forward' ? form.errors.primary : form.errors.reference;
  }, [form, direction]);

  const rootClassName = useMemo(() => {
    return clsx(classes.root, className, {
      [classes.focused]: focused,
      [classes.error]: showError
    });
  }, [showError, focused, className]);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, [setFocused]);

  const handleSwitch = useCallback(() => {
    // does not save the state before exchange
    form.resetForm();
    setDirection(direction === 'forward' ? 'reverse' : 'forward');
  }, [setDirection, direction, form]);

  const handlePrimaryMax = useCallback(() => {
    if (!primaryCurrencyBalance) return;

    form.setFieldValue('primary', convertToFixed18(primaryCurrencyBalance).toNumber(6, 3));
  }, [primaryCurrencyBalance, form]);

  const handleReferenceMax = useCallback(() => {
    if (!referenceMax) return;

    form.setFieldValue('reference', referenceMax);
  }, [referenceMax, form]);

  const handlePrimaryChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const value = Number(event.target.value);

    form.setFieldValue('reference', Fixed18.fromNatural(value).mul(exchangeRate).toNumber(6, 3));
    form.handleChange(event);
  }, [form, exchangeRate]);

  const handleReferenceChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const value = Number(event.target.value);

    form.setFieldValue('primary', Fixed18.fromNatural(value).div(exchangeRate).toNumber(6, 3));
    form.handleChange(event);
  }, [form, exchangeRate]);

  // expose reset action to father component
  useEffect(() => {
    if (exposeReset) {
      exposeReset(form.resetForm);
    }
  }, [form, exposeReset]);

  // notify father compoent the primary value
  useEffect(() => {
    onChange(form.values.primary);
  }, [form.values.primary, onChange]);

  // notify father compoent error
  useEffect(() => {
    if (onError) {
      onError(!!showError);
    }
  }, [showError, onError]);

  return (
    <div className={rootClassName}>
      <Condition condition={swap}>
        <div
          className={classes.switchArea}
          onClick={handleSwitch}
        >
          <SwitchIcon />
        </div>
      </Condition>
      <div>
        <div className={classes.inputArea}>
          <BalanceInput
            border={false}
            className={classes.balanceInput}
            error={direction === 'forward' ? form.errors.primary : form.errors.reference}
            id={ direction === 'forward' ? 'primary' : 'reference'}
            name={ direction === 'forward' ? 'primary' : 'reference'}
            onBlur={handleBlur}
            onChange={direction === 'forward' ? handlePrimaryChange : handleReferenceChange}
            onFocus={handleFocus}
            onMax={direction === 'forward' ? handlePrimaryMax : handleReferenceMax}
            showMaxBtn
            token={direction === 'forward' ? primaryCurrency : referenceCurrency}
            value={direction === 'forward' ? form.values.primary : form.values.reference}
          />
        </div>
        <div className={classes.displayArea}>
          <FormatFixed18
            className={classes.amount}
            data={Fixed18.fromNatural((direction === 'forward' ? form.values.reference : form.values.primary) || 0)}
            prefix='≈'
          />
          <div>
            <TokenImage
              className={classes.tokenImage}
              currency={direction === 'forward' ? referenceCurrency : primaryCurrency}
            />
            <TokenName
              className={classes.tokenName}
              currency={direction === 'forward' ? referenceCurrency : primaryCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
