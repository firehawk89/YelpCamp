'use client';

import config from '@/app/config';
import { CampgroundLocation } from '@/types/campground';
import { cn } from '@/utils/misc';
import { type Feature, type FeatureCollection } from 'geojson';
import { GeoJSONFeature, GeoJSONSource } from 'mapbox-gl';
import { HTMLAttributes, useMemo, useRef, useState } from 'react';
import Map, {
  Source,
  Layer,
  ViewState,
  FullscreenControl,
  NavigationControl,
  MapMouseEvent,
  MapRef,
  ViewStateChangeEvent,
  GeolocateControl,
} from 'react-map-gl/mapbox';

import CampgroundPopup from './CampgroundPopup';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from './layers';

const MAP_SOURCE_ID = 'campgrounds';
const USA_COORDINATES = { latitude: 37.8283, longitude: -98.5795 };

const INITIAL_VIEW_STATE: ViewState = {
  ...(USA_COORDINATES ?? {}),
  zoom: 2.8,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

interface CampgroundsMapProps extends HTMLAttributes<HTMLDivElement> {
  locations?: CampgroundLocation[];
}

const CampgroundsMap = ({ className, locations = [], ...props }: CampgroundsMapProps) => {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);
  const [clickedCampgroundSlug, setClickedCampgroundSlug] = useState<string | null>(null);

  const geojson = useMemo<FeatureCollection>(() => {
    const features: Feature[] = locations.map((location) => {
      const { coordinates, campground } = location;
      const { longitude, latitude } = coordinates;
      const { _id, slug } = campground ?? {};

      return {
        type: 'Feature',
        properties: {
          id: _id,
          campgroundSlug: slug,
        },
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      };
    });

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [locations]);

  const handleMapMove = (event: ViewStateChangeEvent) => {
    const { viewState } = event;
    setViewState(viewState);
    setClickedCampgroundSlug(null);
  };

  const handleMapClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (feature?.layer?.id === unclusteredPointLayer.id) {
      handlePointClick(feature);
    } else {
      setClickedCampgroundSlug(null);
    }

    const clusterId = feature?.properties?.cluster_id;
    const mapboxSource = mapRef.current?.getSource(MAP_SOURCE_ID) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !zoom || !feature?.geometry || !('coordinates' in feature.geometry)) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates as [number, number],
        zoom,
        duration: 500,
      });
    });
  };

  const handlePointClick = (feature?: GeoJSONFeature) => {
    const slug = feature?.properties?.campgroundSlug;
    if (slug !== clickedCampgroundSlug) {
      setClickedCampgroundSlug(slug);
    }
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)} {...props}>
      <Map
        ref={mapRef}
        mapboxAccessToken={config.mapbox.accessToken}
        onMove={handleMapMove}
        onClick={handleMapClick}
        interactiveLayerIds={[clusterLayer.id ?? '', unclusteredPointLayer.id ?? '']}
        style={{ width: '100%', height: 350 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        projection="mercator"
        {...viewState}
      >
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-left" />
        <GeolocateControl position="top-right" />

        <CampgroundPopup campgroundSlug={clickedCampgroundSlug} onClose={() => setClickedCampgroundSlug(null)} />

        <Source id={MAP_SOURCE_ID} type="geojson" data={geojson} cluster clusterMaxZoom={14} clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </div>
  );
};

export default CampgroundsMap;
