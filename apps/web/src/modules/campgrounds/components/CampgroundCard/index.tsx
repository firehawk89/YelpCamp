import { routes } from '@/app/routes';
import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import { CloseIcon } from '@repo/ui/icons';
import ImagePlaceholder from '@repo/ui/image-placeholder';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

import CampgroundLocation from '../CampgroundLocation';
import CampgroundMenu from '../CampgroundMenu';
import CampgroundPrice from '../CampgroundPrice';
import CampgroundRating from '../CampgroundRating';
import FavoriteButton from '../FavoriteButton';
import ReviewsChip from '../ReviewsChip';

export interface CampgroundCardProps extends CardProps {
  campground: Campground;
  user?: User | null;
  imageSrc?: string | StaticImport;
  preview?: boolean;
  onClose?: () => void;
}

const CampgroundCard = ({ campground, user, preview, onClose, className, ...props }: CampgroundCardProps) => {
  const isFavoriteCampground = !!user?.favoriteCampgrounds.some((campgroundId) => campgroundId === campground._id);
  const image = campground.images?.[0];

  const isUserCampground = campground.author === user?._id;

  return (
    <Card
      className={cn('relative overflow-hidden', { 'max-sm:flex-col': !preview }, className)}
      component="article"
      size="compact"
      {...props}
    >
      {image?.url ? (
        <div className={cn('relative aspect-[1.43/1] w-full flex-shrink-0 basis-1/3', { 'max-w-44': preview })}>
          <Image
            className="object-cover object-center"
            src={image.url}
            alt={image.fileName ?? `campground-${campground._id}-image`}
            fill
          />
        </div>
      ) : (
        <ImagePlaceholder className={cn('aspect-[1.43/1] flex-shrink-0 basis-1/3', { 'max-w-40': preview })} />
      )}

      <div
        className={cn('flex flex-grow gap-4 p-4 max-sm:flex-col', { 'max-sm:flex-col': !preview, 'p-2.5': preview })}
      >
        <div className="flex flex-1 flex-col gap-2">
          <Link href={routes.campground.view(campground.slug)} className="flex justify-between gap-2">
            <h2 className={cn('text-2xl font-medium', { 'text-lg font-semibold': preview })}>{campground.title}</h2>
            {preview && <Button className="-mr-1.5 -mt-1.5 sm:hidden" onClick={onClose} icon={<CloseIcon />} />}
          </Link>

          {!preview && <CampgroundLocation location={campground.location} />}

          <div className="flex flex-wrap items-center gap-2">
            <CampgroundRating rating={campground.rating} preview={preview} />
            <ReviewsChip reviewsCount={campground.reviewsCount} campgroundSlug={campground.slug} preview={preview} />
          </div>

          {campground.description && (
            <p className={cn('line-clamp-4 text-neutral-700', { 'line-clamp-3 max-sm:hidden': preview })}>
              {campground.description}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 sm:items-end">
          {preview && <Button className="-mr-1.5 -mt-1.5 max-sm:hidden" onClick={onClose} icon={<CloseIcon />} />}

          {!preview && (
            <div className="flex items-center">
              <FavoriteButton
                className="max-sm:absolute max-sm:right-4 max-sm:top-4 max-sm:z-[5]"
                campgroundId={campground._id}
                isFavorite={isFavoriteCampground}
                isLoggedIn={!!user}
              />

              {isUserCampground && <CampgroundMenu campground={campground} />}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-2">
            <CampgroundPrice price={campground.price} preview={preview} />

            <Link
              className={cn('justify-center', buttonVariants({ variant: 'accent', size: preview ? 'sm' : 'default' }))}
              href={routes.campground.view(campground.slug)}
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
