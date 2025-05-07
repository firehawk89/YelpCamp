import { MAX_IMAGE_SIZE_KB, MIN_IMAGE_DIMENSION } from '@repo/constants';
import { useState, useCallback } from 'react';

interface Options {
  maxFileSize?: number;
  minDimension?: number;
  onImageSourceAdd?: (imageUrl: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const getFileSizeInKB = (file: File) => file.size / 1024;

const useImageFileSelect = ({
  maxFileSize = MAX_IMAGE_SIZE_KB,
  minDimension = MIN_IMAGE_DIMENSION,
  onImageSourceAdd,
  error,
  setError,
}: Options) => {
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleSelectFile = useCallback(
    (file?: File) => {
      if (!file) return;

      const fileSize = getFileSizeInKB(file);

      if (fileSize > maxFileSize) {
        setImageSource(null);
        setError(`Image size exceeds the limit of ${maxFileSize} KB. Please select other image.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        const imageUrl = reader.result?.toString() || '';
        image.src = imageUrl;

        image.onload = () => {
          if (error) setError(null);

          const { naturalWidth, naturalHeight } = image;

          if (naturalWidth < minDimension || naturalHeight < minDimension) {
            setImageSource(null);
            setError(`Image dimensions are too small. Minimum size is ${minDimension}x${minDimension} pixels.`);
            return;
          }

          setImageSource(imageUrl);
          onImageSourceAdd?.(imageUrl);
        };
      };

      reader.readAsDataURL(file);
    },
    [error, maxFileSize, minDimension, onImageSourceAdd, setError]
  );

  return { imageSource, setImageSource, handleSelectFile };
};

export default useImageFileSelect;
