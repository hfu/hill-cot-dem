import maplibregl, { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

// PMTiles protocol handler
import { Protocol } from 'pmtiles'

let p = new Protocol()
maplibregl.addProtocol('pmtiles', p.tile)

const map = new Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      },
      terrarium: {
        type: 'raster-dem',
        url: 'pmtiles://./data/pmtiles/hillcot_terrarium.pmtiles',
        tileSize: 512,
        encoding: 'terrarium'
      }
    },
    layers: [
      {
        id: 'osm-background',
        type: 'raster',
        source: 'osm'
      },
      {
        id: 'hillshade',
        type: 'hillshade',
        source: 'terrarium',
        paint: {
          'hillshade-shadow-color': '#473B24',
          'hillshade-highlight-color': '#F7EE21',
          'hillshade-accent-color': '#369587'
        }
      }
    ],
    sky: {}
  },
  center: [-13.251271, 8.465076],
  zoom: 16.38,
  pitch: 53,
  bearing: -138,
  hash: true,
  maxZoom: 18,
  maxPitch: 85
})

map.once('idle', () => {
  console.log('Map loaded with Terrarium DEM')
  // Enable terrain from the start (wait for all tiles to load)
  map.setTerrain({ source: 'terrarium', exaggeration: 1.0 })
})

map.on('error', (e) => {
  console.error('Map error:', e)
})

map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: true,
    showCompass: true
  })
)

map.addControl(
  new maplibregl.TerrainControl({
    source: 'terrarium',
    exaggeration: 1.0
  })
)
