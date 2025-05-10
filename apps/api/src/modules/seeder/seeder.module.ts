import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campground.name, schema: CampgroundSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [Logger, SeederService, CloudinaryService],
})
export class SeederModule {}
