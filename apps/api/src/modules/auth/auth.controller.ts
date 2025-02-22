import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from 'src/dto/auth/sign-in.dto';
import { SignUpDTO } from 'src/dto/auth/sign-up.dto';

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

  @Post('refresh')
  validateRefreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.validateRefreshToken(refreshToken);
  }
}
