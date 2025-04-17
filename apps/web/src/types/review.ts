import { Campground } from './campground';
import { User } from './user';

export interface ReviewAuthor {
  _id: string;
  email: User['email'];
}

export interface ReviewCampground {
  _id: string;
  title: Campground['title'];
  slug: Campground['slug'];
}

export interface Review {
  _id: string;
  title?: string;
  body: string;
  rating: number;
  campground: ReviewCampground;
  author: ReviewAuthor;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}
