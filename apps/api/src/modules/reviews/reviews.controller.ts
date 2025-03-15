import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';

import { AuthGuard } from '../auth/auth.guard';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAllReviews() {
    return this.reviewsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  createReview(@Body() createReviewDto: CreateReviewDTO) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get(':id')
  getReviewById(@Param('id') id: string) {
    return this.reviewsService.getById(id);
  }

  // TODO: Make available only for admin users
  //   @Patch(':id')
  //   updateReview(@Param('id') id: string, @Body() updateCampgroundDto: UpdateCampgroundDTO) {
  //     return this.reviewsService.update(id, updateCampgroundDto);
  //   }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
