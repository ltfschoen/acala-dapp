import React, { FC } from 'react';

import { NBalanceInput, TxButton } from '@acala-dapp/react-components';
import { useConstants, useBalance } from '@acala-dapp/react-hooks';
import { Form, Card } from '@acala-dapp/ui-components';

import classes from './AUsd.module.scss';

export const AUSD: FC = () => {
  const { stableCurrency } = useConstants();
  const [form] = Form.useForm();
  const stableCurrencyBalance = useBalance(stableCurrency);

  return (
    <Card>
      <div className={classes.root}>
        <div className={classes.container}>
          <p>Transfer AUSD From Acala To Laminar</p>
          <Form
            form={form}
          >
            <Form.Item
              name='mint'
              rules={[{
                max: stableCurrencyBalance.toNumber(6, 3),
                min: 0,
                type: 'number'
              }]}
            >
              <NBalanceInput
                token={stableCurrency}
              />
            </Form.Item>
          </Form>
          <div className={classes.actionArea}>
            <TxButton
              className={classes.txBtn}
              method='transfer'
              params={
                [
                  stableCurrency,
                ]
              }
              section='currencies'
            >
              Transfer
            </TxButton>
          </div>
        </div>
      </div>
    </Card>
  );
};
