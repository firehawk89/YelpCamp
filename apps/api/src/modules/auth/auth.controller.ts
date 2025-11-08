import type { JwtPayload } from '@repo/types';

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { RefreshTokenDTO } from 'src/dto/auth/refresh-token.dto';
import { SignInDTO } from 'src/dto/auth/sign-in.dto';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';

import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  logOut(@User() user: JwtPayload) {
    return this.authService.logout(user.userId);
  }

  @Post('refresh')
  validateRefreshToken(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.validateRefreshToken(refreshTokenDto.refreshToken);
  }
}
