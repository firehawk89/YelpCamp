import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { FC, HTMLAttributes } from 'react';
import { PaginationMetadata } from 'types/api';
import { Campground } from 'types/campground';

import Pagination from '../shared/Pagination';
import CampgroundCard from './CampgroundCard';

interface CampgroundsListProps extends HTMLAttributes<HTMLDivElement> {
  campgrounds?: Campground[];
  paginationData?: PaginationMetadata;
}

const CampgroundsList: FC<CampgroundsListProps> = ({ campgrounds, paginationData, className, ...props }) => {
  if (!campgrounds?.length) {
    return (
      <Alert className="w-full text-center" color="info">
        Sorry, we couldn't find any campgrounds.
      </Alert>
    );
  }

  return (
    <section className={cn('flex flex-col gap-7', className)} {...props}>
      {campgrounds?.map((campground) => <CampgroundCard key={campground._id} campground={campground} />)}
      <Pagination page={paginationData?.page} totalPages={paginationData?.totalPages ?? 1} />
    </section>
  );
};

export default CampgroundsList;
