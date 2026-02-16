set shell := ["/bin/zsh", "-cu"]

DEM_OUT := "public/data/dem"
TERRARIUM_MB := "public/data/pmtiles/hillcot_terrarium.mbtiles"
TERRARIUM_PM := "public/data/pmtiles/hillcot_terrarium.pmtiles"
MIN_Z := "12"
MAX_Z := "18"
RIO := "/Users/hfu/hill-cot-dem/.venv/bin/rio"

pdal:
    mkdir -p {{DEM_OUT}}
    pdal pipeline pipeline.json

terrarium:
    mkdir -p "$(dirname {{TERRARIUM_MB}})"
    {{RIO}} rgbify -b -32768 -i 0.00390625 --min-z {{MIN_Z}} --max-z {{MAX_Z}} --format webp --workers 1 {{DEM_OUT}}/hillcot_dem_0p5m.tif {{TERRARIUM_MB}}

pmtiles:
    pmtiles convert {{TERRARIUM_MB}} {{TERRARIUM_PM}}

clean:
    rm -rf {{DEM_OUT}} "$(dirname {{TERRARIUM_MB}})"

build:
    npm run build
