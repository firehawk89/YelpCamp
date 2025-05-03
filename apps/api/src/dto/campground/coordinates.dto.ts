import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

class CoordinatesDTO {
  @IsNotEmpty({ message: 'Latitude is required' })
  @IsLatitude({ message: 'Latitude must be a valid latitude' })
  latitude: number;

  @IsNotEmpty({ message: 'Longitude is required' })
  @IsLongitude({ message: 'Longitude must be a valid longitude' })
  longitude: number;
}

export default CoordinatesDTO;
