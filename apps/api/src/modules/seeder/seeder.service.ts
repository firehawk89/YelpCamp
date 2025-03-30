import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateSlug } from 'src/helpers/misc';
import { Campground } from 'src/schemas/campground.schema';
import countriesJson from 'src/seeds/countries.json';
import placesJson from 'src/seeds/places.json';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Campground.name) private readonly campgroundModel: Model<Campground>
  ) {}

  private sample(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  async seedDatabase(): Promise<void> {
    const { cities } = countriesJson;
    const { descriptors, places } = placesJson;

    this.logger.log('Seeding database...');
    await this.campgroundModel.deleteMany({});

    for (let i = 0; i < 18; i++) {
      const title = `${this.sample(descriptors)} ${this.sample(places)}`;
      const slug = generateSlug(title);
      const description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eius excepturi rerum autem molestias temporibus ratione omnis corporis ullam in hic laborum! Atque eaque repellendus dolore fugit, porro soluta maiores!';

      const randomCityIndex = Math.floor(Math.random() * cities.length);
      const randomLocation = `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`;

      //   const randomPrice = Math.floor(Math.random() * 20) + 10;
      const randomPrice = parseFloat((Math.random() * 20).toFixed(6)) + 0.1;
      const randomRating = Math.floor(Math.random() * 5) + 1;

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

      await camp.save();
    }

    this.logger.log('Database seeding completed.');
  }
}
