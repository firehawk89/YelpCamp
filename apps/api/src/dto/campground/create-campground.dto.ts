import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCampgroundDTO {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Price is required' })
  @Min(0, { message: 'Price must be greater than 0' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a decimal' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  description: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location should be a string' })
  location: string;
}
