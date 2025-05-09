import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

import { ImagesModule } from '../images/images.module';
import { ReviewsService } from '../reviews/reviews.service';
import { CampgroundsController } from './campgrounds.controller';
import { CampgroundsService } from './campgrounds.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campground.name, schema: CampgroundSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    ImagesModule,
  ],
  providers: [CampgroundsService, ReviewsService],
  controllers: [CampgroundsController],
})
export class CampgroundsModule {}
