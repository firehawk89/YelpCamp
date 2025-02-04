export interface Campground {
  _id: string;
  title: string;
  slug: string;
  price: number;
  description?: string;
  location: string;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampgroundsFilterDto {
  search?: string;
  page?: string;
}
