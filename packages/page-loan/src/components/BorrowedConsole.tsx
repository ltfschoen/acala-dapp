import React, { FC } from 'react';
import { CurrencyId } from '@acala-network/types/interfaces';
import { Card } from '@honzon-platform/ui-components';
import { Token, FormatBalance } from '@honzon-platform/react-components';
import { useLoan, useConstants, useBalance } from '@honzon-platform/react-hooks';

import classes from './LoanConsole.module.scss';
import { LonaActionButton } from './LoanActionButton';
import { isEmpty } from 'lodash';
import { convertToFixed18 } from '@acala-network/app-util';

interface Props {
  token: CurrencyId | string;
}

export const BorrowedConsole: FC<Props> = ({
  token
}) => {
  const { currentUserLoanHelper, minmumDebitValue } = useLoan(token);
  const { stableCurrency } = useConstants();
  const balance = useBalance(stableCurrency);

  const checkCanPayBackDisabled = (): boolean => {
    if (!currentUserLoanHelper.canPayBack) {
      return true;
    }
    if (currentUserLoanHelper.canPayBack.isZero()) {
      return true;
    }
    return false;
  };

  const checkCanGenerateDisabled = (): boolean => {
    if (!currentUserLoanHelper.canGenerate) {
      return true;
    }
    if (currentUserLoanHelper.canGenerate.isZero()) {
      return true;
    }
    return false;
  };

  if (isEmpty(currentUserLoanHelper)) {
    return null;
  }

  return (
    <Card
      className={classes.console}
      headerClassName={classes.header}
      header={(
        <>
          <div>
            <span>Borrowed</span>
            <Token
              token={stableCurrency}
              gutter
            />
          </div>
          <FormatBalance
            currency={stableCurrency}
            balance={currentUserLoanHelper.debitAmount}
          />
        </>
      )}
    >
        <div className={classes.item}>
          <div className={classes.itemContent}>
            <p className={classes.itemTitle}>Can Pay Back</p>
            <FormatBalance
              className={classes.itemBalance}
              currency={stableCurrency}
              balance={currentUserLoanHelper.canPayBack}
            />
          </div>
          <LonaActionButton
            className={classes.itemAction}
            disabled={checkCanPayBackDisabled()}
            type='payback'
            text='Payback'
            token={token}
            max={
              Math.min(
                convertToFixed18(balance || 0).toNumber(),
                currentUserLoanHelper.canPayBack.sub(minmumDebitValue).toNumber()
              )
            }
          />
        </div>
        <div className={classes.item}>
          <div className={classes.itemContent}>
            <p className={classes.itemTitle}>Can Generate</p>
            <FormatBalance
              className={classes.itemBalance}
              currency={stableCurrency}
              balance={currentUserLoanHelper.canGenerate}
            />
          </div>
          <LonaActionButton
            className={classes.itemAction}
            disabled={checkCanGenerateDisabled()}
            type='generate'
            text='Generate'
            token={token}
            max={currentUserLoanHelper.canGenerate?.toNumber()}
          />
        </div>
    </Card>
  );
}