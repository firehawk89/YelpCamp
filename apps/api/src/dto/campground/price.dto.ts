import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Currency } from 'src/types/misc';

class PriceDTO {
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a valid decimal number' })
  @Min(0, { message: 'Price cannot be negative' })
  value: number;

  @IsOptional()
  @IsEnum(Currency, { message: 'Currency is invalid' })
  currency: Currency = Currency.USD;
}

export default PriceDTO;
