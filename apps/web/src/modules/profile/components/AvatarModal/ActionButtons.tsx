'use client';

import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
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
}: AvatarModalActionButtonsProps) => (
  <div className={cn('flex flex-col justify-between gap-3 sm:flex-row', className)} {...props}>
    {isImageSelected && (
      <Button onClick={onImageChange} variant="outline" color="info">
        Choose another image
      </Button>
    )}

    <div className="flex gap-3 sm:ml-auto">
      <Button className="w-full sm:w-fit" onClick={onCancel} variant="outline">
        Cancel
      </Button>

      <Button
        className="w-full sm:w-fit"
        onClick={onSave}
        disabled={!isImageSelected}
        isLoading={isLoading}
        variant="accent"
      >
        Save
      </Button>
    </div>
  </div>
);

export default AvatarModalActionButtons;
