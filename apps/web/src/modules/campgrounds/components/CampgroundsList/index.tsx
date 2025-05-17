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
    {campgrounds?.map((campground) => {
      const campgroundSimilarity = campground.similarity ? Math.round(campground.similarity * 100) : null;
      const formattedSimilarity = campgroundSimilarity === 100 ? 'Exact match' : `${campgroundSimilarity}% match`;

      return (
        <CampgroundCardWrapper key={campground._id} className="flex flex-col gap-1">
          {campgroundSimilarity && <span className="text-sm text-gray-500">{formattedSimilarity}</span>}
          <CampgroundCard campground={campground} user={user} />
        </CampgroundCardWrapper>
      );
    })}
  </CampgroundsListWrapper>
);

export default CampgroundsList;
