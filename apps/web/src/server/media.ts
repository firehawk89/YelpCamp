import { Image } from '@/types/media';
import { API_ROUTES } from '@/utils/constants/misc';
import { ApiError, ImageType } from '@repo/types';

import { getAccessToken } from './session';

export const fetchImage = async (imageId: string): Promise<Image> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to fetch image - access token is missing');
    }

    const response = await fetch(`${API_ROUTES.IMAGES}/${imageId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to fetch image');
    }

    const data: Image = await response.json();

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch image';
    throw new Error(errorMessage);
  }
};

export const uploadImage = async (base64Image: string, type?: ImageType): Promise<Image> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to upload image - access token is missing');
    }

    const response = await fetch(`${API_ROUTES.IMAGES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ image: base64Image, type: type ?? ImageType.CAMPGROUND }),
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to upload image');
    }

    const data: Image = await response.json();

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
    throw new Error(errorMessage);
  }
};
