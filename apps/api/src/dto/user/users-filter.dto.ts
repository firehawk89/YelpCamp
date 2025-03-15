import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersFilterDTO {
  @IsOptional()
  @IsString({ message: 'ID must be a string' })
  id?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email address should be valid' })
  email?: string;
}
