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
import { SignInResponse, UserTokens } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDTO): Promise<SignInResponse> {
    try {
      const foundUser = await this.userModel.findOne({ email: signInDto.email }).exec();
      if (!foundUser) {
        throw new ConflictException("User doesn't exist");
      }

      const isPasswordCorrect = await bcrypt.compare(signInDto.password, foundUser.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('Invalid password');
      }

      const userTokens = await this.generateUserTokens(foundUser._id.toString());

      return { ...userTokens, userId: foundUser._id.toString() };
    } catch (error) {
      handleError(error, AuthService.name);
    }
  }

  async signUp(signUpDto: SignUpDTO): Promise<User> {
    try {
      const isUserExist = await this.userModel.findOne({ email: signUpDto.email }).exec();
      if (isUserExist) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      return this.userModel.create({ email: signUpDto.email, password: hashedPassword });
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
