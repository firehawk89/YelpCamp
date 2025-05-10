import { ImageType } from '@repo/types';

export interface Image {
  _id: string;
  url: string;
  type: ImageType;
  fileName?: string;
}
