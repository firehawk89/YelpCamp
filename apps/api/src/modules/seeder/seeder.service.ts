import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MAX_RATING, MAX_SEEDED_CAMPGROUNDS, MAX_SEEDED_REVIEWS, MIN_RATING } from 'src/helpers/constants';
import { generateSlug, handleError } from 'src/helpers/misc';
import { Campground, CampgroundDocument } from 'src/schemas/campground.schema';
import { Review, ReviewDocument } from 'src/schemas/review.schema';
import { User } from 'src/schemas/user.schema';
import countriesJson from 'src/seeds/countries.json';
import placesJson from 'src/seeds/places.json';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Campground.name) private readonly campgroundModel: Model<Campground>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  private sample(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomRating(): number {
    return Math.floor(Math.random() * MAX_RATING) + MIN_RATING;
  }

  async seedCampgrounds(): Promise<CampgroundDocument[]> {
    try {
      const { cities } = countriesJson;
      const { descriptors, places } = placesJson;

      this.logger.log('Seeding campgrounds...');
      await this.campgroundModel.deleteMany();

      const campgrounds: CampgroundDocument[] = [];

      for (let i = 0; i < MAX_SEEDED_CAMPGROUNDS; i++) {
        let title = `${this.sample(descriptors)} ${this.sample(places)}`;
        let isTitleUnique = campgrounds.every((camp) => camp.title !== title);

        while (!isTitleUnique) {
          title = `${this.sample(descriptors)} ${this.sample(places)}`;
          isTitleUnique = campgrounds.every((camp) => camp.title !== title);
        }

        const slug = generateSlug(title);
        const description =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eius excepturi rerum autem molestias temporibus ratione omnis corporis ullam in hic laborum! Atque eaque repellendus dolore fugit, porro soluta maiores!';

        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const randomLocation = `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`;

        //   const randomPrice = Math.floor(Math.random() * 20) + 10;
        const randomPrice = parseFloat((Math.random() * 20).toFixed(6)) + 0.1;
        const randomRating = this.getRandomRating();

        const camp = new this.campgroundModel({
          title,
          slug,
          location: randomLocation,
          // geometry: {
          //   type: 'Point',
          //   coordinates: [cities[randomNum].longitude, cities[randomNum].latitude],
          // },
          price: randomPrice,
          // images: [
          //   {
          //     url: 'https://res.cloudinary.com/dvwakmag1/image/upload/v1687373560/YelpCamp/hijufksfh5a6n5udaibx.jpg',
          //     filename: 'YelpCamp/hijufksfh5a6n5udaibx',
          //   },
          //   {
          //     url: 'https://res.cloudinary.com/dvwakmag1/image/upload/v1687373560/YelpCamp/avxaiicpbvsg8tvvq89h.webp',
          //     filename: 'YelpCamp/avxaiicpbvsg8tvvq89h',
          //   },
          // ],
          rating: randomRating,
          // author: '6492df50719e6da0f4cafedd', // Replace with your user ID
          description,
        });

        campgrounds.push(camp);
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

      const { id: testAuthorId } = await this.userModel.findOne();
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
            campgroundId,
            rating: randomRating,
            body: randomBody,
            author: testAuthorId,
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
