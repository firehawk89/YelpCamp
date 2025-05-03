import { MAX_AVATAR_SIZE_KB, MIN_AVATAR_DIMENSION } from '@repo/constants';
import { useState, useCallback } from 'react';

interface Options {
  error: string | null;
  setError: (error: string | null) => void;
}

const getFileSizeInKB = (file: File) => file.size / 1024;

const useImageFileSelect = ({ error, setError }: Options) => {
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleSelectFile = useCallback(
    (file?: File) => {
      if (!file) return;

      const fileSize = getFileSizeInKB(file);

      if (fileSize > MAX_AVATAR_SIZE_KB) {
        setImageSource(null);
        setError(`Image size exceeds the limit of ${MAX_AVATAR_SIZE_KB} KB. Please select other image.`);
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

          if (naturalWidth < MIN_AVATAR_DIMENSION || naturalHeight < MIN_AVATAR_DIMENSION) {
            setImageSource(null);
            setError(
              `Image dimensions are too small. Minimum size is ${MIN_AVATAR_DIMENSION}x${MIN_AVATAR_DIMENSION} pixels.`
            );
            return;
          }

          setImageSource(imageUrl);
        };
      };

      reader.readAsDataURL(file);
    },
    [error, setError]
  );

  return { imageSource, setImageSource, handleSelectFile };
};

export default useImageFileSelect;
