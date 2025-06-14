import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import { HTMLMotionProps } from 'motion/react';
import { getTranslations } from 'next-intl/server';

import CampgroundCard from '../CampgroundCard';
import CampgroundCardWrapper from '../CampgroundCard/Wrapper';
import CampgroundsListWrapper from './Wrapper';

interface CampgroundsListProps extends HTMLMotionProps<'div'> {
  campgrounds?: Campground[];
  user?: User | null;
}

const CampgroundsList = async ({ campgrounds, user, className, ...props }: CampgroundsListProps) => {
  const t = await getTranslations('pages.campgrounds.list');

  const formatCampgroundSimilarity = (similarity: number | null) => {
    const formattedSimilarity = similarity ? Math.round(similarity * 100) : 0;
    return formattedSimilarity === 100 ? t('exactMatch') : t('match', { similarity: formattedSimilarity });
  };

  return (
    <CampgroundsListWrapper className={cn('flex flex-col gap-7', className)} {...props}>
      {campgrounds?.map((campground) => (
        <CampgroundCardWrapper key={campground._id} className="flex flex-col gap-1">
          {campground.similarity && (
            <span className="text-sm text-gray-500">{formatCampgroundSimilarity(campground.similarity)}</span>
          )}
          <CampgroundCard campground={campground} user={user} />
        </CampgroundCardWrapper>
      ))}
    </CampgroundsListWrapper>
  );
};

export default CampgroundsList;
