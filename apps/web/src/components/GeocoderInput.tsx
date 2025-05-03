'use client';

import type { GeocodeFeature } from '@mapbox/search-js-core';

import config from '@/app/config';
import { Geocoder } from '@mapbox/search-js-react';
import { GeocoderProps } from '@mapbox/search-js-react/dist/components/Geocoder';

export interface GeocodingData {
  full_address: GeocodeFeature['properties']['full_address'];
  coordinates: GeocodeFeature['properties']['coordinates'];
}

interface GeocoderInputProps extends Omit<GeocoderProps, 'accessToken' | 'value' | 'onChange' | 'onRetrieve'> {
  value: string;
  onChange: (value: string) => void;
  onRetrieve: (res: GeocodingData) => void;
  onClear?: () => void;
  containerClassName?: string;
}

const GeocoderInput = ({ value, onChange, onRetrieve, onClear, containerClassName, ...props }: GeocoderInputProps) => {
  const handleSelect = (feature: GeocodeFeature) => {
    const { full_address, coordinates } = feature.properties;

    const geocodingData: GeocodingData = {
      full_address: full_address,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    };

    onRetrieve(geocodingData);
  };

  return (
    <div className={containerClassName}>
      {/* @ts-expect-error: The Mapbox Geocoder component is not recognized as a valid JSX component due to missing type definitions in the library. */}
      <Geocoder
        value={value}
        onChange={onChange}
        onRetrieve={handleSelect}
        onClear={onClear}
        accessToken={config.mapbox.accessToken}
        {...props}
      />
    </div>
  );
};

export default GeocoderInput;
