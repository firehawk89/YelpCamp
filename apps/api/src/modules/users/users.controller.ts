import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { UpdateUserDTO } from 'src/dto/user/update-user.dto';
import { UsersFilterDTO } from 'src/dto/user/users-filter.dto';

import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.usersService.delete(email);
  }
}
