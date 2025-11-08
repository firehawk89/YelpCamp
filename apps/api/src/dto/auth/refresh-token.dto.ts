import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsUUID('4', { message: 'Refresh token must be a valid UUID' })
  refreshToken: string;
}
