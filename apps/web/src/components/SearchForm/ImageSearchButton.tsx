'use client';

import Button, { ButtonProps } from '@repo/ui/button';
import { ImageIcon } from 'node_modules/@repo/ui/src/icons/ImageIcon';
import { useRef } from 'react';

interface ImageSearchButtonProps extends ButtonProps {
  onSelectImage: (imageFile?: File) => void;
}

const ImageSearchButton = ({ onSelectImage, ...props }: ImageSearchButtonProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        className="aspect-square w-10 shrink-0"
        onClick={() => imageInputRef?.current?.click()}
        variant="info"
        icon={<ImageIcon />}
        {...props}
      />

      <input
        ref={imageInputRef}
        id="images"
        className="hidden"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={(e) => onSelectImage(e.target.files?.[0])}
      />
    </>
  );
};

export default ImageSearchButton;
