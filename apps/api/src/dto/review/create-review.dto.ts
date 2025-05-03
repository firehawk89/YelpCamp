import {
  MAX_REVIEW_BODY_LENGTH,
  MAX_REVIEW_TITLE_LENGTH,
  MIN_REVIEW_BODY_LENGTH,
  MIN_REVIEW_TITLE_LENGTH,
} from '@repo/constants';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateReviewDTO {
  @IsOptional()
  @IsString({ message: 'Review title must be a string' })
  @MinLength(MIN_REVIEW_TITLE_LENGTH, {
    message: `Review title must be at least ${MIN_REVIEW_TITLE_LENGTH} characters long`,
  })
  @MaxLength(MAX_REVIEW_TITLE_LENGTH, {
    message: `Review title must be at least ${MAX_REVIEW_TITLE_LENGTH} characters long`,
  })
  title?: string;

  @IsNotEmpty({ message: 'Review text is required' })
  @IsString({ message: 'Review text must be a string' })
  @MinLength(MIN_REVIEW_BODY_LENGTH, {
    message: `Review text must be at least ${MIN_REVIEW_BODY_LENGTH} characters long`,
  })
  @MaxLength(MAX_REVIEW_BODY_LENGTH, {
    message: `Review text must be at least ${MAX_REVIEW_BODY_LENGTH} characters long`,
  })
  body: string;

  @IsNotEmpty({ message: 'Rating is required' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  @IsNumber(undefined, { message: 'Rating must be a number' })
  rating: number;
}
