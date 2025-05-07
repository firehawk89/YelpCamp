import { MIN_PASSWORD_LENGTH } from '@repo/constants';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { IsBase64Image } from 'src/decorators/isBase64Image.decorator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email address should be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number`,
    }
  )
  password: string;

  @IsOptional()
  @IsBase64Image()
  avatar?: string;
}
