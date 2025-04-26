import Pagination from '@/components/Pagination';
import CampgroundsList from '@/modules/campgrounds/components/CampgroundsList';
import CampgroundsFilterBar from '@/modules/campgrounds/components/FilterBar';
import CampgroundsSortBar from '@/modules/campgrounds/components/SortBar';
import { getSessionUser } from '@/server/session';
import Alert from '@repo/ui/alert';
import { fetchCampgrounds } from 'src/server/campgrounds';
import { CampgroundsFilterDto } from 'src/types/campground';

interface CampgroundsPageProps {
  searchParams?: Promise<CampgroundsFilterDto>;
}

export default async function Campgrounds({ searchParams }: CampgroundsPageProps) {
  const filter = (await searchParams) ?? {};
  const user = await getSessionUser();

  const { result, error } = await fetchCampgrounds(filter);
  const { data: campgrounds, metadata: campgroundsMetadata } = result ?? {};

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  const hasMore = !!campgroundsMetadata?.totalPages && campgroundsMetadata?.totalPages > 1;

  return (
    <div className="flex gap-5">
      <CampgroundsFilterBar className="hidden lg:block xl:basis-1/4" />

      <div className="flex flex-1 flex-col gap-10">
        {/* <CampgroundsMap campgrounds={campgrounds} /> */}

        {!campgrounds?.length && (
          <Alert className="w-full text-center" color="info">
            Sorry, we couldn't find any campgrounds.
          </Alert>
        )}

        {!!campgrounds?.length && (
          <section className="flex flex-col gap-3">
            <CampgroundsSortBar />

            <CampgroundsList user={user} campgrounds={campgrounds} />

            {hasMore && (
              <Pagination
                className="mt-5"
                page={campgroundsMetadata?.page}
                totalPages={campgroundsMetadata?.totalPages}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}
