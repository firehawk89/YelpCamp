import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Campground.name, schema: CampgroundSchema }
    ])
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
