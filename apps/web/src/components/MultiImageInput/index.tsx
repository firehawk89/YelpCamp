import { AnimatePresence } from 'motion/react';
import { useCallback, useRef } from 'react';

import ImageArea from '../ImageArea';
import ImagePreview from './ImagePreview';

interface MultiImageInputProps {
  images: string[];
  onAddImage: (imageFile: File | undefined) => void;
  onImageRemove?: (imageUrl: string) => void;
  isError?: boolean;
}

const MultiImageInput = ({ images, onAddImage, onImageRemove, isError }: MultiImageInputProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      onAddImage(acceptedFiles[0]);
    },
    [onAddImage]
  );

  return (
    <>
      {!images?.length && (
        <ImageArea onClick={() => imageInputRef.current?.click()} onImageDrop={onImageDrop} isError={isError} />
      )}

      {!!images?.length && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          <AnimatePresence>
            {images?.map((image) => <ImagePreview key={image} image={image} onImageRemove={onImageRemove} />)}
          </AnimatePresence>

          <div className="h-32 w-48 shrink-0">
            <ImageArea
              className="min-h-[auto] text-base"
              iconClassName="size-8"
              label="Add more"
              onClick={() => imageInputRef.current?.click()}
              onImageDrop={onImageDrop}
            />
          </div>
        </div>
      )}

      <input
        ref={imageInputRef}
        id="images"
        className="hidden"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={(e) => onAddImage(e.target.files?.[0])}
      />
    </>
  );
};

export default MultiImageInput;
