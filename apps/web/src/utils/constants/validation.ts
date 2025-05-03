export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

export const MIN_AVATAR_DIMENSION = 400;
export const MAX_AVATAR_SIZE_KB = 512;

export const MIN_USER_NAME_LENGTH = 2;
export const MAX_USER_NAME_LENGTH = 50;

export const MIN_RATING: number = 1;
export const MAX_RATING: number = 5;

export const MIN_REVIEW_TITLE_LENGTH = 4;
export const MAX_REVIEW_TITLE_LENGTH = 100;

export const MIN_REVIEW_BODY_LENGTH = 10;
export const MAX_REVIEW_BODY_LENGTH = 1800;

export const MIN_CAMPGROUND_TITLE_LENGTH = 5;
export const MAX_CAMPGROUND_TITLE_LENGTH = 80;

export const CAMPGROUND_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MIN_CAMPGROUND_SLUG_LENGTH = 5;
export const MAX_CAMPGROUND_SLUG_LENGTH = 100;

export const MIN_CAMPGROUND_DESCRIPTION_LENGTH = 30;
export const MAX_CAMPGROUND_DESCRIPTION_LENGTH = 1500;

export const MIN_CAMPGROUND_LOCATION_LENGTH = 3;
export const MAX_CAMPGROUND_LOCATION_LENGTH = 100;

export const MIN_CAMPGROUND_PRICE = 0;
export const MAX_CAMPGROUND_PRICE = 5000;

export const MIN_CAMPGROUND_IMAGES = 1;
export const MAX_CAMPGROUND_IMAGES = 8;

export const LONGITUDE_RANGE = { MIN: -180, MAX: 180 };
export const LATITUDE_RANGE = { MIN: -90, MAX: 90 };
