import Pagination from '@/components/Pagination';
import CampgroundSearchForm from '@/modules/campgrounds/components/CampgroundSearchForm';
import CampgroundsList from '@/modules/campgrounds/components/CampgroundsList';
import CampgroundsMap from '@/modules/campgrounds/components/CampgroundsMap/CampgroundsMap';
import CampgroundsFilterBar from '@/modules/campgrounds/components/FilterBar';
import CampgroundsSortBar from '@/modules/campgrounds/components/SortBar';
import { getSessionUser } from '@/server/session';
import Alert from '@repo/ui/alert';
import { getTranslations } from 'next-intl/server';
import { fetchCampgroundLocations, fetchCampgrounds } from 'src/server/campgrounds';
import { CampgroundsFilterDto } from 'src/types/campground';

interface CampgroundsPageProps {
  searchParams?: Promise<CampgroundsFilterDto>;
}

export default async function Campgrounds({ searchParams }: CampgroundsPageProps) {
  const t = await getTranslations();

  const filter = (await searchParams) ?? {};
  const user = await getSessionUser();

  const { result: campgroundsData, error: campgroundsError } = await fetchCampgrounds(filter);
  const { data: campgrounds, metadata: campgroundsMetadata } = campgroundsData ?? {};
  const { result: campgroundLocations, error: campgroundLocationsError } = await fetchCampgroundLocations(filter);

  const error = campgroundsError || campgroundLocationsError;

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  const hasMoreCampgrounds = !!campgroundsMetadata?.totalPages && campgroundsMetadata?.totalPages > 1;

  return (
    <div className="flex flex-col gap-5">
      <CampgroundsMap locations={campgroundLocations} />

      <div className="flex gap-5">
        <CampgroundsFilterBar className="max-lg:hidden xl:basis-1/4" />

        <div className="flex flex-1 flex-col gap-6">
          <CampgroundSearchForm user={user} searchImage={filter.searchImage} />

          {!campgrounds?.length && (
            <Alert className="w-full text-center" color="info">
              {t('pages.campgrounds.noCampgrounds')}
            </Alert>
          )}

          {!!campgrounds?.length && (
            <section className="flex flex-col gap-3">
              <CampgroundsSortBar />

              <CampgroundsList user={user} campgrounds={campgrounds} />

              {hasMoreCampgrounds && (
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
    </div>
  );
}
