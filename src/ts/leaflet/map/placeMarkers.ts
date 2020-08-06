import * as L from "leaflet";
import { GpxData, SpeedData, SpeedDataHighlights } from "../../types";

export function placeMarkers(map: L.Map, gpxData: GpxData, speedData: Array<SpeedData>, speedDataHighlights: SpeedDataHighlights) {
  const startPoint = gpxData.segments[0][0].loc;
  const endPoint = gpxData.segments[gpxData.segments.length - 1][gpxData.segments[gpxData.segments.length - 1].length - 1].loc;
  const maxSpeedPoint = speedData[speedDataHighlights.maxSpeedIndex].loc1.loc;

  const gpxMarker = L.icon({
    iconUrl: "assets/map-marker-alt-solid.svg",

    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const startMarker = L.marker(<L.LatLngExpression>startPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Start</b>");

  const endMarker = L.marker(<L.LatLngExpression>endPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Finish</b>");

  const maxSpeedMarker = L.marker(<L.LatLngExpression>maxSpeedPoint, { icon: gpxMarker })
    .addTo(map)
    .bindPopup("<b>Max Speed</b><br>" + Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h");

  return L.layerGroup([startMarker, endMarker, maxSpeedMarker]);
}
