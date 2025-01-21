import CampgroundCard from '@/components/campgrounds/CampgroundCard';
import { fetchCampgrounds } from '@/utils/api/campgrounds';

export default async function Campgrounds() {
  const { data: campgrounds, error } = await fetchCampgrounds();

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex flex-col gap-7">
      {campgrounds?.map((campground) => <CampgroundCard key={campground._id} campground={campground} />)}
    </div>
  );
}
