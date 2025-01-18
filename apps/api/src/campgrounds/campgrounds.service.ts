import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { Campground } from 'src/schemas/campground.schema';
import { Review } from 'src/schemas/review.schema';

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

      const newCampground = new this.campgroundModel(createCampgroundDto);
      return newCampground.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll(): Promise<Campground[]> {
    return this.campgroundModel.find().exec();
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
      return newReview.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
