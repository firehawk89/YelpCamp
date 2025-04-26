import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LogOutDTO {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsMongoId({ message: 'Invalid user ID format' })
  userId: string;
}
