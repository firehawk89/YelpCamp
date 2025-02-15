import { cn } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import { HeartIcon, MapPinIcon, StarIcon } from '@repo/ui/icons';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import { FC } from 'react';
import { Campground } from 'types/campground';

import ImagePlaceholder from '../shared/ImagePlaceholder';

interface CampgroundCardProps extends CardProps {
  campground: Campground;
  imageSrc?: string | StaticImport;
}

const CampgroundCard: FC<CampgroundCardProps> = ({ campground, ...props }) => {
  return (
    <Card className="relative max-sm:flex-col" component="article" size="compact" {...props}>
      <ImagePlaceholder className="flex-shrink-0 basis-1/3" />

      <div className="flex flex-grow gap-4 p-4 max-sm:flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <Link href={`/campgrounds/${campground.slug}`}>
            <h2 className="text-2xl font-medium">{campground.title}</h2>
          </Link>

          <div className="flex items-center gap-1 text-neutral-500">
            <MapPinIcon />
            <span> {campground.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-1">
              <StarIcon className="fill-accent text-accent" />

              {campground.rating ? (
                <>
                  <span className="text-lg">{campground.rating}</span>
                  <span className="text-neutral-500">/5</span>
                </>
              ) : (
                <span className="text-sm text-neutral-500">No rating yet</span>
              )}
            </p>

            <span className="rounded-lg bg-orange-100 px-2 py-1 text-sm text-neutral-600">
              {campground.reviewsCount ?? 0} reviews
            </span>
          </div>

          {campground.description && <p className="text-neutral-500">{campground.description}</p>}
        </div>

        <div className="flex flex-col justify-between gap-4 sm:items-end">
          <Button
            className="max-sm:absolute max-sm:right-4 max-sm:top-4 max-sm:z-[5]"
            color="destructive"
            size="icon"
            icon={<HeartIcon className="size-7" />}
          />

          <div className="flex flex-col gap-2.5">
            <p className="flex items-center max-sm:justify-center max-sm:gap-2 sm:flex-col sm:items-end">
              <span className="text-lg font-semibold text-black">{campground.price} $</span>
              <span className="text-neutral-500">per night</span>
            </p>

            <Link
              className={cn('justify-center', buttonVariants({ variant: 'accent' }))}
              href={`/campgrounds/${campground.slug}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampgroundCard;
