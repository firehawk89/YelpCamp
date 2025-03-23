import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { SignInDTO } from 'src/dto/auth/sign-in.dto';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';
import { REFRESH_TOKEN_EXPIRY_DATE } from 'src/helpers/constants';
import { handleError } from 'src/helpers/misc';
import { RefreshToken } from 'src/schemas/refresh-token.schema';
import { User } from 'src/schemas/user.schema';
import { UserTokens } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDTO): Promise<UserTokens> {
    try {
      const foundUser = await this.userModel.findOne({ email: signInDto.email });
      if (!foundUser) {
        throw new ConflictException("User doesn't exist");
      }

      const isPasswordCorrect = await bcrypt.compare(signInDto.password, foundUser.password);
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
      const existingUser = await this.userModel.findOne({ email: signUpDto.email });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      const newUser = await this.userModel.create({ email: signUpDto.email, password: hashedPassword });
      const userTokens = await this.generateUserTokens(newUser._id.toString());

      await newUser.save();
      return userTokens;
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async logout(userId: string): Promise<{ message: string }> {
    try {
      await this.refreshTokenModel.deleteMany({ userId }).exec();
      return { message: 'User logged out successfully' };
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<UserTokens> {
    try {
      if (!refreshToken) {
        throw new BadRequestException('Refresh token is required');
      }

      const foundRefreshToken = await this.refreshTokenModel
        .findOneAndDelete({ token: refreshToken, expiryDate: { $gte: new Date() } })
        .exec();

      if (!foundRefreshToken) {
        throw new ForbiddenException('Refresh token is expired or invalid');
      }

      return this.generateUserTokens(foundRefreshToken.userId.toString());
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  private async generateUserTokens(userId: string): Promise<UserTokens> {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = await this.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = randomUUID();
    await this.refreshTokenModel
      .updateOne({ userId }, { $set: { token: refreshToken, expiryDate: REFRESH_TOKEN_EXPIRY_DATE } }, { upsert: true })
      .exec();
    return refreshToken;
  }
}
