import { useState, useEffect } from 'react';

import { Fixed18, convertToFixed18 } from '@acala-network/app-util';
import { Balance } from '@acala-network/types/interfaces';
import { StorageKey } from '@polkadot/types';

import { useCall } from './useCall';
import { CurrencyLike, WithNull } from './types';

interface TreasuryOverview {
  debitPool: Fixed18;
  surplusPool: Fixed18;
  totalCollaterals: {
    currency: CurrencyLike;
    balance: Fixed18;
  }[];
}

export const useTreasuryOverview = (): WithNull<TreasuryOverview> => {
  const _debitPool = useCall<Balance>('query.cdpTreasury.debitPool');
  const _surplusPool = useCall<Balance>('query.cdpTreasury.surlpusPool');
  const _totalCollaterals = useCall<[StorageKey, Balance][]>('query.cdpTreasury.totalCollaterals.entries');
  const [result, setResult] = useState<WithNull<TreasuryOverview>>(null);

  useEffect(() => {
    setResult({
      debitPool: convertToFixed18(_debitPool || 0),
      surplusPool: convertToFixed18(_surplusPool || 0),
      totalCollaterals: _totalCollaterals ? _totalCollaterals.map((item) => {
        return {
          balance: convertToFixed18(item[1] || 0),
          currency: (item[0].toHuman() as string[])[0]
        };
      }) : []
    });
  }, [_debitPool, _surplusPool, _totalCollaterals]);

  return result;
};
