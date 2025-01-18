import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { Review } from 'src/schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDTO): Promise<Review> {
    try {
      const newReview = new this.reviewModel(createReviewDto);
      return newReview.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async getById(id: string): Promise<Review> {
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
      console.error(error);
      throw error;
    }
  }

  // TODO: Use this method only for admin users
  //   async update(id: string, updateReviewDto: UpdateReviewDTO): Promise<Review> {
  //     const foundReview = await this.reviewModel.findById(id).exec();
  //     if (!campground) {
  //       throw new NotFoundException("Review doesn't exist");
  //     }

  //     const updatedAtDate = Date.now();
  //     return this.reviewModel
  //       .findByIdAndUpdate(id, { ...updateCampgroundDto, updatedAt: updatedAtDate }, { new: true })
  //       .exec();
  //   }

  async delete(id: string): Promise<Review> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid review ID');
      }

      const foundReview = await this.reviewModel.findById(id).exec();
      if (!foundReview) {
        throw new NotFoundException("Review doesn't exist");
      }

      return this.reviewModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
