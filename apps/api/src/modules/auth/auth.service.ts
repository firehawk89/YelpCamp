import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokens } from '@repo/types';
import { SignInDTO } from 'src/dto/auth/sign-in.dto';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';
import { comparePassword, hashPassword } from 'src/helpers/crypto';
import { handleError } from 'src/helpers/misc';

import { TokenService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {}

  async signIn(signInDto: SignInDTO): Promise<UserTokens> {
    try {
      const foundUser = await this.usersService.getByEmail(signInDto.email, false);
      if (!foundUser) {
        throw new ConflictException("User doesn't exist");
      }

      const isPasswordCorrect = await comparePassword(signInDto.password, foundUser.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('Invalid password');
      }

      const userTokens = await this.generateUserTokens(foundUser._id.toString());

      return userTokens;
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async signUp(signUpDto: SignUpDTO): Promise<UserTokens> {
    try {
      const existingUser = await this.usersService.getByEmail(signUpDto.email, false);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await hashPassword(signUpDto.password);

      const newUser = await this.usersService.create({
        email: signUpDto.email,
        password: hashedPassword,
      });
      const userTokens = await this.generateUserTokens(newUser._id.toString());

      await newUser.save();
      return userTokens;
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async logout(userId: string): Promise<{ message: string }> {
    try {
      await this.tokenService.invalidateUserTokens(userId);
      return { message: 'User logged out successfully' };
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<UserTokens> {
    try {
      const userId = await this.tokenService.validateRefreshToken(refreshToken);
      const accessToken = this.jwtService.sign({ userId });
      return { accessToken, refreshToken };
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
