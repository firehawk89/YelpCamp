import CampgroundsList from '@/components/campgrounds/CamgroundsList';
import CampgroundsFilterBar from '@/components/campgrounds/FilterBar';
import { fetchCampgrounds } from '@/utils/api/campgrounds';

interface CampgroundsPageProps {
  searchParams?: {
    search?: string;
  };
}

export default async function Campgrounds({ searchParams }: CampgroundsPageProps) {
  const { search } = (await searchParams) ?? {};
  const { data: campgrounds, error } = await fetchCampgrounds({ search });

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex gap-5">
      <CampgroundsFilterBar className="basis-1/4 flex-shrink-0" />
      <CampgroundsList className="flex-1" campgrounds={campgrounds} />
    </div>
  );
}
