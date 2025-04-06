'use client';

import config from '@/app/config';
import GeocoderInput from '@/components/GeocoderInput';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import Map from 'react-map-gl/mapbox';

interface CampgroundsMapProps extends HTMLAttributes<HTMLDivElement> {
  campgrounds?: Campground[];
  className?: string;
}

const CampgroundsMap = ({ className, ...props }: CampgroundsMapProps) => {
  return (
    <div className={cn('overflow-hidden rounded-lg', className)} {...props}>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: '100%', height: 300 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={config.mapbox.accessToken}
      />

      <GeocoderInput />
    </div>
  );
};

export default CampgroundsMap;
