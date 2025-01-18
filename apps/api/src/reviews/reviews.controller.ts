import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAllReviews() {
    return this.reviewsService.getAll();
  }

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

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
