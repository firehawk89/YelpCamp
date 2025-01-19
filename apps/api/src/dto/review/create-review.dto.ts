import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDTO {
  @IsOptional()
  @IsString({ message: 'Review text must be a string' })
  body?: string;

  @IsNotEmpty({ message: 'Rating is required' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsNumber(undefined, { message: 'Rating must be a number' })
  rating: number;
}
