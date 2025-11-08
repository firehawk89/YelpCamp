import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campground, CampgroundSchema } from 'src/schemas/campground.schema';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

import { AuthModule } from '../auth/auth.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ReviewsService } from '../reviews/reviews.service';
import { TokensModule } from '../tokens/tokens.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Campground.name, schema: CampgroundSchema },
    ]),
    TokensModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService, ReviewsService],
  exports: [UsersService],
})
export class UsersModule {}
