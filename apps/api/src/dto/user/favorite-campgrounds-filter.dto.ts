import { IsOptional, IsString } from 'class-validator';

export class FavoriteCampgroundsFilterDTO {
  @IsOptional()
  @IsString({ message: 'Page should be a string' })
  page?: string;
}
