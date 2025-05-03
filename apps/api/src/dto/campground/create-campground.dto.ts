import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested, IsMongoId } from 'class-validator';

import LocationDTO from './location.dto';
import PriceDTO from './price.dto';

export class CreateCampgroundDTO {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Slug should be a string' })
  slug?: string;

  @ValidateNested()
  @Type(() => PriceDTO)
  price: PriceDTO;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  description?: string;

  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @IsNotEmpty({ message: 'Author is required' })
  @IsMongoId({ message: 'Invalid author ID format' })
  author: string;
}
