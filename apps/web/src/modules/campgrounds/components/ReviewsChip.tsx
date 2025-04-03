import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface ReviewsChipProps extends HTMLAttributes<HTMLDivElement> {
  reviewsCount: Campground['reviewsCount'];
  href?: Url;
}

const ReviewsChip = ({ reviewsCount, href, className, ...props }: ReviewsChipProps) => (
  <div className={cn('bg-accent rounded-lg bg-opacity-20 px-2 py-1 text-sm', className)} {...props}>
    {href && reviewsCount ? (
      <Link href={href}>
        {reviewsCount} {reviewsCount > 1 ? 'reviews' : 'review'}
      </Link>
    ) : (
      <span>{reviewsCount ? `${reviewsCount} reviews` : 'No reviews yet'}</span>
    )}
  </div>
);

export default ReviewsChip;
