import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CampgroundsService } from './campgrounds.service';
import { CreateCampgroundDTO } from 'src/dto/campground/create-campground.dto';
import { UpdateCampgroundDTO } from 'src/dto/campground/update-campground.dto';
import { CreateReviewDTO } from 'src/dto/review/create-review.dto';

@Controller('campgrounds')
export class CampgroundsController {
  constructor(private readonly campgroundsService: CampgroundsService) {}

  @Get()
  getAllCampgrounds() {
    return this.campgroundsService.getAll();
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
