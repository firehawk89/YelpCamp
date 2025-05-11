import Button from '@repo/ui/button';

import Modal, { ModalProps } from './Modal';

interface ConfirmationModalProps extends ModalProps {
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationModal = ({
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isLoading,
  ...props
}: ConfirmationModalProps) => (
  <Modal className="gap-3" {...props}>
    <div className="flex flex-col gap-4">
      <p>{description}</p>

      <div className="ml-auto flex gap-2">
        <Button onClick={props.onClose} variant="outline" color="info">
          {cancelText}
        </Button>

        <Button onClick={onConfirm} variant="accent" isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmationModal;
