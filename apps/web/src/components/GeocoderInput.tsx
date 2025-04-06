'use client';

import config from '@/app/config';
import { Geocoder } from '@mapbox/search-js-react';
import { GeocoderProps } from '@mapbox/search-js-react/dist/components/Geocoder';
import { useState } from 'react';

interface GeocoderInputProps extends Omit<GeocoderProps, 'accessToken'> {
  className?: string;
}

const GeocoderInput = ({ className, ...props }: GeocoderInputProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log('inputValue', { inputValue });

  return (
    <div className={className}>
      {/* <SearchBox
        accessToken={config.mapbox.accessToken}
        value={inputValue}
        onRetrieve={(res) => console.log('onRetrieve', res)}
        onChange={setInputValue}
      >
        <input placeholder="address" />
      </SearchBox> */}

      {/* @ts-expect-error: The Mapbox Geocoder component is not recognized as a valid JSX component due to missing type definitions in the library. */}
      <Geocoder
        onChange={setInputValue}
        onRetrieve={(res) => console.log('onRetrieve', res)}
        onClear={() => setInputValue('')}
        accessToken={config.mapbox.accessToken}
        {...props}
      />
    </div>
  );
};

export default GeocoderInput;
