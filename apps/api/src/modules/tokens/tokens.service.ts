import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REFRESH_TOKEN_EXPIRATION_MILLISECONDS } from '@repo/constants';
import crypto from 'crypto';
import { Model } from 'mongoose';
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
      const expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MILLISECONDS); // 7 days from now

      await this.refreshTokenModel
        .updateOne({ userId }, { $set: { token: refreshToken, expiryDate } }, { upsert: true })
        .exec();
      return refreshToken;
    } catch (error) {
      handleError(error, TokenService.name);
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<string> {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is required');
      }

      const foundRefreshToken = await this.refreshTokenModel.findOne({
        token: refreshToken,
        expiryDate: { $gte: new Date() },
      });

      if (!foundRefreshToken) {
        throw new UnauthorizedException('Refresh token is expired or invalid');
      }

      const userId = foundRefreshToken.userId.toString();

      await this.generateRefreshToken(userId);
      await this.refreshTokenModel.deleteOne({ _id: foundRefreshToken._id });

      return userId;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      handleError(error, TokenService.name);
    }
  }
}
