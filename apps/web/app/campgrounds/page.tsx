import CampgroundsList from '@/components/campgrounds/CamgroundsList';
import CampgroundsFilterBar from '@/components/campgrounds/FilterBar';
import { fetchCampgrounds } from '@/utils/api/campgrounds';
import { CampgroundsFilterDto } from 'types/campground';

interface CampgroundsPageProps {
  searchParams?: CampgroundsFilterDto;
}

export default async function Campgrounds({ searchParams }: CampgroundsPageProps) {
  const filter = (await searchParams) ?? {};

  const { result, error } = await fetchCampgrounds(filter);
  const { data: campgrounds, metadata: campgroundsMetadata } = result ?? {};

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex gap-5">
      <CampgroundsFilterBar className="flex-shrink-0 xl:basis-1/4" />
      <CampgroundsList className="flex-1" campgrounds={campgrounds} paginationData={campgroundsMetadata} />
    </div>
  );
}
