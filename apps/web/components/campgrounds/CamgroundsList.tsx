import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { FC, HTMLAttributes } from 'react';
import { PaginationMetadata } from 'types/api';
import { Campground } from 'types/campground';

import Pagination from '../shared/Pagination';
import CampgroundCard from './CampgroundCard';
import CampgroundsSortBar from './SortBar';

interface CampgroundsListProps extends HTMLAttributes<HTMLDivElement> {
  campgrounds?: Campground[];
  paginationData?: PaginationMetadata;
}

const CampgroundsList: FC<CampgroundsListProps> = ({ campgrounds, paginationData, className, ...props }) => {
  const shouldDisplayPagination = !!paginationData?.totalPages && paginationData?.totalPages > 1;

  if (!campgrounds?.length) {
    return (
      <Alert className="w-full text-center" color="info">
        Sorry, we couldn't find any campgrounds.
      </Alert>
    );
  }

  return (
    <section className={cn('flex flex-col gap-3', className)} {...props}>
      <CampgroundsSortBar />

      <div className="flex flex-col gap-7">
        {campgrounds?.map((campground) => <CampgroundCard key={campground._id} campground={campground} />)}
      </div>

      {shouldDisplayPagination && (
        <Pagination className="mt-5" page={paginationData?.page} totalPages={paginationData?.totalPages} />
      )}
    </section>
  );
};

export default CampgroundsList;
