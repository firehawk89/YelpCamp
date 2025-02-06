import type { CampgroundsFilterDto } from 'src/types/api';

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';

import { CampgroundsService } from './campgrounds.service';

@Controller('campgrounds')
export class CampgroundsController {
  constructor(private readonly campgroundsService: CampgroundsService) {}

  @Get()
  getAllCampgrounds(@Query() filter?: CampgroundsFilterDto) {
    return this.campgroundsService.getAll(filter);
  }

  @Post()
  createCampground(@Body() createCampgroundDto: CreateCampgroundDTO) {
    return this.campgroundsService.create(createCampgroundDto);
  }

  @Get(':id')
  getCampgroundById(@Param('id') id: string) {
    return this.campgroundsService.getById(id);
  }

  @Patch(':id')
  updateCampground(@Param('id') id: string, @Body() updateCampgroundDto: UpdateCampgroundDTO) {
    return this.campgroundsService.update(id, updateCampgroundDto);
  }

  @Delete(':id')
  deleteCampground(@Param('id') id: string) {
    return this.campgroundsService.delete(id);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') campgroundId: string) {
    return this.campgroundsService.getReviews(campgroundId);
  }

  @Post(':id/reviews')
  createReview(@Param('id') campgroundId: string, @Body() createReviewDto: CreateReviewDTO) {
    return this.campgroundsService.createReview(campgroundId, createReviewDto);
  }
}
