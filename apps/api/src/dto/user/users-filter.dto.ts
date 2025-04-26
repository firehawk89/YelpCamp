import { IsEmail, IsMongoId, IsOptional } from 'class-validator';

export class UsersFilterDTO {
  @IsOptional()
  @IsMongoId({ message: 'Invalid user ID format' })
  id?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email address should be valid' })
  email?: string;
}
