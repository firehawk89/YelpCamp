'use client';

import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@/components/Modal';
import { updateUserAvatar } from '@/server/user';
import { User } from '@/types/user';
import { MAX_AVATAR_SIZE_KB, MIN_AVATAR_DIMENSION } from '@/utils/constants/validation';
import Alert from '@repo/ui/alert';
import { CardProps } from '@repo/ui/card';
import Tooltip from '@repo/ui/tooltip';
import { InfoIcon } from 'node_modules/@repo/ui/src/icons/InfoIcon';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useImageCrop } from '../../hooks/useImageCrop';
import useImageFileSelect from '../../hooks/useImageFileSelect';
import AvatarModalActionButtons from './ActionButtons';
import ImageArea from './ImageArea';
import ImageCropper from './ImageCropper';

interface AvatarEditModalProps extends Omit<CardProps, 'orientation'> {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (croppedImage: string) => void;
}

const AvatarModal = ({ user, isOpen, onSave, onClose, className, ...props }: AvatarEditModalProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { imageSource, setImageSource, handleSelectFile } = useImageFileSelect({ error, setError });
  const { crop, setCrop, handleImageLoad, generateCroppedImage } = useImageCrop({ setError });

  const onImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleSelectFile(acceptedFiles[0]);
    },
    [handleSelectFile]
  );

  const handleImageSave = useCallback(async () => {
    const croppedImage = generateCroppedImage(imageRef.current);

    if (!croppedImage) {
      setError('Failed to save cropped image. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateUserAvatar(user._id, croppedImage);

      onSave?.(croppedImage);
      onClose();
    } catch {
      setError('An error occurred when trying to update an avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [generateCroppedImage, onClose, onSave, user._id]);

  const resetModalState = useCallback(() => {
    setCrop(undefined);
    setImageSource(null);
    setError(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }, [setCrop, setImageSource]);

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
      title="Select profile image"
      renderHeader={({ titleSlot, closeButtonSlot }) => (
        <>
          <div className="flex items-center gap-1.5">
            {titleSlot}
            <Tooltip
              tooltipClassName="w-max"
              label={
                <p>
                  Minimum image dimensions: {MIN_AVATAR_DIMENSION}x{MIN_AVATAR_DIMENSION} <br />
                  Maximum image size: {MAX_AVATAR_SIZE_KB} KB
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
        {error && (
          <Alert color="danger" className="w-full">
            {error}
          </Alert>
        )}

        {!imageSource && (
          <ImageArea onClick={() => imageInputRef.current?.click()} onImageDrop={onImageDrop} error={error} />
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
