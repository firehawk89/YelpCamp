import { IsNotEmpty, IsString } from 'class-validator';

export class LogOutDTO {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID should be a string' })
  userId: string;
}
