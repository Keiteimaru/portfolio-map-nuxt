import type { Map, Marker, GeoJSONSource } from 'mapbox-gl';

export const useMapLayers = () => {

  const setupBaseLayers = (map: Map) => {
    map.setConfigProperty('basemap', 'showPlaceLabels', false);
    map.setConfigProperty('basemap', 'showRoadLabels', false);
    map.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
    map.setConfigProperty('basemap', 'showTransitLabels', false);
  };

  const addJapanLayers = (map: Map) => {
    if (!map.getSource('japan')) {
      map.addSource('japan', { type: 'geojson', data: geojson });
    }
    ...
  };

  return {
    setupBaseLayers,
    addJapanLayers,
  };
};