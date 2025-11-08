import { MIN_PASSWORD_LENGTH } from '@repo/constants';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    {
      message: `Password must contain at least ${MIN_PASSWORD_LENGTH} characters long and at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol`,
    }
  )
  password: string;
}
