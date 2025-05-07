import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ALLOWED_IMAGE_FORMATS } from '@repo/constants';
import { v2 as cloudinaryV2, UploadApiOptions } from 'cloudinary';
import { handleError } from 'src/helpers/misc';
import { validateBase64Image } from 'src/helpers/validation';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinaryV2.config({
      cloud_name: this.config.get<string>('cloudinary.cloudName'),
      api_key: this.config.get<string>('cloudinary.apiKey'),
      api_secret: this.config.get<string>('cloudinary.apiSecret'),
    });
  }

  async uploadImage(base64Image: string, options?: UploadApiOptions): Promise<string> {
    try {
      validateBase64Image(base64Image);

      const uploadOptions: UploadApiOptions = {
        resource_type: 'image',
        allowed_formats: ALLOWED_IMAGE_FORMATS,
        overwrite: true,
        ...options,
      };

      const imageUrl = await cloudinaryV2.uploader.upload(base64Image, uploadOptions);

      return imageUrl.secure_url;
    } catch (error) {
      handleError(error, CloudinaryService.name);
    }
  }
}
