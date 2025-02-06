import { IsOptional, IsString } from 'class-validator';

export class CampgroundsFilterDTO {
  @IsOptional()
  @IsString({ message: 'Search query must be a string' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'Page should be a string' })
  page?: string;
}
