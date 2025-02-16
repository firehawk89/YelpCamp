import SearchForm from '@/components/shared/SearchForm';
import { cn } from '@/utils/misc';
import Card, { CardProps } from '@repo/ui/card';

const CampgroundsFilterBar = ({ className, ...props }: CardProps) => {
  return (
    <Card className={cn('flex-col', className)} {...props}>
      <SearchForm label="Search by name" />
    </Card>
  );
};

export default CampgroundsFilterBar;
