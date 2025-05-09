import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMAGE_FOLDER_BASE } from '@repo/constants';
import { ImageType } from '@repo/types';
import mongoose, { Model } from 'mongoose';
import { UploadImageDTO } from 'src/dto/image/upload-image.dto';
import { getImageEmbedding } from 'src/helpers/embeddings';
import { handleError } from 'src/helpers/misc';
import { validateBase64Image } from 'src/helpers/validation';
import { Image } from 'src/schemas/image.schema';

import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async uploadImage(uploadImageDto: UploadImageDTO, userId?: string) {
    try {
      const base64Image = uploadImageDto.image;
      validateBase64Image(base64Image);

      const imageId = new mongoose.Types.ObjectId();

      const imageFileName = this.getImageFileName(imageId.toString(), uploadImageDto.type, userId);
      const imageFolder = this.getImageFolder(uploadImageDto);

      const imageUrl = await this.cloudinaryService.uploadImage(base64Image, {
        public_id: imageFileName,
        folder: imageFolder,
      });

      // TODO: Check if base64 image can be embedded
      const searchImageEmbedding = await getImageEmbedding(imageUrl);

      const image = await this.imageModel.create({
        _id: imageId,
        url: imageUrl,
        type: uploadImageDto.type,
        fileName: imageFileName,
        embedding: searchImageEmbedding,
      });

      return image.save();
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  private getImageFileName(imageId: string, imageType: ImageType, userId?: string) {
    return `${userId ? `${userId}-` : ''}${imageType}-image-${imageId}`;
  }

  private getImageFolder(uploadImageDto: UploadImageDTO) {
    const { type: imageType, folderPath } = uploadImageDto;
    return `${IMAGE_FOLDER_BASE}/${imageType}-images${folderPath ? `/${folderPath}` : ''}`;
  }
}
