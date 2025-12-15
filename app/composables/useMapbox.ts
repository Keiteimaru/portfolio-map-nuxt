import mapboxgl from 'mapbox-gl';
import type { Map } from 'mapbox-gl';

let map: Map | null = null;

export const useMapbox = () => {
  /**
   * Map を初期化（既に存在すれば再利用）
   */
  const initMap = (container: HTMLElement): Map => {
    if (map) {
      return map
    }

    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/keiteimaru/cmi5hrq7i00rz01su74zu28qs',
      center: [136.8118770963574, 37.068635228535285],
      zoom: window.innerWidth <= 1024 ? 3.5 : 4.5,
      language: 'ja',
      attributionControl: false,
    })

    return map
  }

  /**
   * Map を明示的に破棄
   */
  const destroyMap = () => {
    if (!map) return

    map.remove()
    map = null
  }

  /**
   * Map インスタンス取得（初期化済み前提）
   */
  const getMap = (): Map | null => {
    return map
  }

  return {
    initMap,
    destroyMap,
    getMap
  }
}