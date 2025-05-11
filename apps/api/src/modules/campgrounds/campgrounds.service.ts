import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CAMPGROUND_IMAGES_FOLDER_NAME,
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
  IMAGE_FOLDER_BASE,
} from '@repo/constants';
import { ImageType, PaginatedResponse } from '@repo/types';
import mongoose, { isValidObjectId, Model, PipelineStage } from 'mongoose';
import { CampgroundsFilterDTO } from 'src/dto/campground/campgrounds-filter.dto';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { UploadImageDTO } from 'src/dto/image/upload-image.dto';
import { generateSlug, handleError } from 'src/helpers/misc';
import { Campground, CampgroundDocument } from 'src/schemas/campground.schema';
import { CampgroundLocation } from 'src/schemas/location.schema';

import { ImagesService } from '../images/images.service';

@Injectable()
export class CampgroundsService {
  constructor(
    @InjectModel(Campground.name) private campgroundModel: Model<Campground>,
    private readonly imagesService: ImagesService
  ) {}

  async create(createCampgroundDto: CreateCampgroundDTO): Promise<CampgroundDocument> {
    try {
      const foundCampground = await this.campgroundModel.findOne({ title: createCampgroundDto.title }).exec();
      if (foundCampground) {
        throw new ConflictException('Campground already exists');
      }

      if (!createCampgroundDto.slug) {
        const slug = generateSlug(createCampgroundDto.title);
        createCampgroundDto.slug = slug;
      }

      const newCampground = new this.campgroundModel(createCampgroundDto);
      const imageIds: mongoose.Types.ObjectId[] = [];
      const imageEmbeddings: number[][] = [];

      // TODO: Generate image embedding for all images
      if (createCampgroundDto.images.length) {
        const imageData: UploadImageDTO = {
          image: createCampgroundDto.images[0],
          type: ImageType.CAMPGROUND,
          subFolder: newCampground.slug,
          campgroundId: newCampground.id,
        };

        const image = await this.imagesService.create(imageData);
        if (image.embedding) {
          imageEmbeddings.push(image.embedding);
        }

        imageIds.push(image._id);
      }

      newCampground.images = imageIds;

      return newCampground.save();
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getAll(filter?: CampgroundsFilterDTO): Promise<PaginatedResponse<CampgroundDocument>> {
    try {
      const {
        sortBy = DEFAULT_SORT_FIELD,
        sortOrder = DEFAULT_SORT_ORDER,
        page,
        search,
        searchImage: searchImageId,
        rating,
      } = filter ?? {};

      const pageNumber = +page;
      const validPage = isNaN(pageNumber) || pageNumber < 1 ? DEFAULT_PAGE : pageNumber;
      const skip = (validPage - 1) * DEFAULT_PAGE_LIMIT;

      const totalCount = await this.campgroundModel.countDocuments().exec();

      const pipeline: PipelineStage[] = [];

      if (search) {
        pipeline.push({
          $match: { title: { $regex: search, $options: 'i' } },
        });
      }

      if (searchImageId) {
        const similarImages = await this.imagesService.getSimilarCampgroundImages(searchImageId);
        const campgroundIds = similarImages.map((img) => img.campgroundId).filter(Boolean);

        if (campgroundIds.length) {
          const campgroundObjectIds = campgroundIds.map((id) => new mongoose.Types.ObjectId(id));
          pipeline.push({
            $match: {
              _id: { $in: campgroundObjectIds },
            },
          });
        }
      }

      if (rating) {
        pipeline.push({
          $match: { rating: { $gte: +rating } },
        });
      }

      pipeline.push(
        {
          $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
        },
        {
          $facet: {
            metadata: [
              { $count: 'count' },
              {
                $addFields: {
                  totalCount,
                  page: validPage,
                  totalPages: { $ceil: { $divide: ['$count', DEFAULT_PAGE_LIMIT] } },
                  limit: DEFAULT_PAGE_LIMIT,
                  offset: skip,
                },
              },
            ],
            data: [
              { $skip: skip },
              { $limit: DEFAULT_PAGE_LIMIT },
              {
                $lookup: {
                  from: 'images',
                  localField: 'images',
                  foreignField: '_id',
                  pipeline: [{ $project: { url: 1, fileName: 1, type: 1 } }],
                  as: 'images',
                },
              },
            ],
          },
        }
      );

      const [result] = await this.campgroundModel.aggregate<PaginatedResponse<CampgroundDocument>>(pipeline).exec();
      result.metadata = { ...result.metadata[0], count: result.data.length };

      return result;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getLocations(filter?: CampgroundsFilterDTO): Promise<CampgroundLocation[]> {
    try {
      const { search } = filter ?? {};

      const pipeline: PipelineStage[] = [];

      if (search) {
        pipeline.push({
          $match: { title: { $regex: search, $options: 'i' } },
        });
      }

      pipeline.push({
        $project: {
          _id: 0,
          full_address: '$location.full_address',
          coordinates: '$location.coordinates',
          campground: {
            _id: '$_id',
            slug: '$slug',
            name: '$name',
          },
        },
      });

      const locations = await this.campgroundModel.aggregate(pipeline).exec();

      return locations;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getById(id: string): Promise<CampgroundDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(id).populate('images').exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      return campground;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getBySlug(slug: string): Promise<CampgroundDocument> {
    try {
      const campground = await this.campgroundModel.findOne({ slug }).populate('images').exec();

      if (!campground) {
        throw new NotFoundException("Campground with given slug doesn't exist");
      }

      return campground;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async update(slug: string, updateCampgroundDto: UpdateCampgroundDTO): Promise<CampgroundDocument> {
    try {
      const campground = await this.campgroundModel.findOne({ slug }).exec();
      if (!campground) {
        throw new NotFoundException("Campground with given slug doesn't exist");
      }

      return this.campgroundModel.findByIdAndUpdate(campground.id, { ...updateCampgroundDto }, { new: true }).exec();
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async delete(id: string): Promise<CampgroundDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(id).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      const updatedCampground = await this.campgroundModel.findByIdAndDelete(id).exec();

      const campgroundImages = await this.imagesService.getByCampgroundId(id);
      const campgroundImageFilenames = campgroundImages.map((img) => img.fileName);

      if (campgroundImageFilenames.length) {
        await this.imagesService.deleteCampgroundImages(
          campground.id,
          `${IMAGE_FOLDER_BASE}/${CAMPGROUND_IMAGES_FOLDER_NAME}/${campground.slug}`
        );
      }

      return updatedCampground;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }
}
