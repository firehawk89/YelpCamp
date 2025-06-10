import CampgroundForm from '@/modules/campgrounds/components/CampgroundForm';
import CampgroundLocation from '@/modules/campgrounds/components/CampgroundLocation';
import CampgroundRating from '@/modules/campgrounds/components/CampgroundRating';
import ReviewsChip from '@/modules/campgrounds/components/ReviewsChip';
import Reviews from '@/modules/reviews/components';
import { fetchCampground } from '@/server/campgrounds';
import { fetchCampgroundReviews } from '@/server/reviews';
import { getSessionUser } from '@/server/session';
import ImagePlaceholder from '@repo/ui/image-placeholder';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface CampgroundPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Campground({ params }: CampgroundPageProps) {
  const user = await getSessionUser();
  const { slug } = await params;

  if (slug === 'new') {
    return <CampgroundForm user={user} />;
  }

  const { result: campground, error: campgroundError } = await fetchCampground(slug);

  if (!campground) {
    notFound();
  }

  if (campgroundError) {
    throw new Error(typeof campgroundError === 'string' ? campgroundError : campgroundError.join(', '));
  }

  const image = campground.images?.[0];

  const { result: reviews, error: reviewsError } = await fetchCampgroundReviews(campground._id);

  if (reviewsError) {
    throw new Error(typeof reviewsError === 'string' ? reviewsError : reviewsError.join(', '));
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">{campground.title}</h1>

        <div className="flex items-center justify-center gap-3">
          <CampgroundRating rating={campground.rating} />
          <ReviewsChip reviewsCount={campground.reviewsCount} campgroundSlug={campground.slug} />
          <CampgroundLocation location={campground.location} />
        </div>

        <div className="flex w-full flex-col gap-3 text-center lg:w-[70%]">
          {image ? (
            <div className="relative mx-auto aspect-video w-full shrink-0 overflow-hidden rounded-lg">
              <Image
                className="object-cover object-center"
                src={image?.url}
                alt={image.fileName ?? `campground-${campground._id}-image`}
                fill
              />
            </div>
          ) : (
            <ImagePlaceholder className="mx-auto aspect-video w-full shrink-0 rounded-lg" />
          )}

          {campground.description && <p className="text-neutral-700">{campground.description}</p>}
        </div>
      </div>

      <div className="w-full lg:mx-auto lg:w-[70%]">
        <Reviews reviewsData={reviews} campground={campground} user={user} error={reviewsError} mode="campground" />
      </div>
    </div>
  );
}
