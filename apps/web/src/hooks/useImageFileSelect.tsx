import { MAX_IMAGE_SIZE_KB, MIN_IMAGE_DIMENSION } from '@repo/constants';
import { useState, useCallback } from 'react';

interface Options {
  maxFileSize?: number;
  minDimension?: number;
  onImageSourceAdd?: (imageUrl: string) => void;
  onImageError?: (error: string | null) => void;
}

const getFileSizeInKB = (file: File) => file.size / 1024;

const useImageFileSelect = ({
  maxFileSize = MAX_IMAGE_SIZE_KB,
  minDimension = MIN_IMAGE_DIMENSION,
  onImageSourceAdd,
  onImageError,
}: Options) => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleImageError = useCallback(
    (error: string | null) => {
      setImageSource(null);
      setImageError(error);
      onImageError?.(error);
    },
    [onImageError]
  );

  const handleSelectFile = useCallback(
    (file?: File) => {
      if (!file) return;

      const fileSize = getFileSizeInKB(file);

      if (fileSize > maxFileSize) {
        handleImageError(`Image size exceeds the limit of ${maxFileSize} KB. Please select other image.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        const imageUrl = reader.result?.toString() || '';
        image.src = imageUrl;

        image.onload = () => {
          if (imageError) handleImageError(null);

          const { naturalWidth, naturalHeight } = image;

          if (naturalWidth < minDimension || naturalHeight < minDimension) {
            handleImageError(`Image dimensions are too small. Minimum size is ${minDimension}x${minDimension} pixels.`);
            return;
          }

          setImageSource(imageUrl);
          onImageSourceAdd?.(imageUrl);
        };
      };

      reader.readAsDataURL(file);
    },
    [handleImageError, imageError, maxFileSize, minDimension, onImageSourceAdd]
  );

  return { imageSource, setImageSource, handleSelectFile, imageError, setImageError, onImageError };
};

export default useImageFileSelect;
