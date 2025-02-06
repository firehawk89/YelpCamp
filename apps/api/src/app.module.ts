import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampgroundsModule } from './campgrounds/campgrounds.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL), CampgroundsModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
