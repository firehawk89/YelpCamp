import { routes } from '@/app/routes';
import { Campground } from '@/types/campground';
import { cn, round } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import { HeartIcon } from '@repo/ui/icons';
import ImagePlaceholder from '@repo/ui/image-placeholder';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';

import CampgroundLocation from './CampgroundLocation';
import CampgroundRating from './CampgroundRating';
import ReviewsChip from './ReviewsChip';

interface CampgroundCardProps extends CardProps {
  campground: Campground;
  imageSrc?: string | StaticImport;
}

const CampgroundCard = ({ campground, ...props }: CampgroundCardProps) => {
  return (
    <Card className="relative max-sm:flex-col" component="article" size="compact" {...props}>
      <ImagePlaceholder className="flex-shrink-0 basis-1/3" />

      <div className="flex flex-grow gap-4 p-4 max-sm:flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <Link href={routes.campground(campground.slug)}>
            <h2 className="text-2xl font-medium">{campground.title}</h2>
          </Link>

          <CampgroundLocation location={campground.location} />

          <div className="flex flex-wrap items-center gap-2">
            <CampgroundRating rating={campground.rating} />
            <ReviewsChip reviewsCount={campground.reviewsCount} />
          </div>

          {campground.description && <p className="text-neutral-700">{campground.description}</p>}
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
              <span className="text-lg font-semibold text-black">{round(campground.price)} $</span>
              <span className="text-neutral-500">per night</span>
            </p>

            <Link
              className={cn('justify-center', buttonVariants({ variant: 'accent' }))}
              href={routes.campground(campground.slug)}
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
