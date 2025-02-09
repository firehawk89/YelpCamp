import { SelectOption } from '@repo/ui/select';
import { SortOrder } from 'types/api';
import { Campground } from 'types/campground';

export const DEFAULT_SORT_BY_OPTION: SelectOption<keyof Campground> = { value: 'createdAt', label: 'Relevance' };

export const SORT_BY_OPTIONS: SelectOption<keyof Campground>[] = [
  DEFAULT_SORT_BY_OPTION,
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
];

export const DEFAULT_SORT_ORDER_OPTION: SelectOption<SortOrder> = { value: 'desc', label: 'Descending' };

export const SORT_ORDER_OPTIONS: SelectOption<SortOrder>[] = [
  DEFAULT_SORT_ORDER_OPTION,
  { value: 'asc', label: 'Ascending' },
];
