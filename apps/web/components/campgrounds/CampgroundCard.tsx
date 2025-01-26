import { buttonVariants } from '@repo/ui/button';
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
    <Card component="article" {...props}>
      <ImagePlaceholder className="flex-shrink-0 basis-1/3" />

      <div className="flex-grow flex gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <Link href={`/campgrounds/${campground.slug}`}>
            <h2 className="text-2xl">{campground.title}</h2>
          </Link>

          <div className="flex items-center gap-1 text-neutral-500">
            <MapPinIcon />
            <span> {campground.location}</span>
          </div>

          <div className="flex items-center gap-2">
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

            <span className="px-2 py-1 text-sm bg-orange-100 text-neutral-600 rounded-lg">
              {campground.reviewsCount} reviews
            </span>
          </div>

          <p className="text-neutral-500">{campground.description}</p>
        </div>

        <div className="flex flex-col gap-4 justify-between items-end">
          <HeartIcon className="cursor-pointer size-8 text-danger hover:scale-110 active:scale-100 transition-all" />

          <div className="flex flex-col gap-2.5">
            <p className="flex flex-col items-end">
              <span className="text-black text-xl">{campground.price} $</span>
              <span className="text-neutral-500">per night</span>
            </p>

            <Link className={buttonVariants({ variant: 'accent' })} href={`/campgrounds/${campground.slug}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampgroundCard;
