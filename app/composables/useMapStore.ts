import type { FeatureCollection } from 'geojson';

interface Location {
  id: number;
  name: string;
  label: string;
  category: number[];
  description: string;
  longitude: number;
  latitude: number;
  image?: string;
  nearest_station?: string;
  distance_from_station?: string;
  opening_hours?: string;
  address?: string;
  phone_number?: string;
  website?: string;
}

interface Category {
  id: number;
  name: string;
}

export const useMapStore = () => {

  // 生データ（useState）
  const locations = useState<Location[]>('locations', () => []);
  const currentLocationId = useState<number | null>('currentLocationId', () => null );
  const categories = useState<Category[]>('categories', () => []);
  const currentCategoryId = useState<number>('currentCategoryId', () => 0);

  const japanGeojson = useState<FeatureCollection | null>('japanGeojson', () => null );
  const kawanishiGeojson = useState<FeatureCollection | null>( 'kawanishiGeojson', () => null );

  // 派生データ
  const filteredLocations = computed(() => {
    if (currentCategoryId.value === 0) return locations.value;
    return locations.value.filter(location => location.category.includes(currentCategoryId.value));
  });

  const selectedLocation = computed(() => {
    return locations.value.find(location => location.id === currentLocationId.value) ?? null;
  });


  // const markers = computed(() =>
  //   filteredSpots.value.map(s => ({
  //     id: s.id,
  //     lat: s.lat,
  //     lng: s.lng
  //   }))
  // )

  // 初期ロード
  const fetchInitialData = async () => {
    if (locations.value.length) return;

    const [locationsRaw, categoriesRaw, japanGeojsonRaw, kawanishiGeojsonRaw] = await Promise.all([
      $fetch<Location[]>('/assets/data/locations.json'),
      $fetch<Category[]>('/assets/data/categories.json'),
      $fetch<FeatureCollection>('/assets/data/japan.geojson'),
      $fetch<FeatureCollection>('/assets/data/kawanishi.geojson')
    ]);

    locations.value = locationsRaw;
    categories.value = categoriesRaw;
    japanGeojson.value = japanGeojsonRaw;
    kawanishiGeojson.value = kawanishiGeojsonRaw;
  };

   const selectSpot = (spotId: number | null) => {
    currentLocationId.value = spotId
  }

  return {
    // state
    locations,
    currentLocationId,
    categories,
    currentCategoryId,
    japanGeojson,
    kawanishiGeojson,

    // computed
    filteredLocations,
    selectedLocation,

    // actions
    fetchInitialData,
    selectSpot
  }
}