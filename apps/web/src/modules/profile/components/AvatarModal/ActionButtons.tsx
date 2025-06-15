'use client';

import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

interface AvatarModalActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  isImageSelected: boolean;
  onImageChange: () => void;
  onCancel: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

const AvatarModalActionButtons = ({
  isImageSelected,
  onImageChange,
  onCancel,
  onSave,
  isLoading,
  className,
  ...props
}: AvatarModalActionButtonsProps) => {
  const t = useTranslations('pages.profile.avatarModal.actions');

  return (
    <div className={cn('flex flex-col justify-between gap-3 sm:flex-row', className)} {...props}>
      {isImageSelected && (
        <Button onClick={onImageChange} variant="outline" color="info">
          {t('chooseAnotherImage')}
        </Button>
      )}

      <div className="flex gap-3 sm:ml-auto">
        <Button className="w-full sm:w-fit" onClick={onCancel} variant="outline">
          {t('cancel')}
        </Button>

        <Button
          className="w-full sm:w-fit"
          onClick={onSave}
          disabled={!isImageSelected}
          isLoading={isLoading}
          variant="accent"
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
};

export default AvatarModalActionButtons;
