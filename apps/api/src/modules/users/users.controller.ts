import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Post()
  createUser() {
    return 'new user';
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.usersService.delete(email);
  }
}
