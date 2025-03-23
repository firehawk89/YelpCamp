import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LogOutDTO } from 'src/dto/auth/log-out.dto';
import { SignInDTO } from 'src/dto/auth/sign-in.dto';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Post('log-out')
  logOut(@Body() logOutDto: LogOutDTO) {
    return this.authService.logout(logOutDto.userId);
  }

  @Post('refresh')
  validateRefreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.validateRefreshToken(refreshToken);
  }
}
