import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from 'src/helpers/constants/defaults';
import { handleError } from 'src/helpers/misc';
import { getUpdatedRating } from 'src/helpers/rating';
import { Campground } from 'src/schemas/campground.schema';
import { Review, ReviewDocument } from 'src/schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Campground.name) private campgroundModel: Model<Campground>
  ) {}

  async getAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async getAllByCampgroundId(campgroundId: string): Promise<ReviewDocument[]> {
    try {
      const isValidId = isValidObjectId(campgroundId);
      if (!isValidId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const reviews = await this.reviewModel
        .find({ campgroundId })
        .sort({ [DEFAULT_SORT_FIELD]: DEFAULT_SORT_ORDER })
        .populate('author', 'email')
        .exec();

      return reviews;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async getById(id: string): Promise<ReviewDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid review ID');
      }

      const review = await this.reviewModel.findById(id).exec();
      if (!review) {
        throw new NotFoundException("Review doesn't exist");
      }
      return review;
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  // TODO: Use this method only for admin users
  //   async update(id: string, updateReviewDto: UpdateReviewDTO): Promise<Review> {
  //     const foundReview = await this.reviewModel.findById(id).exec();
  //     if (!campground) {
  //       throw new NotFoundException("Review doesn't exist");
  //     }

  //     return this.reviewModel
  //       .findByIdAndUpdate(id, { ...updateCampgroundDto }, { new: true })
  //       .exec();
  //   }

  async create(campgroundId: string, userId: string, createReviewDto: CreateReviewDTO): Promise<ReviewDocument> {
    try {
      const isValidCampgroundId = isValidObjectId(campgroundId);
      if (!isValidCampgroundId) {
        throw new BadRequestException('Invalid campground ID');
      }

      const campground = await this.campgroundModel.findById(campgroundId).exec();
      if (!campground) {
        throw new NotFoundException("Campground doesn't exist");
      }

      const isValidUserId = isValidObjectId(userId);
      if (!isValidUserId) {
        throw new BadRequestException('Invalid user ID');
      }

      const newReview = new this.reviewModel({ ...createReviewDto, campgroundId, author: userId });

      await this.increaseCampgroundRating(campgroundId, campground, createReviewDto.rating);

      return newReview.save();
    } catch (error) {
      handleError(error, ReviewsService.name);
    }
  }

  async likeReview(id: string, userId: string): Promise<ReviewDocument> {
    try {
      this.validateReviewAndUserIDs(id, userId);

      const foundReview = await this.reviewModel.findById(id).exec();
      if (!foundReview) {
        throw new NotFoundException("Review doesn't exist");
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

      const foundReview = await this.reviewModel.findById(id).exec();
      if (!foundReview) {
        throw new NotFoundException("Review doesn't exist");
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
        throw new BadRequestException('Invalid review ID');
      }

      const foundReview = await this.reviewModel.findById(id).exec();
      if (!foundReview) {
        throw new NotFoundException("Review doesn't exist");
      }

      await this.decreaseCampgroundRating(foundReview.campgroundId, foundReview.rating);

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
      throw new InternalServerErrorException('Failed to update campground rating');
    }
  }

  private async decreaseCampgroundRating(campgroundId: mongoose.Types.ObjectId, reviewRating: number) {
    try {
      const reviewCampground = await this.campgroundModel.findById(campgroundId);

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
      throw new InternalServerErrorException('Failed to update campground rating');
    }
  }

  private validateReviewAndUserIDs(reviewId: string, userId: string): void {
    if (!isValidObjectId(reviewId)) {
      throw new BadRequestException('Invalid review ID');
    }

    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
  }
}
