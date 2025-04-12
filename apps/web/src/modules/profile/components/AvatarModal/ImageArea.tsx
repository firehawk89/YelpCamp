'use client';

import { cn } from '@/utils/misc';
import { UploadDocumentIcon } from '@repo/ui/icons';
import { useDropzone } from 'react-dropzone';

export interface ImageAreaProps {
  onClick: () => void;
  onImageDrop: (acceptedFiles: File[]) => void;
  error: string | null;
}

const ImageArea = ({ onClick, onImageDrop, error }: ImageAreaProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onImageDrop });

  return (
    <div
      className={cn(
        'relative flex h-full min-h-80 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors',
        { 'border-accent': !error, 'border-danger': error, 'bg-accent bg-opacity-5': isDragActive }
      )}
      onClick={onClick}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-2 text-neutral-500">
        <UploadDocumentIcon className="size-16" />
        <p className="text-center">
          Click to select an image <br /> (or just drop it here)
        </p>
      </div>
    </div>
  );
};

export default ImageArea;
