import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

import CampgroundCard from './CampgroundCard';

interface CampgroundsListProps extends HTMLAttributes<HTMLDivElement> {
  campgrounds?: Campground[];
  user?: User | null;
}

const CampgroundsList = ({ campgrounds, user, className, ...props }: CampgroundsListProps) => (
  <div className={cn('flex flex-col gap-7', className)} {...props}>
    {campgrounds?.map((campground) => <CampgroundCard key={campground._id} campground={campground} user={user} />)}
  </div>
);

export default CampgroundsList;
