import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedResponse } from '@repo/types';
import { isValidObjectId, Model, PipelineStage } from 'mongoose';
import { CampgroundsFilterDTO } from 'src/dto/campground/campgrounds-filter.dto';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_SORT_FIELD,
  DEFAULT_PAGE,
  DEFAULT_SORT_ORDER,
} from 'src/helpers/constants/defaults';
import { generateSlug, handleError } from 'src/helpers/misc';
import { Campground } from 'src/schemas/campground.schema';

@Injectable()
export class CampgroundsService {
  constructor(@InjectModel(Campground.name) private campgroundModel: Model<Campground>) {}

  async create(createCampgroundDto: CreateCampgroundDTO): Promise<Campground> {
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
      return newCampground.save();
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getAll(filter?: CampgroundsFilterDTO): Promise<PaginatedResponse<Campground>> {
    try {
      const { sortBy = DEFAULT_SORT_FIELD, sortOrder = DEFAULT_SORT_ORDER, page, search, rating } = filter ?? {};

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
            data: [{ $skip: skip }, { $limit: DEFAULT_PAGE_LIMIT }],
          },
        }
      );

      const [result] = await this.campgroundModel.aggregate<PaginatedResponse<Campground>>(pipeline).exec();
      result.metadata = { ...result.metadata[0], count: result.data.length };

      return result;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getById(id: string): Promise<Campground> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(id).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      return campground;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async getBySlug(slug: string): Promise<Campground> {
    try {
      const campground = await this.campgroundModel.findOne({ slug }).exec();

      if (!campground) {
        throw new NotFoundException("Campground with given slug doesn't exist");
      }

      return campground;
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }

  async update(slug: string, updateCampgroundDto: UpdateCampgroundDTO): Promise<Campground> {
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

  async delete(id: string): Promise<Campground> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(id).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      return this.campgroundModel.findByIdAndDelete(id).exec();
    } catch (error) {
      handleError(error, CampgroundsService.name);
    }
  }
}
