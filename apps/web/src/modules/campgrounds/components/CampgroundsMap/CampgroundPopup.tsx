import ErrorAlertList from '@/components/ErrorAlertList';
import useCampground from '@/hooks/useCampground';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Campground } from '@/types/campground';
import { cn, parseErrorMessages } from '@/utils/misc';
import Card from '@repo/ui/card';
import { AnimatePresence, motion } from 'motion/react';

import CampgroundCard, { CampgroundCardProps } from '../CampgroundCard';

interface CampgroundPopupProps extends Omit<CampgroundCardProps, 'campground' | 'preview'> {
  campgroundSlug: Campground['slug'] | null;
}

const CampgroundPopup = ({ campgroundSlug, className, ...props }: CampgroundPopupProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { campground, isLoading, error } = useCampground(campgroundSlug);

  return (
    <AnimatePresence>
      {campgroundSlug && (
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : '-50%', y: 5 }}
          animate={{ opacity: 1, y: isMobile ? 0 : 10 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="font-primary absolute w-full max-w-xl text-sm max-md:bottom-0 md:left-1/2"
        >
          {(isLoading || error) && (
            <Card>
              {isLoading && <p className="w-full text-center">Loading...</p>}
              {!isLoading && error && <ErrorAlertList errors={parseErrorMessages(error)} />}
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
