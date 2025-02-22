import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, PipelineStage } from 'mongoose';
import { CampgroundsFilterDTO } from 'src/dto/campground/campgrounds-filter.dto';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { DEFAULT_PAGE_LIMIT, DEFAULT_SORT_FIELD, DEFAULT_PAGE, DEFAULT_SORT_ORDER } from 'src/helpers/constants';
import { generateSlug } from 'src/helpers/misc';
import { getUpdatedRating } from 'src/helpers/rating';
import { Campground } from 'src/schemas/campground.schema';
import { Review } from 'src/schemas/review.schema';
import { PaginatedResponse } from 'src/types/api';

@Injectable()
export class CampgroundsService {
  constructor(
    @InjectModel(Campground.name) private campgroundModel: Model<Campground>,
    @InjectModel(Review.name) private reviewModel: Model<Review>
  ) {}

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
      console.error(error);
      throw error;
    }
  }

  async getAll(filter?: CampgroundsFilterDTO): Promise<PaginatedResponse<Campground>> {
    const { search, page, sortBy = DEFAULT_SORT_FIELD, sortOrder = DEFAULT_SORT_ORDER } = filter ?? {};

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
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateCampgroundDto: UpdateCampgroundDTO): Promise<Campground> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(id).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      const updatedAtDate = Date.now();
      return this.campgroundModel
        .findByIdAndUpdate(id, { ...updateCampgroundDto, updatedAt: updatedAtDate }, { new: true })
        .exec();
    } catch (error) {
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
    }
  }

  async getReviews(campgroundId: string): Promise<Review[]> {
    try {
      const isValidId = isValidObjectId(campgroundId);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const reviews = await this.reviewModel.find({ campgroundId }).exec();
      return reviews;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createReview(campgroundId: string, createReviewDto: CreateReviewDTO): Promise<Review> {
    try {
      const isValidId = isValidObjectId(campgroundId);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(campgroundId).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      const newReview = new this.reviewModel({ ...createReviewDto, campgroundId });

      await this.increaseCampgroundRating(campgroundId, campground, createReviewDto.rating);

      return newReview.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async increaseCampgroundRating(campgroundId: string, campground: Campground, reviewRating: number) {
    try {
      const campgroundRating = isFinite(campground.rating) ? campground.rating : 0;
      const reviewsCount = campground.reviewsCount ?? 0;
      const newReviewsCount = reviewsCount + 1;

      const newRating = getUpdatedRating(reviewRating, campgroundRating, reviewsCount, newReviewsCount);

      await this.campgroundModel
        .findByIdAndUpdate(campgroundId, {
          rating: newRating,
          reviewsCount: newReviewsCount,
        })
        .exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update campground rating');
    }
  }
}
