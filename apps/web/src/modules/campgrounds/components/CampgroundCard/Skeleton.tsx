import { cn } from '@/utils/misc';
import Card from '@repo/ui/card';

import { CampgroundCardProps } from '.';

const CampgroundCardSkeleton = ({ preview, className, ...props }: Omit<CampgroundCardProps, 'campground'>) => (
  <Card
    className={cn('relative overflow-hidden', { 'max-sm:flex-col': !preview }, className)}
    component="article"
    size="compact"
    {...props}
  >
    {/* Image placeholder */}
    <div
      className={cn('aspect-square flex-shrink-0 basis-1/3 animate-pulse bg-neutral-200', { 'max-w-40': preview })}
    />

    <div className={cn('flex flex-grow gap-4 p-4 max-sm:flex-col', { 'max-sm:flex-col': !preview, 'p-2.5': preview })}>
      <div className="flex flex-1 flex-col gap-2">
        {/* Title */}
        <div className={cn('h-7 w-2/3 animate-pulse rounded bg-neutral-200', { 'h-6': preview })} />

        {/* Location */}
        {!preview && <div className="h-5 w-1/2 animate-pulse rounded bg-neutral-200" />}

        {/* Rating and reviews */}
        <div className="flex animate-pulse flex-wrap items-center gap-2">
          <div className="h-6 w-16 rounded bg-neutral-200" />
          <div className="h-6 w-20 rounded bg-neutral-200" />
        </div>

        {/* Description */}
        <div className="flex animate-pulse flex-col gap-1.5 max-sm:hidden">
          <div className="h-4 w-3/4 rounded bg-neutral-200" />
          <div className="h-4 w-full rounded bg-neutral-200" />
          <div className="h-4 w-1/2 rounded bg-neutral-200" />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2.5 sm:items-end">
        {/* Action button */}
        <div
          className={cn('h-7 w-7 animate-pulse rounded bg-neutral-200', {
            'absolute right-2.5 top-2.5 h-6 w-6': preview,
          })}
        />

        {/* Price */}
        <div className="mt-auto flex animate-pulse flex-row gap-1.5 max-sm:justify-center sm:flex-col sm:items-end">
          <div className={cn('h-6 w-24 rounded bg-neutral-200', { 'h-5': preview })} />
          <div className="h-5 w-16 rounded bg-neutral-200" />
        </div>

        {/* Details button */}
        <div className={cn('h-9 w-28 animate-pulse rounded bg-neutral-200', { 'h-7 w-full md:w-24': preview })} />
      </div>
    </div>
  </Card>
);

export default CampgroundCardSkeleton;
