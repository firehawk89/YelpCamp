import { IsOptional, IsString } from 'class-validator';

export class ReviewsFilterDTO {
  @IsOptional()
  @IsString({ message: 'Page should be a string' })
  page?: string;
}
