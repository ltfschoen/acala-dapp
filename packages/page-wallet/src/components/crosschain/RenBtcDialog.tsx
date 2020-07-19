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
      <p>hello</p>
    </Dialog>
  );
};
