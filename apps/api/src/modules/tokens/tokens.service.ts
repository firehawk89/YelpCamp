import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import crypto from 'crypto';
import { Model } from 'mongoose';
import { REFRESH_TOKEN_EXPIRATION_DATE } from 'src/helpers/constants/auth';
import { handleError } from 'src/helpers/misc';
import { RefreshToken } from 'src/schemas/refresh-token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>) {}

  async invalidateUserTokens(userId: string): Promise<void> {
    try {
      await this.refreshTokenModel.deleteMany({ userId }).exec();
    } catch (error) {
      handleError(error, TokenService.name);
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    try {
      const refreshToken = crypto.randomUUID();
      await this.refreshTokenModel
        .updateOne(
          { userId },
          { $set: { token: refreshToken, expiryDate: REFRESH_TOKEN_EXPIRATION_DATE } },
          { upsert: true }
        )
        .exec();
      return refreshToken;
    } catch (error) {
      handleError(error, TokenService.name);
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<string> {
    try {
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }

      const foundRefreshToken = await this.refreshTokenModel.findOne({
        token: refreshToken,
        expiryDate: { $gte: new Date() },
      });

      if (!foundRefreshToken) {
        throw new Error('Refresh token is expired or invalid');
      }

      await this.refreshTokenModel.deleteOne({ _id: foundRefreshToken._id });

      return foundRefreshToken.userId.toString();
    } catch (error) {
      handleError(error, TokenService.name);
    }
  }
}
