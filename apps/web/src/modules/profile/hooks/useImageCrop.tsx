import { useTranslations } from 'next-intl';
import { SyntheticEvent, useCallback, useState } from 'react';
import { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from 'react-image-crop';

const CROP_ASPECT_RATIO = 1;
const CROPPED_IMAGE_QUALITY = 0.9;

interface Options {
  setError: (error: string | null) => void;
}

export const useImageCrop = ({ setError }: Options) => {
  const t = useTranslations('imageCrop');

  const [crop, setCrop] = useState<Crop>();

  const handleImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;

    const crop = makeAspectCrop({ unit: '%', height: 80 }, CROP_ASPECT_RATIO, width, height);
    const centeredCrop = centerCrop(crop, width, height);

    setCrop(centeredCrop);
  }, []);

  const generateCroppedImage = useCallback(
    (imageElement: HTMLImageElement | null) => {
      if (!imageElement || !crop) {
        setError(t('errors.noCropData'));
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError(t('errors.canvasInitializationFailed'));
        return;
      }

      const pixelCrop = convertToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);

      const cropSize = Math.min(pixelCrop.width, pixelCrop.height);
      const offsetX = pixelCrop.x + (pixelCrop.width - cropSize) / 2;
      const offsetY = pixelCrop.y + (pixelCrop.height - cropSize) / 2;

      canvas.width = cropSize;
      canvas.height = cropSize;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(imageElement, offsetX, offsetY, cropSize, cropSize, 0, 0, cropSize, cropSize);

      return canvas.toDataURL('image/jpeg', CROPPED_IMAGE_QUALITY);
    },
    [crop, setError, t]
  );

  return { crop, setCrop, handleImageLoad, generateCroppedImage };
};
