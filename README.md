# hill-cot-dem
DEM from point cloud in Hill Cot, Sierra Leone
## Setup & Build Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate DEM & Terrarium Tiles
Execute the following `just` commands in order:

```bash
# Step 1: Clear old build artifacts
rm -rf docs/data/

# Step 2: Generate DEM from COPC point cloud (PDAL pipeline)
just pdal

# Step 3: Create Terrarium-encoded MBTiles
just terrarium

# Step 4: Convert MBTiles to PMTiles
just pmtiles
```

### 3. Build for Production (GitHub Pages)
```bash
npm run build
```
This generates `docs/` folder with inline CSS/JS ready for GitHub Pages deployment.

### 4. Development Server
```bash
npm run dev
```
Opens http://localhost:5173 with live reload.

### 5. Preview Production Build
```bash
npm run preview
```

## Data Structure
- Source: `https://tunnel.optgeo.org/hillcot.copc.laz` (COPC point cloud, 406 MB, 54M points)
- Generated outputs:
  - `public/data/dem/hillcot_dem_0p5m.tif` (0.5m GeoTIFF, ~9 MB)
  - `public/data/pmtiles/hillcot_terrarium.mbtiles` (Terrarium WebP tiles, ~6.8 MB)
  - `public/data/pmtiles/hillcot_terrarium.pmtiles` (PMTiles archive, ~6.7 MB)
- Built output: `docs/` (GitHub Pages)

## Features
- **3D Terrarium DEM Viewer** with MapLibre GL JS v5.18.0
- **Dual elevation rendering**: Hillshade (visual shading) + Terrain (3D elevation)
- **Interactive 3D controls**: Zoom, pan, pitch (drag middle mouse), bearing (drag right mouse)
- **Terrarium encoding** with 1m resolution (true scale, 1.0x exaggeration)
- **Navigation controls** with pitch visualization
- **Terrain toggle** with TerrainControl widget
- **URL hash navigation** for shareable map states
- **OSM background** with attribution

## Deployment
This project is built for **GitHub Pages** hosting in the `docs/` folder.

1. Run `npm run build` to generate production assets
2. Commit the `docs/` folder to git
3. Enable GitHub Pages in repository settings → Pages → Source: Deploy from branch → main / docs/
4. Access the viewer at `https://<username>.github.io/<repo>/`

## Development
- **Live reload**: `npm run dev` → http://localhost:5173
- **Build**: `npm run build` → `docs/`
- **Preview build**: `npm run preview`

## Dependencies
- `maplibre-gl@5.18.0` - Vector map rendering
- `pmtiles@4.4.0` - Cloud-optimized tile archive protocol
- `vite@6.0.0` - Build tooling (produces single-file HTML for GitHub Pages)