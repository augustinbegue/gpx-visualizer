import * as L from "leaflet";
import { ElevationControl } from "./ElevationControl";
import { SpeedControl } from "./SpeedControl";
import { mapboxUrl, mapboxAttribution } from "../../main";

export function addControls(map: L.Map, markers: L.LayerGroup) {
  new SpeedControl({ position: "bottomleft" }).addTo(map);

  new ElevationControl({ position: "bottomright" }).addTo(map);

  addLayersControl(map, markers);
}
function addLayersControl(map: L.Map, markers: L.LayerGroup) {
  const light = L.tileLayer(mapboxUrl, {
    id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution
  }),
    terrain = L.tileLayer(mapboxUrl, {
      id: 'mapbox/outdoors-v11', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution
    }),
    satellite = L.tileLayer(mapboxUrl, {
      id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution
    }),
    dark = L.tileLayer(mapboxUrl, {
      id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution
    }),
    cycle = L.tileLayer(`https://tile.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey=24bcbf99039f46659923556c33f0241e`, { maxZoom: 18, attribution: "&copy; <a href='https://www.thunderforest.com/'>Thunderforest</a>, &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" });

  terrain.addTo(map);
  markers.addTo(map);

  var baseMaps = {
    "Light": light,
    "Dark": dark,
    "Terrain": terrain,
    "Satellite": satellite,
    "Cycle": cycle
  };

  var overlayMaps = {
    "Highlights": markers
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
}
