import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddFavoriteCampgroundDTO {
  @IsNotEmpty({ message: 'Campground ID is required' })
  @IsMongoId({ message: 'Invalid campground ID format' })
  campgroundId: string;
}
