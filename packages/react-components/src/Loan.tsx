import React, { FC, useMemo } from 'react';
import { CurrencyLike } from '@acala-dapp/react-hooks/types';
import { FormatFixed18Props, FormatFixed18, FormatBalanceProps, FormatBalance } from './format';
import { useLoanHelper, useConstants, useLoanType, useLoanOverview, usePrice } from '@acala-dapp/react-hooks';
import { convertToFixed18, Fixed18 } from '@acala-network/app-util';
import { Fixed128 } from '@acala-network/types/interfaces';

type LoanPropertyProps<T> = T & {
  currency: CurrencyLike;
}

export const CollateralRate: FC<LoanPropertyProps<FormatFixed18Props>> = ({
  currency,
  ...other
}) => {
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatFixed18
      data={helper.collateralRatio}
      format='percentage'
      {...other}
    />
  );
};

export const StableFeeAPR: FC<LoanPropertyProps<FormatFixed18Props>> = ({
  currency,
  ...other
}) => {
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatFixed18
      data={helper.stableFeeAPR}
      format='percentage'
      {...other}
    />
  );
};

export const RequiredCollateralRatio: FC<LoanPropertyProps<FormatFixed18Props>> = ({
  currency,
  ...other
}) => {
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatFixed18
      data={helper.requiredCollateralRatio}
      format='percentage'
      {...other}
    />
  );
};

export const LiquidationRatio: FC<LoanPropertyProps<FormatFixed18Props>> = ({
  currency,
  ...other
}) => {
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatFixed18
      data={helper.liquidationRatio}
      format='percentage'
      {...other}
    />
  );
};

export const LiquidationPenalty: FC<LoanPropertyProps<FormatFixed18Props>> = ({
  currency,
  ...other
}) => {
  const type = useLoanType(currency);

  if (!type) {
    return null;
  }

  return (
    <FormatFixed18
      data={convertToFixed18(type.liquidationPenalty)}
      format='percentage'
      {...other}
    />
  );
};

export const Collateral: FC<LoanPropertyProps<FormatBalanceProps>> = ({
  currency,
  ...other
}) => {
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatBalance
      balance={convertToFixed18(helper.collaterals)}
      currency={currency}
      {...other}
    />
  );
};

export const DebitAmount: FC<LoanPropertyProps<FormatBalanceProps>> = ({
  currency,
  ...other
}) => {
  const { stableCurrency } = useConstants();
  const helper = useLoanHelper(currency);

  if (!helper) {
    return null;
  }

  return (
    <FormatBalance
      balance={convertToFixed18(helper.debitAmount)}
      currency={stableCurrency}
      {...other}
    />
  );
};

export const TotalCollateral: FC<LoanPropertyProps<FormatBalanceProps>> = ({ currency, ...other }) => {
  const overview = useLoanOverview(currency);

  if (!overview) return null;

  return (
    <FormatBalance
      balance={convertToFixed18(overview.totalCollateral)}
      currency={currency}
      {...other}
    />
  );
};

export const TotalDebit: FC<LoanPropertyProps<FormatBalanceProps>> = ({ currency, ...other }) => {
  const overview = useLoanOverview(currency);
  const { stableCurrency } = useConstants();
  const result = useMemo<Fixed18>(() => {
    if (!overview) return Fixed18.ZERO;

    if (!overview.totalDebit || !overview.debitExchangeRate) return Fixed18.ZERO;

    return convertToFixed18(overview.totalDebit).mul(convertToFixed18(overview.debitExchangeRate));
  }, [overview]);

  if (!overview) return null;

  return (
    <FormatBalance
      balance={result}
      currency={stableCurrency}
      {...other}
    />
  );
};

export const TotalCollateralRatio: FC<LoanPropertyProps<FormatFixed18Props>> = ({ currency, ...other }) => {
  const overview = useLoanOverview(currency);
  const price = usePrice(currency);
  const result = useMemo<Fixed18>(() => {
    if (!overview || !price) return Fixed18.ZERO;

    if (!overview.totalDebit || !overview.debitExchangeRate || !overview.totalCollateral) return Fixed18.ZERO;

    return (convertToFixed18(overview.totalCollateral).mul(price)).div(convertToFixed18(overview.totalDebit).mul(convertToFixed18(overview.debitExchangeRate)));
  }, [overview, price]);

  if (!overview) return null;

  return (
    <FormatFixed18
      data={result}
      format='percentage'
      {...other}
    />
  );
};
