'use client';

import { RefObject, SyntheticEvent } from 'react';
import ReactCrop, { Crop, PercentCrop, ReactCropProps } from 'react-image-crop';

const MIN_CROP_SIZE_PERCENT = 30;
const CROP_ASPECT_RATIO = 1;

interface ImageCropper extends Omit<ReactCropProps, 'onChange'> {
  crop?: Crop;
  onCropChange: (percentCrop: PercentCrop) => void;
  imageRef: RefObject<HTMLImageElement | null>;
  imageSource: string;
  onImageLoad: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageCropper = ({ crop, onCropChange, imageRef, imageSource, onImageLoad, ...props }: ImageCropper) => (
  <ReactCrop
    className="max-h-[60vh] overflow-hidden rounded-lg"
    crop={crop}
    onChange={(_, percentCrop) => onCropChange(percentCrop)}
    circularCrop
    keepSelection
    aspect={CROP_ASPECT_RATIO}
    minWidth={MIN_CROP_SIZE_PERCENT}
    {...props}
  >
    {/* eslint-disable @next/next/no-img-element */}
    <img
      ref={imageRef}
      className="h-full w-full object-contain object-center"
      src={imageSource}
      alt="Uploaded image"
      onLoad={onImageLoad}
    />
  </ReactCrop>
);

export default ImageCropper;
