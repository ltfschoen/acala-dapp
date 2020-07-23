import React, { FC, useMemo } from 'react';

import { Fixed18 } from '@acala-network/app-util';

import { Chart, Interval, Tooltip } from 'bizcharts';

import { Card } from '@acala-dapp/ui-components';
import { useTotalCollatearl, useTotalDebit, useMemorized } from '@acala-dapp/react-hooks';
import { getTokenName, getTokenColor } from '@acala-dapp/react-components';

const ONE_HUNDRED = Fixed18.fromNatural(100);

export const LoanCollateralRatio: FC = () => {
  const totalCollateral = useTotalCollatearl();
  const totalDebit = useTotalDebit();
  const data = useMemo(() => {
    if (!totalDebit || !totalCollateral) return [];
    const result = [];

    result.push({
      currency: 'System',
      ratio: (totalCollateral.amount.div(totalDebit.amount).mul(ONE_HUNDRED)).toNumber(2, 3)
    });

    totalCollateral.amountDetail.forEach((item, currency) => {
      const debit = totalDebit.amountDetail.get(currency) || Fixed18.ZERO;

      result.push({
        currency: getTokenName(currency),
        ratio: item.div(debit).mul(ONE_HUNDRED).toNumber(2, 3)
      });
    });

    return result;
  }, [totalCollateral, totalDebit]);

  const _data = useMemorized(data);

  return useMemo(() => {
    return (
      <Card
        header='Collateral Ratio'
      >
        <Chart
          animation={false}
          autoFit
          data={_data}
          height={400}
          interactions={['active-region']}
          padding={[30, 30, 60, 30]}
        >
          <Interval
            color={['currency', (item: string): string => getTokenColor(item)]}
            label={['ratio', {
              content: (data: any): string => {
                return `${data.ratio}%`;
              }
            }]}
            position='currency*ratio'
          />
          <Tooltip shared />
        </Chart>
      </Card>
    );
  }, [_data]);
};