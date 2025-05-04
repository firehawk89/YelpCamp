import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import { HTMLMotionProps } from 'motion/react';

import CampgroundCard from '../CampgroundCard';
import CampgroundCardWrapper from '../CampgroundCard/Wrapper';
import CampgroundsListWrapper from './Wrapper';

interface CampgroundsListProps extends HTMLMotionProps<'div'> {
  campgrounds?: Campground[];
  user?: User | null;
}

const CampgroundsList = ({ campgrounds, user, className, ...props }: CampgroundsListProps) => (
  <CampgroundsListWrapper className={cn('flex flex-col gap-7', className)} {...props}>
    {campgrounds?.map((campground) => (
      <CampgroundCardWrapper key={campground._id}>
        <CampgroundCard campground={campground} user={user} />
      </CampgroundCardWrapper>
    ))}
  </CampgroundsListWrapper>
);

export default CampgroundsList;
