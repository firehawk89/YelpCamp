'use client';

import ErrorAlertList from '@/components/ErrorAlertList';
import useCampground from '@/hooks/useCampground';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Campground } from '@/types/campground';
import { cn, parseErrorMessages } from '@/utils/misc';
import Card from '@repo/ui/card';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';

import CampgroundCard, { CampgroundCardProps } from '../CampgroundCard';
import CampgroundCardSkeleton from '../CampgroundCard/Skeleton';

interface CampgroundPopupProps extends Omit<CampgroundCardProps, 'campground' | 'preview'> {
  campgroundSlug: Campground['slug'] | null;
}

const CampgroundPopup = ({ campgroundSlug, className, ...props }: CampgroundPopupProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { campground, isLoading, error } = useCampground(campgroundSlug);

  const animationVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: isMobile ? 0 : '-50%', y: 5 },
      hidden: { opacity: 0, y: 5 },
      show: { opacity: 1, y: isMobile ? 0 : 10 },
    }),
    [isMobile]
  );

  return (
    <AnimatePresence>
      {campgroundSlug && (
        <motion.div
          variants={animationVariants}
          initial="initial"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.15 }}
          className="font-primary absolute w-full text-sm max-md:bottom-0 md:left-1/2 md:max-w-xl"
        >
          {isLoading && <CampgroundCardSkeleton className="w-full max-md:rounded-none" preview />}

          {!isLoading && error && (
            <Card>
              <ErrorAlertList errors={parseErrorMessages(error)} />
            </Card>
          )}

          {!isLoading && !error && campground && (
            <CampgroundCard
              className={cn('transition-all max-md:rounded-none', className)}
              campground={campground}
              preview
              {...props}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampgroundPopup;
