import { CampgroundFormFields } from '@/modules/campgrounds/schemas/form.schema';

import { SortOptions } from './api';
import { Currency } from './misc';

export interface CampgroundPrice {
  value: number;
  currency: Currency;
}

export interface CampgroundLocation {
  full_address: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
}

export interface Campground {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  price: CampgroundPrice;
  location: CampgroundLocation;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampgroundsFilterDto extends SortOptions {
  page?: string;
  search?: string;
  rating?: string;
}

export type CreateCampgroundDTO = Pick<
  CampgroundFormFields,
  'title' | 'slug' | 'description' | 'location' | 'price'
> & {
  author: string;
};
