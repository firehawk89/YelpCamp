'use client';

import { routes } from '@/app/routes';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface ReviewsChipProps extends HTMLAttributes<HTMLAnchorElement> {
  reviewsCount: Campground['reviewsCount'];
  campgroundSlug: Campground['slug'];
  preview?: boolean;
}

const ReviewsChip = ({ reviewsCount, campgroundSlug, preview, className, ...props }: ReviewsChipProps) => {
  const t = useTranslations('pages.campground');

  return (
    <Link
      href={routes.campground.view(`${campgroundSlug}#reviews`)}
      className={cn(
        'bg-accent/20 hover:bg-accent/30 rounded-lg px-2 py-1 text-sm transition-all',
        {
          'text-xs': preview,
        },
        className
      )}
      {...props}
    >
      {t('reviewsCount', { count: reviewsCount ?? 0 })}
    </Link>
  );
};

export default ReviewsChip;
