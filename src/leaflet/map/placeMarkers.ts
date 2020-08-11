import { GpxData, SpeedSegment, SpeedDataHighlights } from "../../types";
import { gpxMarker } from "../assets/markers";

export async function placeMarkers(map: L.Map, gpxData: GpxData, speedData: Array<SpeedSegment>, speedDataHighlights: SpeedDataHighlights) {
  const { default: L } = await import(/* webpackChunkName: "leaflet" */ 'leaflet');
  
  const startPoint = gpxData.segments[0][0].loc;
  const endPoint = gpxData.segments[gpxData.segments.length - 1][gpxData.segments[gpxData.segments.length - 1].length - 1].loc;
  const maxSpeedPoint = speedData[speedDataHighlights.maxSpeedIndex].loc1.loc;

  const startMarker = L.marker(<L.LatLngExpression>startPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Start</b>");

  const endMarker = L.marker(<L.LatLngExpression>endPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Finish</b>");

  const maxSpeedMarker = L.marker(<L.LatLngExpression>maxSpeedPoint, { icon: gpxMarker })
    .addTo(map)
    .bindPopup("<b>Max Speed</b><br>" + Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h");

  return L.layerGroup([startMarker, endMarker, maxSpeedMarker]);
}
