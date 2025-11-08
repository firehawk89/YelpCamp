import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { type JwtPayload } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { ReviewsFilterDTO } from 'src/dto/review/reviews-filter.dto';
import { AddFavoriteCampgroundDTO } from 'src/dto/user/add-favorite-campground.dto';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { FavoriteCampgroundsFilterDTO } from 'src/dto/user/favorite-campgrounds-filter.dto';
import { RemoveFavoriteCampgroundDTO } from 'src/dto/user/remove-favorite-campground.dto';
import { UpdateUserPasswordDTO } from 'src/dto/user/update-user-password.dto';
import { UpdateUserDTO } from 'src/dto/user/update-user.dto';
import { UsersFilterDTO } from 'src/dto/user/users-filter.dto';

import { JwtAuthGuard } from '../auth/auth.guard';
import { ReviewsService } from '../reviews/reviews.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly reviewsService: ReviewsService
  ) {}

  @Get()
  getUsers(@Query() filter?: UsersFilterDTO) {
    const { id, email } = filter;
    if (id) return this.usersService.getById(id);
    if (email) return this.usersService.getByEmail(email);
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites/campgrounds')
  getFavoriteCampgrounds(@User() user: JwtPayload, @Query() filter?: FavoriteCampgroundsFilterDTO) {
    return this.usersService.getFavoriteCampgrounds(user.userId, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/campgrounds')
  addFavoriteCampground(@User() user: JwtPayload, @Body() addFavoriteCampgroundDto: AddFavoriteCampgroundDTO) {
    return this.usersService.addFavoriteCampground(user.userId, addFavoriteCampgroundDto.campgroundId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/campgrounds')
  removeFavoriteCampground(@User() user: JwtPayload, @Body() removeFavoriteCampgroundDto: RemoveFavoriteCampgroundDTO) {
    return this.usersService.removeFavoriteCampground(user.userId, removeFavoriteCampgroundDto.campgroundId);
  }

  @Get(':id/reviews')
  getUserReviews(@Param('id') id: string, @Query() filter?: ReviewsFilterDTO) {
    return this.reviewsService.getAllByUserId(id, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  updateUserPassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDTO) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
