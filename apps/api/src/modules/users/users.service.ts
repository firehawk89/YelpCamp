import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AVATAR_IMAGES_FOLDER_NAME, DEFAULT_PAGE } from '@repo/constants';
import { DEFAULT_PAGE_LIMIT, DEFAULT_SORT_ORDER, DEFAULT_SORT_FIELD } from '@repo/constants';
import { PaginatedResponse } from '@repo/types';
import { isEmail } from 'class-validator';
import mongoose, { isValidObjectId, Model, PipelineStage } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { FavoriteCampgroundsFilterDTO } from 'src/dto/user/favorite-campgrounds-filter.dto';
import { UpdateUserPasswordDTO } from 'src/dto/user/update-user-password.dto';
import { UpdateUserDTO } from 'src/dto/user/update-user.dto';
import { comparePassword, hashPassword } from 'src/helpers/crypto';
import { handleError, validateField } from 'src/helpers/misc';
import { Campground, CampgroundDocument } from 'src/schemas/campground.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { I18nTranslations } from 'src/types/i18n';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TokenService } from '../tokens/tokens.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService<I18nTranslations>
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    try {
      const { email } = createUserDto;

      const isValidEmail = isEmail(email);
      if (!isValidEmail) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidEmail', { lang: I18nContext.current().lang }));
      }

      const foundUser = await this.userModel.findOne({ email: { $eq: email } }).exec();
      if (foundUser) {
        throw new ConflictException(
          this.i18n.t('errors.users.userAlreadyExists', { lang: I18nContext.current().lang })
        );
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
        throw new BadRequestException(this.i18n.t('errors.users.invalidId', { lang: I18nContext.current().lang }));
      }

      const user = await this.userModel.findOne({ _id: { $eq: id } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      return user;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async getByEmail(email: string, throwError = true): Promise<UserDocument> {
    try {
      const isValidEmail = isEmail(email);
      if (!isValidEmail) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidEmail', { lang: I18nContext.current().lang }));
      }

      const user = await this.userModel.findOne({ email: { $eq: email } }).exec();
      if (!user && throwError) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      return user;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDTO): Promise<UserDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidId', { lang: I18nContext.current().lang }));
      }

      const user = await this.userModel.findOne({ _id: { $eq: id } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      if (updateUserDto.avatar) {
        return this.updateAvatar(id, updateUserDto.avatar);
      }

      return this.userModel
        .findByIdAndUpdate(
          id,
          {
            email: validateField(updateUserDto.email, user.email),
            firstName: validateField(updateUserDto.firstName, user.firstName),
            lastName: validateField(updateUserDto.lastName, user.lastName),
            avatar: validateField(updateUserDto.avatar, user.avatar),
          },
          { new: true }
        )
        .exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async updatePassword(userId: string, updateUserPasswordDto: UpdateUserPasswordDTO): Promise<UserDocument> {
    try {
      const isValidId = isValidObjectId(userId);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidId', { lang: I18nContext.current().lang }));
      }

      const user = await this.userModel.findOne({ _id: { $eq: userId } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      const { oldPassword, newPassword, confirmedNewPassword } = updateUserPasswordDto;

      const isPasswordCorrect = await comparePassword(oldPassword, user.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException(
          this.i18n.t('errors.users.invalidPassword', { lang: I18nContext.current().lang })
        );
      }

      if (newPassword !== confirmedNewPassword) {
        throw new BadRequestException(
          this.i18n.t('errors.users.newAndConfirmedPasswordsDoNotMatch', { lang: I18nContext.current().lang })
        );
      }

      const hashedNewPassword = await hashPassword(newPassword);

      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, { password: hashedNewPassword }, { new: true })
        .exec();

      await this.tokenService.invalidateUserTokens(userId);

      return updatedUser;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  private async updateAvatar(userId: string, avatar: string): Promise<UserDocument> {
    try {
      const avatarImageUrl = await this.cloudinaryService.uploadImage(avatar, {
        public_id: `avatar-${userId}`,
        folder: AVATAR_IMAGES_FOLDER_NAME,
      });

      return this.userModel.findByIdAndUpdate(userId, { avatar: avatarImageUrl }, { new: true }).exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async delete(id: string): Promise<UserDocument> {
    try {
      const isValidId = isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidId', { lang: I18nContext.current().lang }));
      }

      const foundUser = await this.userModel.findOne({ _id: { $eq: id } }).exec();
      if (!foundUser) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      return this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async getFavoriteCampgrounds(
    userId: string,
    filter: FavoriteCampgroundsFilterDTO
  ): Promise<PaginatedResponse<CampgroundDocument>> {
    try {
      const isValidId = isValidObjectId(userId);
      if (!isValidId) {
        throw new BadRequestException(this.i18n.t('errors.users.invalidId', { lang: I18nContext.current().lang }));
      }

      const user = await this.userModel.findOne({ _id: { $eq: userId } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      const page = Number(filter?.page) || DEFAULT_PAGE;
      const validPage = isNaN(page) || page < 1 ? DEFAULT_PAGE : page;
      const skip = (validPage - 1) * DEFAULT_PAGE_LIMIT;

      const totalCount = user.favoriteCampgrounds.length;

      const favoriteIds = user.favoriteCampgrounds.map((id) => new mongoose.Types.ObjectId(id.toString()));

      const pipeline: PipelineStage[] = [
        {
          $match: { _id: { $in: favoriteIds } },
        },
        {
          $sort: { [DEFAULT_SORT_FIELD]: DEFAULT_SORT_ORDER === 'asc' ? 1 : -1 },
        },
        {
          $facet: {
            metadata: [
              { $count: 'count' },
              {
                $addFields: {
                  totalCount,
                  page: validPage,
                  totalPages: { $ceil: { $divide: ['$count', DEFAULT_PAGE_LIMIT] } },
                  limit: DEFAULT_PAGE_LIMIT,
                  offset: skip,
                },
              },
            ],
            data: [
              { $skip: skip },
              { $limit: DEFAULT_PAGE_LIMIT },
              {
                $lookup: {
                  from: 'images',
                  localField: 'images',
                  foreignField: '_id',
                  pipeline: [{ $project: { url: 1, fileName: 1, type: 1 } }],
                  as: 'images',
                },
              },
            ],
          },
        },
      ];

      const [result] = await this.userModel.db
        .model(Campground.name)
        .aggregate<PaginatedResponse<CampgroundDocument>>(pipeline)
        .exec();

      // TODO: Leave only one metadata object
      result.metadata = result.metadata[0]
        ? { ...result.metadata[0] }
        : {
            count: result.data.length,
            totalCount,
            page: validPage,
            totalPages: Math.ceil(totalCount / DEFAULT_PAGE_LIMIT),
            limit: DEFAULT_PAGE_LIMIT,
            offset: skip,
          };

      return result;
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async addFavoriteCampground(userId: string, campgroundId: string): Promise<UserDocument> {
    try {
      if (!isValidObjectId(userId) || !isValidObjectId(campgroundId)) {
        throw new BadRequestException(
          this.i18n.t('errors.users.invalidUserOrCampgroundId', { lang: I18nContext.current().lang })
        );
      }

      const user = await this.userModel.findOne({ _id: { $eq: userId } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      const alreadyFavorite = user.favoriteCampgrounds.some((id) => id.toString() === campgroundId);
      if (alreadyFavorite) {
        return user;
      }

      return this.userModel
        .findByIdAndUpdate(userId, { $addToSet: { favoriteCampgrounds: campgroundId } }, { new: true })
        .exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }

  async removeFavoriteCampground(userId: string, campgroundId: string): Promise<UserDocument> {
    try {
      if (!isValidObjectId(userId) || !isValidObjectId(campgroundId)) {
        throw new BadRequestException(
          this.i18n.t('errors.users.invalidUserOrCampgroundId', { lang: I18nContext.current().lang })
        );
      }

      const user = await this.userModel.findOne({ _id: { $eq: userId } }).exec();
      if (!user) {
        throw new NotFoundException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      return this.userModel
        .findByIdAndUpdate(userId, { $pull: { favoriteCampgrounds: campgroundId } }, { new: true })
        .exec();
    } catch (error) {
      handleError(error, UsersService.name);
    }
  }
}
