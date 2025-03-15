import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';

import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.usersService.delete(email);
  }
}
