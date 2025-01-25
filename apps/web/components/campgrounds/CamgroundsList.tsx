'use client';

import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { FC, HTMLAttributes } from 'react';
import { Campground } from 'types/campground';

import CampgroundCard from './CampgroundCard';

interface CampgroundsListProps extends HTMLAttributes<HTMLDivElement> {
  campgrounds?: Campground[];
}

const CampgroundsList: FC<CampgroundsListProps> = ({ campgrounds, className, ...props }) => {
  if (!campgrounds?.length) {
    return (
      <Alert className="w-full text-center" color="info">
        We couldn't find any campgrounds matching your search criteria.
      </Alert>
    );
  }

  return (
    <section className={cn('flex flex-col gap-7', className)} {...props}>
      {campgrounds?.map((campground) => <CampgroundCard key={campground._id} campground={campground} />)}
    </section>
  );
};

export default CampgroundsList;
