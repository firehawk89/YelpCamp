import SearchForm from '@/components/SearchForm';
import { cn } from '@/utils/misc';
import Card, { CardProps } from '@repo/ui/card';

import CampgroundRatingFilter from './CampgroundRatingFilter';

const CampgroundsFilterBar = ({ ref, className, ...props }: CardProps) => {
  return (
    <Card ref={ref} className={cn('', className)} orientation="vertical" {...props}>
      <SearchForm label="Search by name" />

      <CampgroundRatingFilter />
    </Card>
  );
};

export default CampgroundsFilterBar;
