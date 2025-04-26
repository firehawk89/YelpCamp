import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveFavoriteCampgroundDTO {
  @IsNotEmpty({ message: 'Campground ID is required' })
  @IsMongoId({ message: 'Invalid campground ID format' })
  campgroundId: string;
}
