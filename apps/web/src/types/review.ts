export interface ReviewAuthor {
  _id: string;
  email: string;
}

export interface Review {
  _id: string;
  body?: string;
  rating: number;
  campgroundId: string;
  author: ReviewAuthor;
  createdAt: string;
  updatedAt: string;
}
