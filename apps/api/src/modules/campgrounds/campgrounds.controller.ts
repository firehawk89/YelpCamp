import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { type JwtPayload } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { CampgroundsFilterDTO } from 'src/dto/campground/campgrounds-filter.dto';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';
import { ReviewsFilterDTO } from 'src/dto/review/reviews-filter.dto';

import { AuthGuard } from '../auth/auth.guard';
import { ReviewsService } from '../reviews/reviews.service';
import { CampgroundsService } from './campgrounds.service';

@Controller('campgrounds')
export class CampgroundsController {
  constructor(
    private readonly campgroundsService: CampgroundsService,
    private readonly reviewsService: ReviewsService
  ) {}

  @Get()
  getCampgrounds(@Query() filter?: CampgroundsFilterDTO) {
    return this.campgroundsService.getAll(filter);
  }

  @UseGuards(AuthGuard)
  @Post()
  createCampground(@Body() createCampgroundDto: CreateCampgroundDTO) {
    return this.campgroundsService.create(createCampgroundDto);
  }

  @Get(':slug')
  getCampgroundBySlug(@Param('slug') slug: string) {
    return this.campgroundsService.getBySlug(slug);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateCampground(@Param('id') id: string, @Body() updateCampgroundDto: UpdateCampgroundDTO) {
    return this.campgroundsService.update(id, updateCampgroundDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCampground(@Param('id') id: string) {
    return this.campgroundsService.delete(id);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') campgroundId: string, @Query() filter?: ReviewsFilterDTO) {
    return this.reviewsService.getAllByCampgroundId(campgroundId, filter);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reviews')
  createReview(@Param('id') campgroundId: string, @User() user: JwtPayload, @Body() createReviewDto: CreateReviewDTO) {
    return this.reviewsService.create(campgroundId, user.userId, createReviewDto);
  }
}
