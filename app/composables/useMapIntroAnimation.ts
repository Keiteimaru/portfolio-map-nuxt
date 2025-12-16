import type { Map } from 'mapbox-gl';
import type { FeatureCollection } from 'geojson';

type IntroGeojson = {
  japan: GeoJSON.FeatureCollection;
  kawanishi: GeoJSON.FeatureCollection;
}

// composable 内キャッシュ（SPA遷移対策）
let cachedGeojson: IntroGeojson | null = null;

export const useMapIntroAnimation = () => {

  /**
   * イントロ用 GeoJSON を取得（client-only）
   */
  const loadIntroGeojson = async (): Promise<IntroGeojson> => {
    if (cachedGeojson) {
      return cachedGeojson;
    }

    const [japan, kawanishi] = await Promise.all([
      $fetch<FeatureCollection>('/assets/data/japan.geojson'),
      $fetch<FeatureCollection>('/assets/data/kawanishi.geojson')
    ])

    cachedGeojson = { japan, kawanishi };
    return cachedGeojson;
  }

  /**
   * イントロ用レイヤー・ソース構築
   */
  const setupIntroLayers = (
    map: Map,
    geojson: IntroGeojson
  ) => {
    // basemap を一時的に抑制
    map.setConfigProperty('basemap', 'showPlaceLabels', false)
    map.setConfigProperty('basemap', 'showRoadLabels', false)
    map.setConfigProperty('basemap', 'showPointOfInterestLabels', false)
    map.setConfigProperty('basemap', 'showTransitLabels', false)

    // 背景
    if (!map.getLayer('world-intro')) {
      map.addLayer({
        id: 'world-intro',
        type: 'background',
        paint: {
          'background-color': '#f0ecf4'
        }
      })
    }

    // Japan
    if (!map.getSource('japan-intro')) {
      map.addSource('japan-intro', {
        type: 'geojson',
        data: geojson.japan
      });

      map.addLayer({
        id: 'japan-intro-fill',
        type: 'fill',
        source: 'japan-intro',
        paint: {
          'fill-color': '#fcf8ff',
          'fill-opacity': 1
        }
      });

      map.addLayer({
        id: 'japan-intro-outline',
        type: 'line',
        source: 'japan-intro',
        paint: {
          'line-color': '#5b5891',
          'line-width': 1
        }
      });
    }

    // Kawanishi
    if (!map.getSource('kawanishi-intro')) {
      map.addSource('kawanishi-intro', {
        type: 'geojson',
        data: geojson.kawanishi
      });

      map.addLayer({
        id: 'kawanishi-intro-fill',
        type: 'fill',
        source: 'kawanishi-intro',
        paint: {
          'fill-color': '#5b5891',
          'fill-opacity': 0.8
        }
      });

      map.addLayer({
        id: 'kawanishi-intro-outline',
        type: 'line',
        source: 'kawanishi-intro',
        paint: {
          'line-color': '#5b5891',
          'line-width': 1,
          'line-dasharray': [2, 2]
        }
      });
    }
  }

  /**
   * カメラ演出
   */
  const playCameraAnimation = (map: Map) => {
    map.easeTo({
      center: [135.41086378066638, 34.87225650562146],
      zoom: window.innerWidth <= 1024 ? 10.5 : 11.5,
      duration: 3000,
      curve: 3
    });
  }

  /**
   * フェードアウト演出
   */
  const fadeOutIntroLayers = (map: Map) => {
    const layerIds = [
      'world-intro',
      'japan-intro-fill',
      'japan-intro-outline',
      'kawanishi-intro-fill',
      'kawanishi-intro-outline'
    ];

    const duration = 800;
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const opacity = 1 - currentStep / steps;

      layerIds.forEach(id => {
        const layer = map.getLayer(id);
        if (!layer) return;

        if (layer.type === 'background') {
          map.setPaintProperty(id, 'background-opacity', opacity)
        } else if (layer.type === 'fill') {
          map.setPaintProperty(id, 'fill-opacity', opacity)
        } else if (layer.type === 'line') {
          map.setPaintProperty(id, 'line-opacity', opacity)
        }
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        layerIds.forEach(id => {
          if (map.getLayer(id)) {
            map.setLayoutProperty(id, 'visibility', 'none')
          }
        });
      }
    }, interval);
  }

  /**
   * 通常表示へ復帰
   */
  const restoreBasemap = (map: Map) => {
    map.setConfigProperty('basemap', 'showPlaceLabels', true);
    map.setConfigProperty('basemap', 'showRoadLabels', true);
    map.setConfigProperty('basemap', 'showTransitLabels', true);
  }

  /**
   * イントロ演出再生（外部 API）
   */
  const play = async (map: Map) => {
    const geojson = await loadIntroGeojson();

    setupIntroLayers(map, geojson);
    playCameraAnimation(map);

    // カメラ演出後にフェード開始
    setTimeout(() => {
      fadeOutIntroLayers(map);

      // フェード終盤で通常表示へ
      setTimeout(() => {
        restoreBasemap(map);
      }, 600);
    }, 4000);
  }

  return {
    play
  }
}