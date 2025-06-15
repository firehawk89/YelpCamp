'use client';

import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@/components/Modal';
import { updateUserAvatar } from '@/server/user';
import { User } from '@/types/user';
import { MAX_AVATAR_SIZE_KB, MIN_AVATAR_DIMENSION } from '@repo/constants';
import Alert from '@repo/ui/alert';
import { CardProps } from '@repo/ui/card';
import Tooltip from '@repo/ui/tooltip';
import { useTranslations } from 'next-intl';
import { InfoIcon } from 'node_modules/@repo/ui/src/icons/InfoIcon';
import { useCallback, useEffect, useRef, useState } from 'react';

import ImageArea from '../../../../components/ImageArea';
import useImageFileSelect from '../../../../hooks/useImageFileSelect';
import { useImageCrop } from '../../hooks/useImageCrop';
import AvatarModalActionButtons from './ActionButtons';
import ImageCropper from './ImageCropper';

interface AvatarEditModalProps extends Omit<CardProps, 'orientation'> {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (croppedImage: string) => void;
}

const AvatarModal = ({ user, isOpen, onSave, onClose, className, ...props }: AvatarEditModalProps) => {
  const t = useTranslations('pages.profile.avatarModal');

  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { imageSource, setImageSource, handleSelectFile, imageError, setImageError } = useImageFileSelect({
    maxFileSize: MAX_AVATAR_SIZE_KB,
    minDimension: MIN_AVATAR_DIMENSION,
  });
  const { crop, setCrop, handleImageLoad, generateCroppedImage } = useImageCrop({ setError: setImageError });

  const onImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleSelectFile(acceptedFiles[0]);
    },
    [handleSelectFile]
  );

  const handleImageSave = useCallback(async () => {
    const croppedImage = generateCroppedImage(imageRef.current);

    if (!croppedImage) {
      setImageError(t('errors.failedToSaveCroppedImage'));
      return;
    }

    setIsLoading(true);
    setImageError(null);

    try {
      await updateUserAvatar(user._id, croppedImage);

      onSave?.(croppedImage);
      onClose();
    } catch {
      setImageError(t('errors.default'));
    } finally {
      setIsLoading(false);
    }
  }, [generateCroppedImage, onClose, onSave, setImageError, t, user._id]);

  const resetModalState = useCallback(() => {
    setCrop(undefined);
    setImageSource(null);
    setImageError(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }, [setCrop, setImageError, setImageSource]);

  useEffect(() => {
    if (isOpen) {
      resetModalState();
    }
  }, [isOpen, resetModalState]);

  return (
    <Modal
      className={className}
      isHidden={!isOpen}
      onClose={onClose}
      title={t('title')}
      renderHeader={({ titleSlot, closeButtonSlot }) => (
        <>
          <div className="flex items-center gap-1.5">
            {titleSlot}
            <Tooltip
              tooltipClassName="w-max"
              label={
                <p>
                  {t('minimumImageDimensions', { min: MIN_AVATAR_DIMENSION })} <br />
                  {t('maximumImageSize', { max: MAX_AVATAR_SIZE_KB })}
                </p>
              }
            >
              <InfoIcon className="size-5 cursor-pointer text-neutral-500" />
            </Tooltip>
          </div>
          {closeButtonSlot}
        </>
      )}
      {...props}
    >
      <div className="flex flex-col gap-5">
        {imageError && (
          <Alert color="danger" className="w-full">
            {imageError}
          </Alert>
        )}

        {!imageSource && (
          <ImageArea onClick={() => imageInputRef.current?.click()} onImageDrop={onImageDrop} isError={!!imageError} />
        )}

        <input
          ref={imageInputRef}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => handleSelectFile(e.target.files?.[0])}
        />

        {imageSource && (
          <ImageCropper
            crop={crop}
            onCropChange={setCrop}
            imageRef={imageRef}
            imageSource={imageSource}
            onImageLoad={handleImageLoad}
          />
        )}
      </div>

      <AvatarModalActionButtons
        isImageSelected={!!imageSource}
        onImageChange={() => imageInputRef.current?.click()}
        onCancel={onClose}
        onSave={handleImageSave}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default AvatarModal;
