import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REFRESH_TOKEN_EXPIRATION_MILLISECONDS } from '@repo/constants';
import crypto from 'crypto';
import { isValidObjectId, Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { handleError } from 'src/helpers/misc';
import { RefreshToken } from 'src/schemas/refresh-token.schema';
import { I18nTranslations } from 'src/types/i18n';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private readonly i18n: I18nService<I18nTranslations>
  ) {}

  async invalidateUserTokens(userId: string): Promise<void> {
    try {
      const isValidId = isValidObjectId(userId);
      if (!isValidId) {
        throw new BadRequestException('Invalid user ID');
      }

      await this.refreshTokenModel.deleteMany({ userId: { $eq: userId } }).exec();
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
        throw new UnauthorizedException(
          this.i18n.t('errors.auth.tokens.refreshTokenMissing', { lang: I18nContext.current().lang })
        );
      }

      const foundRefreshToken = await this.refreshTokenModel.findOne({
        token: { $eq: refreshToken },
        expiryDate: { $gte: new Date() },
      });

      if (!foundRefreshToken) {
        throw new UnauthorizedException(
          this.i18n.t('errors.auth.tokens.refreshTokenExpiredOrInvalid', { lang: I18nContext.current().lang })
        );
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
