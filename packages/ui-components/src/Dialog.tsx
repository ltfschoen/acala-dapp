import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Modal } from 'antd';

import { BareProps } from './types';
import { Button } from './Button';
import { CloseIcon } from './Icon';
import './Dialog.scss';

interface Props extends BareProps {
  visiable: boolean;
  title?: ReactNode;
  action?: ReactNode;
  withClose?: boolean;
  confirmText?: string | null;
  cancelText?: string | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const Dialog: FC<Props> = ({
  action,
  cancelText = 'Cancel',
  children,
  className,
  confirmText = 'Confirm',
  onCancel,
  onConfirm,
  showCancel = false,
  title,
  visiable = true,
  withClose = false
}) => {
  return (
    <Modal
      className={clsx(className, 'aca-dialog__root')}
      closable={withClose}
      closeIcon={<CloseIcon />}
      destroyOnClose
      footer={null}
      keyboard={true}
      onCancel={onCancel}
      title={title}
      visible={visiable}
      width={480}
    >
      <div>{children}</div>
      <div className='aca-dialog__actions'>
        {
          action || (
            <>
              {showCancel ? (
                <Button
                  onClick={onCancel}
                  size='small'
                >
                  {cancelText}
                </Button>
              ) : null}
              {onConfirm ? (
                <Button
                  color='primary'
                  onClick={onConfirm}
                  size='small'
                >
                  {confirmText}
                </Button>
              ) : null}
            </>
          )
        }
      </div>
    </Modal>
  );
};
