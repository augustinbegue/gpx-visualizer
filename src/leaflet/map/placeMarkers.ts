import { GpxData, Segment, SegmentStats } from "../../types";
import { gpxMarker } from "../assets/markers";

export async function placeMarkers(map: L.Map, gpxData: GpxData, speedData: Array<Segment>, speedDataHighlights: SegmentStats) {
  const { default: L } = await import(/* webpackChunkName: "leaflet" */ 'leaflet');
  
  const markers = [];
  const startPoint = gpxData.segments[0][0].loc;
  const endPoint = gpxData.segments[gpxData.segments.length - 1][gpxData.segments[gpxData.segments.length - 1].length - 1].loc;

  const startMarker = L.marker(<L.LatLngExpression>startPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Start</b>");
  markers.push(startMarker);

  const endMarker = L.marker(<L.LatLngExpression>endPoint, { icon: gpxMarker }).addTo(map).bindPopup("<b>Finish</b>");
  markers.push(endMarker);

  if (speedDataHighlights.maxSpeedIndex && speedDataHighlights.maxSpeed) {
    const point = speedData[speedDataHighlights.maxSpeedIndex].loc1.loc;

    const marker = L.marker(<L.LatLngExpression>point, { icon: gpxMarker })
      .addTo(map)
      .bindPopup("<b>Max Speed</b><br>" + Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h");
    markers.push(marker);
  }

  if (speedDataHighlights.maxCad && speedDataHighlights.maxCadIndex) {
    const point = speedData[speedDataHighlights.maxCadIndex].loc1.loc;

    const marker = L.marker(<L.LatLngExpression>point, { icon: gpxMarker })
      .addTo(map)
      .bindPopup("<b>Max Cadence</b><br>" + Math.round(speedDataHighlights.maxCad) + " rpm");
    markers.push(marker);
  }
  
  if (speedDataHighlights.maxHr && speedDataHighlights.maxHrIndex) {
    const point = speedData[speedDataHighlights.maxHrIndex].loc1.loc;

    const marker = L.marker(<L.LatLngExpression>point, { icon: gpxMarker })
      .addTo(map)
      .bindPopup("<b>Max Heart Rate</b><br>" + Math.round(speedDataHighlights.maxHr) + " bpm");
    markers.push(marker);
  }

  return L.layerGroup(markers);
}
