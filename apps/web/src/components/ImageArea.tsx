'use client';

import { cn } from '@/utils/misc';
import { UploadDocumentIcon } from '@repo/ui/icons';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';
import { useDropzone } from 'react-dropzone';

export interface ImageAreaProps extends HTMLAttributes<HTMLDivElement> {
  onImageDrop: (acceptedFiles: File[]) => void;
  label?: string;
  isError?: boolean;
  iconClassName?: string;
}

const ImageArea = ({ onImageDrop, label, isError, iconClassName, className, ...props }: ImageAreaProps) => {
  const t = useTranslations('pages.profile.avatarModal');

  const imageAreaLabel = label || t('imageAreaLabel');

  const { getRootProps, isDragActive } = useDropzone({ onDrop: onImageDrop });

  return (
    <div
      className={cn(
        'relative flex h-full min-h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-white transition-colors',
        { 'border-accent': !isError, 'border-danger': isError, 'bg-accent bg-opacity-5': isDragActive },
        className
      )}
      {...getRootProps()}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-neutral-500">
        <UploadDocumentIcon className={cn('size-16', iconClassName)} />

        <p className="text-center" dangerouslySetInnerHTML={{ __html: imageAreaLabel }} />
      </div>
    </div>
  );
};

export default ImageArea;
