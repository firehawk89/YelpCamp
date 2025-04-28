import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from 'src/helpers/constants/validation';

export class UpdateUserPasswordDTO {
  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number`,
    }
  )
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number`,
    }
  )
  newPassword?: string;

  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: MIN_PASSWORD_LENGTH, minLowercase: 1, minUppercase: 1, minNumbers: 1 },
    {
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number`,
    }
  )
  confirmedNewPassword?: string;
}
