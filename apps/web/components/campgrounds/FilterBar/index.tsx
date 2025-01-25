import SearchForm from '@/components/shared/SearchForm';
import { cn } from '@/utils/misc';
import Card, { CardProps } from '@repo/ui/card';
import { FC } from 'react';

const CampgroundsFilterBar: FC<CardProps> = ({ className, ...props }) => {
  return (
    <Card component="aside" className={cn(className)} {...props}>
      <SearchForm label="Search by name" />
    </Card>
  );
};

export default CampgroundsFilterBar;
