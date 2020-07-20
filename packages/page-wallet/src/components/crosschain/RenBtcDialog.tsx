import React, { FC } from 'react';

import { Dialog } from '@acala-dapp/ui-components';

export interface RenBtcDialogProps {
  show: boolean;
  onClose: () => void;
}

export const RenBtcDialog: FC<RenBtcDialogProps> = ({
  show
}) => {
  return (
    <Dialog
      action={null}
      title='Deposit BTC'
      visiable={show}
    >

    </Dialog>
  );
};

export interface ShowBTCAddressDialogProps {
  amount: number;
  address: string;
  renVMFee: number;
  btcFee: number;
}

export const ShowBTCAddressDialog: FC<RenBtcDialogProps> = ({
  amount,
  show
}) => {
  return (
    <Dialog
      action={null}
      title={null}
      visiable={show}
    >
      <p>Deposit {amount} BTC</p>
    </Dialog>
  );
}
