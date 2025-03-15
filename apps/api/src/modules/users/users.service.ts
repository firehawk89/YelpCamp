import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { handleError } from 'src/helpers/misc';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    try {
      const foundUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (foundUser) {
        throw new ConflictException('User already exists');
      }

      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<UserDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid user ID');
      }

      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException("User doesn't exist");
      }

      return user;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async getByEmail(email: string): Promise<UserDocument> {
    try {
      const isValidEmail = isEmail(email);
      if (!isValidEmail) {
        throw new BadRequestException('Invalid email');
      }

      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException("User doesn't exist");
      }

      return user;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async delete(id: string): Promise<UserDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid user ID');
      }

      const foundUser = await this.userModel.findById(id).exec();
      if (!foundUser) {
        throw new NotFoundException("User doesn't exist");
      }

      return this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }
}
