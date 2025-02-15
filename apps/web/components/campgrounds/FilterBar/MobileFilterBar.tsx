'use client';

import Overlay from '@/components/shared/Overlay';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { CardProps } from '@repo/ui/card';
import { FilterIcon } from '@repo/ui/icons';
import { useState } from 'react';

import CampgroundsFilterBar from '.';

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

      <Overlay className={overlayClassName} isHidden={!isFilterMenuOpened} onClick={() => setIsFilterMenuOpened(false)}>
        <CampgroundsFilterBar className={className} {...props} />
      </Overlay>
    </>
  );
};

export default CampgroundsMobileFilterBar;
