import { cn } from '@/utils/misc';
import Card, { CardProps } from '@repo/ui/card';

import CampgroundRatingFilter from './RatingFilter';

const CampgroundsFilterBar = ({ ref, className, ...props }: CardProps) => {
  return (
    <Card ref={ref} className={cn('h-fit shrink-0', className)} component="aside" orientation="vertical" {...props}>
      <CampgroundRatingFilter />
    </Card>
  );
};

export default CampgroundsFilterBar;
