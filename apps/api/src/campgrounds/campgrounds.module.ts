import { Module } from '@nestjs/common';
import { CampgroundsService } from './campgrounds.service';
import { CampgroundsController } from './campgrounds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campground.name, schema: CampgroundSchema },
      { name: Review.name, schema: ReviewSchema }
    ])
  ],
  providers: [CampgroundsService],
  controllers: [CampgroundsController]
})
export class CampgroundsModule {}
