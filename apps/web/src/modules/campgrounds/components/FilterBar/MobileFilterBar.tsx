'use client';

import Modal from '@/components/Modal';
import SearchForm from '@/components/SearchForm';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { CardProps } from '@repo/ui/card';
import { FilterIcon } from '@repo/ui/icons';
import { useState } from 'react';

import CampgroundRatingFilter from './RatingFilter';

interface CampgroundsMobileFilterBarProps extends CardProps {
  buttonClassName?: string;
  overlayClassName?: string;
}

const CampgroundsMobileFilterBar = ({
  buttonClassName,
  overlayClassName,
  className,
  ...props
}: CampgroundsMobileFilterBarProps) => {
  const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false);

  return (
    <>
      <Button
        className={cn('lg:hidden', buttonClassName)}
        onClick={() => setIsFilterMenuOpened(true)}
        size="icon"
        icon={<FilterIcon className="size-7" />}
      />

      <Modal
        overlayClassName={overlayClassName}
        className={className}
        isHidden={!isFilterMenuOpened}
        onClose={() => setIsFilterMenuOpened(false)}
        title="Filter"
        {...props}
      >
        <SearchForm label="Search by name" />
        <CampgroundRatingFilter />
      </Modal>
    </>
  );
};

export default CampgroundsMobileFilterBar;
