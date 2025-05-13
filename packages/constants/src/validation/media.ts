import { ImageType } from '@repo/types';

export const BASE64_IMAGE_PATTERN = /^data:image\/(jpeg|jpg|png|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/;
export const ALLOWED_IMAGE_FORMATS = ['jpeg', 'png', 'jpg'];

export const MIN_IMAGE_DIMENSION = 360;
export const MAX_IMAGE_SIZE_KB = 1024;

export const MIN_AVATAR_DIMENSION = 400;
export const MAX_AVATAR_SIZE_KB = 512;

export const IMAGE_FOLDER_BASE = 'CampZone';
export const CAMPGROUND_IMAGES_FOLDER_NAME = 'campground-images';
export const SEARCH_IMAGES_FOLDER_NAME = 'search-images';
export const AVATAR_IMAGES_FOLDER_NAME = 'user-avatars';

export const destinationFolderMap = {
  [ImageType.CAMPGROUND]: CAMPGROUND_IMAGES_FOLDER_NAME,
  [ImageType.SEARCH]: SEARCH_IMAGES_FOLDER_NAME,
  [ImageType.AVATAR]: AVATAR_IMAGES_FOLDER_NAME,
};
