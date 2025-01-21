export interface Campground {
  _id: string;
  title: string;
  price: number;
  description?: string;
  location: string;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
}
