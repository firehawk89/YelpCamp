import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import CoordinatesDTO from './coordinates.dto';

class LocationDTO {
  @IsNotEmpty({ message: 'Location address is required' })
  @IsString({ message: 'Location address must be a string' })
  full_address: string;

  @ValidateNested()
  @Type(() => CoordinatesDTO)
  coordinates: CoordinatesDTO;
}

export default LocationDTO;
