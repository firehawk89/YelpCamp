import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCampgroundDTO {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @Min(0, { message: 'Price must be greater than 0' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a decimal' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Location should be a string' })
  location: string;
}
