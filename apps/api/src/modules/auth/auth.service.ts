import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokens } from '@repo/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';
import { comparePassword, hashPassword } from 'src/helpers/crypto';
import { handleError } from 'src/helpers/misc';
import { I18nTranslations } from 'src/types/i18n';

import { TokenService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService<I18nTranslations>
  ) {}

  async signIn(email: string, password: string): Promise<UserTokens> {
    try {
      const foundUser = await this.usersService.getByEmail(email, false);

      if (!foundUser) {
        throw new ConflictException(this.i18n.t('errors.users.userDoesNotExist', { lang: I18nContext.current().lang }));
      }

      const isPasswordCorrect = await comparePassword(password, foundUser.password);

      if (!isPasswordCorrect) {
        throw new BadRequestException(
          this.i18n.t('errors.users.invalidPassword', { lang: I18nContext.current().lang })
        );
      }

      return this.generateUserTokens(foundUser._id.toString());
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async signUp(signUpDto: SignUpDTO): Promise<UserTokens> {
    try {
      const existingUser = await this.usersService.getByEmail(signUpDto.email, false);

      if (existingUser) {
        throw new ConflictException(
          this.i18n.t('errors.users.userAlreadyExists', { lang: I18nContext.current().lang })
        );
      }

      const hashedPassword = await hashPassword(signUpDto.password);

      const newUser = await this.usersService.create({
        email: signUpDto.email,
        password: hashedPassword,
      });

      return this.generateUserTokens(newUser._id.toString());
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async logout(userId: string): Promise<{ message: string }> {
    try {
      await this.tokenService.invalidateUserTokens(userId);
      return { message: this.i18n.t('errors.users.loggedOut', { lang: I18nContext.current().lang }) };
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<UserTokens> {
    try {
      const userId = await this.tokenService.validateRefreshToken(refreshToken);
      return this.generateUserTokens(userId);
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  private async generateUserTokens(userId: string): Promise<UserTokens> {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = await this.tokenService.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }
}
