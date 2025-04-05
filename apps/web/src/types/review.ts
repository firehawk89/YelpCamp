export interface ReviewAuthor {
  _id: string;
  email: string;
}

export interface Review {
  _id: string;
  title?: string;
  body: string;
  rating: number;
  campgroundId: string;
  author: ReviewAuthor;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}
