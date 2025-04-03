import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import { MapPinIcon } from '@repo/ui/icons';
import { HTMLAttributes } from 'react';

interface CampgroundLocationProps extends HTMLAttributes<HTMLDivElement> {
  location: Campground['location'];
}

const CampgroundLocation = ({ location, className, ...props }: CampgroundLocationProps) => (
  <div className={cn('flex items-center gap-1 text-neutral-500', className)} {...props}>
    <MapPinIcon />
    <span>{location}</span>
  </div>
);

export default CampgroundLocation;
