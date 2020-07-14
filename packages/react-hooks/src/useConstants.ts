
import { useMemo } from 'react';

import { CurrencyId } from '@acala-network/types/interfaces';
import { Vec } from '@polkadot/types';

import { useApi } from './useApi';
import { Fixed18, convertToFixed18 } from '@acala-network/app-util';

interface HooksReturnType {
  allCurrencies: CurrencyId[];
  crossChainCurrencies: CurrencyId[];
  dexBaseCurrency: CurrencyId;
  dexCurrencies: CurrencyId[];
  loanCurrencies: CurrencyId[];
  expectedBlockTime: number;
  nativeCurrency: CurrencyId;
  minmumDebitValue: Fixed18;
  stableCurrency: CurrencyId;
  stakingCurrency: CurrencyId;
  liquidCurrency: CurrencyId;
}

export const useConstants = (): HooksReturnType => {
  const { api } = useApi();

  // all currencies id
  const allCurrencies = useMemo((): CurrencyId[] => {
    const tokenList = api.registry.createType('CurrencyId' as any).defKeys as string[];

    return tokenList.map((name: string): CurrencyId => {
      return api.registry.createType('CurrencyId' as any, name) as CurrencyId;
    });
  }, [api]);

  const crossChainCurrencies = useMemo((): CurrencyId[] => {
    return ['XBTC', 'AUSD', 'DOT'].map((name: string): CurrencyId => {
      return api.registry.createType('CurrencyId' as any, name) as CurrencyId;
    });
  }, [api]);

  const loanCurrencies = useMemo(() => api.consts.cdpEngine.collateralCurrencyIds as Vec<CurrencyId>, [api]);

  // all currencies in dex
  const dexCurrencies = useMemo(() => api.consts.dex.enabledCurrencyIds as Vec<CurrencyId>, [api]);

  // dex base currency
  const dexBaseCurrency = useMemo(() => api.consts.dex.getBaseCurrencyId as CurrencyId, [api]);

  // stable currency id
  const stableCurrency = useMemo(() => api.consts.cdpEngine.getStableCurrencyId as CurrencyId, [api]);

  // native currency id
  const nativeCurrency = useMemo(() => api.consts.currencies.nativeCurrencyId as CurrencyId, [api]);

  // expect block time
  const expectedBlockTime = useMemo(() => api.consts.babe.expectedBlockTime.toNumber(), [api]);

  // loan minmum debit value
  const minmumDebitValue = useMemo<Fixed18>(() => convertToFixed18(api.consts.cdpEngine.minimumDebitValue), [api]);

  // staking currency
  const stakingCurrency = useMemo(() => api.consts.stakingPool.stakingCurrencyId as Currency, [api]);

  // liquid currency
  const liquidCurrency = useMemo(() => api.consts.stakingPool.liquidCurrencyId as Currency, [api]);

  return {
    allCurrencies,
    crossChainCurrencies,
    dexBaseCurrency,
    dexCurrencies,
    expectedBlockTime,
    liquidCurrency,
    loanCurrencies,
    minmumDebitValue,
    nativeCurrency,
    stableCurrency,
    stakingCurrency
  };
};
