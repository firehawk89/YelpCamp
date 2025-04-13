'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import { CloseIcon } from '@repo/ui/icons';
import { ReactNode } from 'react';

import Overlay, { OverlayProps } from './Overlay';

export interface ModalProps extends CardProps {
  isHidden: OverlayProps['isHidden'];
  title: string;
  renderHeader?: ({ titleSlot, closeButtonSlot }: { titleSlot: ReactNode; closeButtonSlot: ReactNode }) => ReactNode;
  onClose: () => void;
  overlayClassName?: string;
}

const Modal = ({
  isHidden,
  title,
  renderHeader,
  onClose,
  overlayClassName,
  className,
  children,
  ...props
}: ModalProps) => {
  const modalRef = useClickOutside<HTMLDivElement>(() => onClose());

  const titleSlot = <h3 className="mt-1 text-xl font-semibold">{title}</h3>;
  const closeButtonSlot = <Button className="shrink-0" onClick={onClose} icon={<CloseIcon />} />;

  return (
    <Overlay className={overlayClassName} isHidden={isHidden} placement="center">
      <div className="container">
        <Card
          ref={modalRef}
          className={cn('mx-auto w-full max-w-[640px]', className)}
          orientation="vertical"
          {...props}
        >
          <div className="flex items-start justify-between gap-4">
            {renderHeader ? (
              renderHeader({ titleSlot, closeButtonSlot })
            ) : (
              <>
                {titleSlot}
                {closeButtonSlot}
              </>
            )}
          </div>
          {children}
        </Card>
      </div>
    </Overlay>
  );
};

export default Modal;
