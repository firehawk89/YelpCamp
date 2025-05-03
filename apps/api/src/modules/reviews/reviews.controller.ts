import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { type JwtPayload } from '@repo/types';
import { User } from 'src/decorators/user.decorator';

import { AuthGuard } from '../auth/auth.guard';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAllReviews() {
    return this.reviewsService.getAll();
  }

  @Get(':id')
  getReviewById(@Param('id') id: string) {
    return this.reviewsService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  likeReview(@Param('id') id: string, @User() user: JwtPayload) {
    return this.reviewsService.likeReview(id, user.userId);
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

  @UseGuards(AuthGuard)
  @Delete(':id/like')
  unlikeReview(@Param('id') id: string, @User() user: JwtPayload) {
    return this.reviewsService.unlikeReview(id, user.userId);
  }
}
