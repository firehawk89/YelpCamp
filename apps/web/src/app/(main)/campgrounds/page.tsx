import CampgroundsList from '@/modules/campgrounds/components/CampgroundsList';
import CampgroundsFilterBar from '@/modules/campgrounds/components/FilterBar';
import { CampgroundsFilterDto } from 'src/types/campground';
import { fetchCampgrounds } from 'src/utils/api/campgrounds';

interface CampgroundsPageProps {
  searchParams?: CampgroundsFilterDto;
}

export default async function Campgrounds({ searchParams }: CampgroundsPageProps) {
  const filter = (await searchParams) ?? {};

  const { result, error } = await fetchCampgrounds(filter);
  const { data: campgrounds, metadata: campgroundsMetadata } = result ?? {};

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  return (
    <div className="flex gap-5">
      <aside className="hidden flex-shrink-0 lg:block xl:basis-1/4">
        <CampgroundsFilterBar />
      </aside>

      <CampgroundsList className="flex-1" campgrounds={campgrounds} paginationData={campgroundsMetadata} />
    </div>
  );
}
