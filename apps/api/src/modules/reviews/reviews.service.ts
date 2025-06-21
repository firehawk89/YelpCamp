import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DEFAULT_PAGE } from '@repo/constants';
import { DEFAULT_PAGE_LIMIT, DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from '@repo/constants';
import { POSITIVE_RATING_THRESHOLD } from '@repo/constants';
import { PaginatedResponse, ReviewsMetadata } from '@repo/types';
import mongoose, { isValidObjectId, Model, PipelineStage } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { ReviewsFilterDTO } from 'src/dto/review/reviews-filter.dto';
import { handleError } from 'src/helpers/misc';
import { getUpdatedRating } from 'src/helpers/rating';
import { Campground } from 'src/schemas/campground.schema';
import { Review, ReviewDocument } from 'src/schemas/review.schema';
import { I18nTranslations } from 'src/types/i18n';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Campground.name) private campgroundModel: Model<Campground>,
    private readonly i18n: I18nService<I18nTranslations>
  ) {}

  async getAll(): Promise<Review[]> {
    try {
      return this.reviewModel.find().exec();
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async getAllByCampgroundId(campgroundId: string, filter?: ReviewsFilterDTO): Promise<PaginatedResponse<Review>> {
    try {
      const isValidId = isValidObjectId(campgroundId);
      if (!isValidId) {
        throw new BadRequestException(
          this.i18n.t('errors.reviews.invalidCampgroundId', { lang: I18nContext.current().lang })
        );
      }

      const page = Number(filter?.page) || DEFAULT_PAGE;
      const validPage = isNaN(page) || page < 1 ? DEFAULT_PAGE : page;
      const skip = (validPage - 1) * DEFAULT_PAGE_LIMIT;

      const totalCount = await this.reviewModel.countDocuments({ campground: campgroundId }).exec();

      const positiveReviewsCount = await this.reviewModel
        .countDocuments({
          campground: campgroundId,
          rating: { $gte: POSITIVE_RATING_THRESHOLD },
        })
        .exec();

      const recommendationPercentage = totalCount > 0 ? Math.round((positiveReviewsCount / totalCount) * 100) : 0;

      const pipeline: PipelineStage[] = [
        {
          $match: { campground: new mongoose.Types.ObjectId(campgroundId) },
        },
        {
          $sort: { [DEFAULT_SORT_FIELD]: DEFAULT_SORT_ORDER === 'asc' ? 1 : -1 },
        },
        {
          $facet: {
            metadata: [
              { $count: 'count' },
              {
                $addFields: {
                  totalCount,
                  positiveReviewsCount,
                  recommendationPercentage,
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
                  from: 'users',
                  localField: 'author',
                  foreignField: '_id',
                  pipeline: [{ $project: { email: 1, avatar: 1 } }],
                  as: 'author',
                },
              },
              { $unwind: '$author' },
              {
                $lookup: {
                  from: 'campgrounds',
                  localField: 'campground',
                  foreignField: '_id',
                  pipeline: [{ $project: { title: 1, slug: 1 } }],
                  as: 'campground',
                },
              },
              { $unwind: '$campground' },
            ],
          },
        },
      ];

      const [result] = await this.reviewModel.aggregate<PaginatedResponse<Review, ReviewsMetadata>>(pipeline).exec();
      result.metadata = { ...result.metadata[0], count: result.data.length };

      return result;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async getAllByUserId(userId: string, filter?: ReviewsFilterDTO): Promise<PaginatedResponse<Review>> {
    try {
      const isValidId = isValidObjectId(userId);
      if (!isValidId) {
        throw new BadRequestException(
          this.i18n.t('errors.reviews.invalidUserId', { lang: I18nContext.current().lang })
        );
      }

      const page = Number(filter?.page) || DEFAULT_PAGE;
      const validPage = isNaN(page) || page < 1 ? DEFAULT_PAGE : page;
      const skip = (validPage - 1) * DEFAULT_PAGE_LIMIT;

      const totalCount = await this.reviewModel.countDocuments({ author: userId }).exec();

      const pipeline: PipelineStage[] = [
        {
          $match: { author: new mongoose.Types.ObjectId(userId) },
        },
        {
          $sort: { [DEFAULT_SORT_FIELD]: DEFAULT_SORT_ORDER === 'asc' ? 1 : -1 },
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
                  from: 'users',
                  localField: 'author',
                  foreignField: '_id',
                  pipeline: [{ $project: { email: 1, avatar: 1 } }],
                  as: 'author',
                },
              },
              { $unwind: '$author' },
              {
                $lookup: {
                  from: 'campgrounds',
                  localField: 'campground',
                  foreignField: '_id',
                  pipeline: [{ $project: { title: 1, slug: 1 } }],
                  as: 'campground',
                },
              },
              { $unwind: '$campground' },
            ],
          },
        },
      ];

      const [result] = await this.reviewModel.aggregate<PaginatedResponse<Review>>(pipeline).exec();
      result.metadata = { ...result.metadata[0], count: result.data.length };

      return result;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async getById(id: string): Promise<ReviewDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.reviews.invalidId', { lang: I18nContext.current().lang }));
      }

      const review = await this.reviewModel.findOne({ _id: { $eq: id } }).exec();

      if (!review) {
        throw new NotFoundException(
          this.i18n.t('errors.reviews.reviewDoesNotExist', { lang: I18nContext.current().lang })
        );
      }

      return review;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async create(campgroundId: string, userId: string, createReviewDto: CreateReviewDTO): Promise<ReviewDocument> {
    try {
      const isValidCampgroundId = isValidObjectId(campgroundId);
      if (!isValidCampgroundId) {
        throw new BadRequestException(
          this.i18n.t('errors.reviews.invalidCampgroundId', { lang: I18nContext.current().lang })
        );
      }

      const campground = await this.campgroundModel.findOne({ _id: { $eq: campgroundId } }).exec();
      if (!campground) {
        throw new NotFoundException(
          this.i18n.t('errors.reviews.campgroundDoesNotExist', { lang: I18nContext.current().lang })
        );
      }

      const isValidUserId = isValidObjectId(userId);
      if (!isValidUserId) {
        throw new BadRequestException(
          this.i18n.t('errors.reviews.invalidUserId', { lang: I18nContext.current().lang })
        );
      }

      const newReview = new this.reviewModel({ ...createReviewDto, campground: campgroundId, author: userId });

      await this.increaseCampgroundRating(campgroundId, campground, createReviewDto.rating);

      return newReview.save();
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async likeReview(id: string, userId: string): Promise<ReviewDocument> {
    try {
      this.validateReviewAndUserIDs(id, userId);

      const foundReview = await this.reviewModel.findOne({ _id: { $eq: id } }).exec();
      if (!foundReview) {
        throw new NotFoundException(
          this.i18n.t('errors.reviews.reviewDoesNotExist', { lang: I18nContext.current().lang })
        );
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);
      const isLiked = foundReview.likedBy.includes(userObjectId);

      if (isLiked) {
        return foundReview;
      }

      const updatedReview = await this.reviewModel.findByIdAndUpdate(
        id,
        { $addToSet: { likedBy: userId } },
        { new: true }
      );

      return updatedReview;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async unlikeReview(id: string, userId: string): Promise<ReviewDocument> {
    try {
      this.validateReviewAndUserIDs(id, userId);

      const foundReview = await this.reviewModel.findOne({ _id: { $eq: id } }).exec();
      if (!foundReview) {
        throw new NotFoundException(
          this.i18n.t('errors.reviews.reviewDoesNotExist', { lang: I18nContext.current().lang })
        );
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);
      const isLiked = foundReview.likedBy.includes(userObjectId);

      if (!isLiked) {
        return foundReview;
      }

      const updatedReview = await this.reviewModel.findByIdAndUpdate(id, { $pull: { likedBy: userId } }, { new: true });

      return updatedReview;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async delete(id: string): Promise<ReviewDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.reviews.invalidId', { lang: I18nContext.current().lang }));
      }

      const foundReview = await this.reviewModel.findOne({ _id: { $eq: id } }).exec();
      if (!foundReview) {
        throw new NotFoundException(
          this.i18n.t('errors.reviews.reviewDoesNotExist', { lang: I18nContext.current().lang })
        );
      }

      await this.decreaseCampgroundRating(foundReview.campground, foundReview.rating);

      return this.reviewModel.findByIdAndDelete(id).exec();
    } catch (error) {
      handleError(error, ReviewsService.name);
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
      handleError(error, ReviewsService.name, false);
      throw new InternalServerErrorException(
        this.i18n.t('errors.reviews.campgroundRatingUpdateFailed', { lang: I18nContext.current().lang })
      );
    }
  }

  private async decreaseCampgroundRating(campgroundId: mongoose.Types.ObjectId, reviewRating: number) {
    try {
      const isValidId = isValidObjectId(campgroundId);
      if (!isValidId) {
        throw new BadRequestException(
          this.i18n.t('errors.reviews.invalidCampgroundId', { lang: I18nContext.current().lang })
        );
      }

      const reviewCampground = await this.campgroundModel.findOne({ _id: { $eq: campgroundId } });

      const campgroundRating = isFinite(reviewCampground.rating) ? reviewCampground.rating : 0;
      const reviewsCount = reviewCampground.reviewsCount || 0;
      const newReviewsCount = reviewsCount - 1;

      const newRating = getUpdatedRating(-reviewRating, campgroundRating, reviewsCount, newReviewsCount);

      await this.campgroundModel
        .findByIdAndUpdate(reviewCampground._id, {
          rating: newRating,
          reviewsCount: newReviewsCount,
        })
        .exec();
    } catch (error) {
      handleError(error, ReviewsService.name, false);
      throw new InternalServerErrorException(
        this.i18n.t('errors.reviews.campgroundRatingUpdateFailed', { lang: I18nContext.current().lang })
      );
    }
  }

  private validateReviewAndUserIDs(reviewId: string, userId: string): void {
    if (!isValidObjectId(reviewId)) {
      throw new BadRequestException(this.i18n.t('errors.reviews.invalidId', { lang: I18nContext.current().lang }));
    }

    if (!isValidObjectId(userId)) {
      throw new BadRequestException(this.i18n.t('errors.reviews.invalidUserId', { lang: I18nContext.current().lang }));
    }
  }
}
