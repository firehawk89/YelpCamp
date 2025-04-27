import { IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { IsBase64Image } from 'src/decorators/isBase64Image.decorator';
import { MAX_USER_NAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USER_NAME_LENGTH } from 'src/helpers/constants/validation';

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail({}, { message: 'Email address should be valid' })
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number`,
    }
  )
  password?: string;

  @IsOptional()
  @IsString({ message: 'First name should be a string' })
  @MinLength(MIN_USER_NAME_LENGTH, { message: `First name must be at least ${MIN_USER_NAME_LENGTH} characters long` })
  @MaxLength(MAX_USER_NAME_LENGTH, { message: `First name must be less than ${MAX_USER_NAME_LENGTH} characters long` })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name should be a string' })
  @MinLength(MIN_USER_NAME_LENGTH, { message: `Last name must be at least ${MIN_USER_NAME_LENGTH} characters long` })
  @MaxLength(MAX_USER_NAME_LENGTH, { message: `Last name must be less than ${MAX_USER_NAME_LENGTH} characters long` })
  lastName?: string;

  @IsOptional()
  @IsBase64Image({ message: 'Avatar image should be in base64 format with the header' })
  avatar?: string;
}
