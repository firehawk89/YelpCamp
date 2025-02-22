import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(): Promise<unknown> {
    try {
      return 'user';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
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
      console.error(error);
      throw error;
    }
  }

  async getByEmail(email: string): Promise<User> {
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
      console.error(error);
      throw error;
    }
  }

  async delete(id: string): Promise<User> {
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
      console.error(error);
      throw error;
    }
  }
}
