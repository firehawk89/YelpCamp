import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CAMPGROUND_IMAGES_FOLDER_NAME, MAX_REVIEW_RATING, MIN_REVIEW_RATING } from '@repo/constants';
import { Currency } from '@repo/types';
import { Model } from 'mongoose';
import { MAX_SEEDED_CAMPGROUNDS, MAX_SEEDED_REVIEWS } from 'src/helpers/constants/misc';
import { generateSlug, handleError, sample } from 'src/helpers/misc';
import { Campground, CampgroundDocument } from 'src/schemas/campground.schema';
import { Location } from 'src/schemas/location.schema';
import { Price } from 'src/schemas/price.schema';
import { Review, ReviewDocument } from 'src/schemas/review.schema';
import { User } from 'src/schemas/user.schema';
import countriesJson from 'src/seeds/countries.json';
import placesJson from 'src/seeds/places.json';

import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Campground.name) private readonly campgroundModel: Model<Campground>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  private getRandomRating(): number {
    return Math.floor(Math.random() * MAX_REVIEW_RATING) + MIN_REVIEW_RATING;
  }

  async seedCampgrounds(): Promise<CampgroundDocument[]> {
    try {
      const { cities } = countriesJson;
      const { descriptors, places } = placesJson;

      const user = await this.userModel.findOne();
      const { id: authorId } = user;

      this.logger.log('Seeding campgrounds...');

      await this.campgroundModel.deleteMany();
      await this.userModel.updateMany({}, { $set: { favoriteCampgrounds: [] } });

      await this.cloudinaryService.deleteImagesFolder(CAMPGROUND_IMAGES_FOLDER_NAME);

      const campgrounds: CampgroundDocument[] = [];

      for (let i = 0; i < MAX_SEEDED_CAMPGROUNDS; i++) {
        let title = `${sample(descriptors)} ${sample(places)}`;
        let isTitleUnique = campgrounds.every((camp) => camp.title !== title);

        while (!isTitleUnique) {
          title = `${sample(descriptors)} ${sample(places)}`;
          isTitleUnique = campgrounds.every((camp) => camp.title !== title);
        }

        const slug = generateSlug(title);
        const description =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eius excepturi rerum autem molestias temporibus ratione omnis corporis ullam in hic laborum! Atque eaque repellendus dolore fugit, porro soluta maiores!';

        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomCityIndex];
        const randomAddress = `${randomCity.city}, ${randomCity.state}`;
        const randomLocation: Location = {
          full_address: randomAddress,
          coordinates: {
            longitude: randomCity.longitude,
            latitude: randomCity.latitude,
          },
        };

        const randomPriceValue = (Math.random() * 5000).toFixed(2);
        const randomCurrency = sample(Object.keys(Currency));
        const randomPrice: Price = {
          value: Number(randomPriceValue),
          currency: randomCurrency,
        };

        const randomRating = this.getRandomRating();

        const campground = new this.campgroundModel({
          title,
          slug,
          description,
          location: randomLocation,
          price: randomPrice,
          rating: randomRating,
          author: authorId,
        });

        campgrounds.push(campground);
      }

      await this.campgroundModel.insertMany(campgrounds);
      this.logger.log('Campgrounds seeding completed successfully');

      return campgrounds;
    } catch (error) {
      handleError(error, SeederService.name);
    }
  }

  async seedReviews(campgrounds: CampgroundDocument[]): Promise<ReviewDocument[]> {
    try {
      this.logger.log('Seeding reviews...');
      await this.reviewModel.deleteMany();

      const { id: authorId } = await this.userModel.findOne();
      const reviews: ReviewDocument[] = [];

      for (const campground of campgrounds) {
        const { id: campgroundId } = campground;
        const numReviews = Math.floor(Math.random() * MAX_SEEDED_REVIEWS);

        let totalRating = 0;
        let reviewsCount = 0;

        for (let i = 0; i < numReviews; i++) {
          const randomRating = this.getRandomRating();
          const randomBody = `This is a randomly generated review #${i + 1} for campground ${campgroundId}.`;

          const review = new this.reviewModel({
            campground: campgroundId,
            rating: randomRating,
            body: randomBody,
            author: authorId,
          });

          reviews.push(review);

          totalRating += randomRating;
          reviewsCount++;
        }

        const newRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;

        await this.campgroundModel
          .findByIdAndUpdate(campgroundId, {
            rating: newRating,
            reviewsCount,
          })
          .exec();
      }

      await this.reviewModel.insertMany(reviews);
      this.logger.log('Reviews seeding completed successfully');

      return reviews;
    } catch (error) {
      handleError(error, SeederService.name);
    }
  }

  async seedDatabase(): Promise<void> {
    this.logger.log('Seeding database...');

    const campgrounds = await this.seedCampgrounds();
    await this.seedReviews(campgrounds);

    this.logger.log('Database seeding completed successfully');
  }
}
