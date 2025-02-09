import type { SortOrder } from 'src/types/api';

import { IsOptional, IsString, Matches } from 'class-validator';
import { Campground } from 'src/schemas/campground.schema';

export class CampgroundsFilterDTO {
  @IsOptional()
  @IsString({ message: 'Search query must be a string' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'Page should be a string' })
  page?: string;

  @IsOptional()
  @IsString({ message: 'Sort by value should be a string' })
  sortBy?: keyof Campground;

  @IsOptional()
  @IsString({ message: 'Sort order should be a string' })
  @Matches(/^(asc|desc)$/, { message: 'Sort order should be either "asc" or "desc"' })
  sortOrder?: SortOrder;
}
