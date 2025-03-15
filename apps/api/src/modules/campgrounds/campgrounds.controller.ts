import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CampgroundsFilterDTO } from 'src/dto/campground/campgrounds-filter.dto';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';

import { AuthGuard } from '../auth/auth.guard';
import { CampgroundsService } from './campgrounds.service';

@Controller('campgrounds')
export class CampgroundsController {
  constructor(private readonly campgroundsService: CampgroundsService) {}

  @Get()
  getAllCampgrounds(@Query() filter?: CampgroundsFilterDTO) {
    return this.campgroundsService.getAll(filter);
  }

  @UseGuards(AuthGuard)
  @Post()
  createCampground(@Body() createCampgroundDto: CreateCampgroundDTO) {
    return this.campgroundsService.create(createCampgroundDto);
  }

  @Get(':id')
  getCampgroundById(@Param('id') id: string) {
    return this.campgroundsService.getById(id);
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
  getReviews(@Param('id') campgroundId: string) {
    return this.campgroundsService.getReviews(campgroundId);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reviews')
  createReview(@Param('id') campgroundId: string, @Body() createReviewDto: CreateReviewDTO) {
    return this.campgroundsService.createReview(campgroundId, createReviewDto);
  }
}
