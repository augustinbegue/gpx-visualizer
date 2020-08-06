import * as L from "leaflet";
import { ElevationControl } from "./elevation-control";
import { SpeedControl } from "./speed-control";
import { mapboxUrl, mapboxAttribution } from "../../index";

export function addControls(map: L.Map, markers: L.LayerGroup) {
  new SpeedControl({ position: "bottomleft" }).addTo(map);

  new ElevationControl({ position: "bottomright" }).addTo(map);

  addLayersControl(map, markers);
}
function addLayersControl(map: L.Map, markers: L.LayerGroup) {
  const grayscale = L.tileLayer(mapboxUrl, { id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution }),
    terrain = L.tileLayer(mapboxUrl, { id: 'mapbox/outdoors-v11', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution }),
    satellite = L.tileLayer(mapboxUrl, { id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1, maxZoom: 20, accessToken: "pk.eyJ1IjoidGFndWVvIiwiYSI6ImNrZGJsaXJsMjAxbTEyenFxdmVkYzlnd2wifQ.SiWFEZcc5ekqRDlfp7HzSg", attribution: mapboxAttribution });

  terrain.addTo(map);
  markers.addTo(map);

  var baseMaps = {
    "Grayscale": grayscale,
    "Terrain": terrain,
    "Satellite": satellite
  };

  var overlayMaps = {
    "Highlights": markers
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
}
