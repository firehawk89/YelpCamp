import CampgroundLocation from '@/modules/campgrounds/components/CampgroundLocation';
import CampgroundRating from '@/modules/campgrounds/components/CampgroundRating';
import Reviews from '@/modules/campgrounds/components/Reviews';
import ReviewsChip from '@/modules/campgrounds/components/ReviewsChip';
import { fetchCampground } from '@/server/campgrounds';
import ImagePlaceholder from '@repo/ui/image-placeholder';

interface CampgroundProps {
  params: Promise<{ slug: string }>;
}

export default async function Campground({ params }: CampgroundProps) {
  const { slug } = await params;
  const { result: campground, error } = await fetchCampground(slug);

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">{campground?.title}</h1>

        <div className="flex items-center justify-center gap-3">
          <CampgroundRating rating={campground?.rating} />
          <ReviewsChip reviewsCount={campground?.reviewsCount} href="#reviews" />
          {campground?.location && <CampgroundLocation location={campground?.location} />}
        </div>

        <div className="flex flex-col gap-3 text-center lg:w-[75%]">
          <ImagePlaceholder className="mx-auto aspect-video w-full shrink-0 rounded-lg" />
          {campground?.description && <p className="text-neutral-700">{campground?.description}</p>}
        </div>

        {campground && <Reviews campground={campground} />}
      </div>
    </div>
  );
}
