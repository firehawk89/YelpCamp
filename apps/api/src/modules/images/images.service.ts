import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { destinationFolderMap, IMAGE_FOLDER_BASE } from '@repo/constants';
import { ImageType } from '@repo/types';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { UploadImageDTO } from 'src/dto/image/upload-image.dto';
import { SIMILAR_IMAGES_CANDIDATES_LIMIT } from 'src/helpers/constants/misc';
import { SIMILAR_IMAGES_SEARCH_LIMIT } from 'src/helpers/constants/misc';
import { getImageEmbedding } from 'src/helpers/embeddings';
import { handleError } from 'src/helpers/misc';
import { validateBase64Image } from 'src/helpers/validation';
import { Image, ImageDocument } from 'src/schemas/image.schema';

import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getById(id: string) {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid image ID');
      }

      const image = await this.imageModel.findById(id).select('+embedding').exec();
      if (!image) {
        throw new NotFoundException("Image doesn't exist");
      }

      return image;
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  async create(uploadImageDto: UploadImageDTO, userId?: string) {
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
        campgroundId: uploadImageDto.campgroundId,
        fileName: imageFileName,
        embedding: searchImageEmbedding,
      });

      return image.save();
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  async getByCampgroundId(campgroundId: string): Promise<ImageDocument[]> {
    try {
      return this.imageModel.find({ campgroundId }).exec();
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  async getSimilarCampgroundImages(imageId: string): Promise<ImageDocument[]> {
    const image = await this.getById(imageId);

    const similarImages = await this.imageModel
      .aggregate<ImageDocument>([
        {
          $vectorSearch: {
            index: 'image_search_vector_index',
            path: 'embedding',
            queryVector: image.embedding,
            numCandidates: SIMILAR_IMAGES_CANDIDATES_LIMIT,
            limit: SIMILAR_IMAGES_SEARCH_LIMIT,
          },
        },
        {
          $match: {
            campgroundId: { $ne: null },
          },
        },
      ])
      .exec();

    return similarImages;
  }

  async delete(imageId: string) {
    try {
      const image = await this.getById(imageId);
      if (!image) {
        throw new NotFoundException("Image doesn't exist");
      }

      await this.cloudinaryService.deleteImage(image.fileName);

      return this.imageModel.findByIdAndDelete(imageId).exec();
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  async deleteCampgroundImages(campgroundId: string, folderName: string) {
    try {
      const deletedImages = await this.imageModel.deleteMany({ campgroundId }).exec();
      await this.cloudinaryService.deleteImagesFolder(folderName);
      return deletedImages;
    } catch (error) {
      handleError(error, ImagesService.name);
    }
  }

  private getImageFileName(imageId: string, imageType: ImageType, userId?: string) {
    return `${userId ? `user-${userId}-` : ''}${imageType}-image-${imageId}`;
  }

  private getImageFolder(uploadImageDto: UploadImageDTO) {
    const { type: imageType, subFolder } = uploadImageDto;
    const destinationFolder = destinationFolderMap[imageType];
    return `${IMAGE_FOLDER_BASE}/${destinationFolder}${subFolder ? `/${subFolder}` : ''}`;
  }
}
