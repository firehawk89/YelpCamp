import { Campground } from '@/types/campground';
import { TFunction } from '@/types/misc';
import { SortOrder } from '@repo/types';
import { SelectOption } from '@repo/ui/select';

export const getDefaultSortByOption = (t: TFunction): SelectOption<keyof Campground> => ({
  value: 'createdAt',
  label: t('pages.campgrounds.sort.relevance'),
});

export const getSortByOptions = (t: TFunction): SelectOption<keyof Campground>[] => [
  getDefaultSortByOption(t),
  { value: 'price', label: t('pages.campgrounds.sort.price') },
  { value: 'rating', label: t('pages.campgrounds.sort.rating') },
];

export const getDefaultSortOrderOption = (t: TFunction): SelectOption<SortOrder> => ({
  value: 'desc',
  label: t('pages.campgrounds.sort.desc'),
});

export const getSortOrderOptions = (t: TFunction): SelectOption<SortOrder>[] => [
  getDefaultSortOrderOption(t),
  { value: 'asc', label: t('pages.campgrounds.sort.asc') },
];
