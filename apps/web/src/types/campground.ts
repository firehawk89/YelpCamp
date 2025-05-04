import { CampgroundFormFields } from '@/modules/campgrounds/schemas/form.schema';
import { Currency } from '@repo/types';

import { SortOptions } from './api';

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
  campground?: {
    _id: string;
    slug: string;
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
