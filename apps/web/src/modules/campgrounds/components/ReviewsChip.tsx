import { routes } from '@/app/routes';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface ReviewsChipProps extends HTMLAttributes<HTMLAnchorElement> {
  reviewsCount: Campground['reviewsCount'];
  campgroundSlug: Campground['slug'];
  preview?: boolean;
}

const ReviewsChip = ({ reviewsCount, campgroundSlug, preview, className, ...props }: ReviewsChipProps) => (
  <Link
    href={routes.campground(`${campgroundSlug}#reviews`)}
    className={cn(
      'bg-accent/20 hover:bg-accent/30 rounded-lg px-2 py-1 text-sm transition-all',
      {
        'text-xs': preview,
      },
      className
    )}
    {...props}
  >
    {!reviewsCount ? 'No reviews yet' : `${reviewsCount} ${reviewsCount > 1 ? 'reviews' : 'review'}`}
  </Link>
);

export default ReviewsChip;
