import * as L from "leaflet";
import { GpxData } from "../../types";

export function drawPath(gpxData: GpxData, map: L.Map) {
  let latlngs = [];
  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData = segment[j];

      latlngs.push(<L.LatLngExpression>locData.loc);
    }
  }

  const ridePath = L.polyline(latlngs, { color: "#4287f5", }).addTo(map);
  // zoom the map to the path
  map.fitBounds(ridePath.getBounds());
}
