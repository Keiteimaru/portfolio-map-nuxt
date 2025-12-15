import mapboxgl from 'mapbox-gl';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  mapboxgl.accessToken = config.public.mapboxAccessToken;
})