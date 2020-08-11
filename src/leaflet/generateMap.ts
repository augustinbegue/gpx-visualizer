import * as L from "leaflet";
import { GpxData, SpeedSegment, SpeedDataHighlights } from "../types";
import { initVisualisation } from "./animation/initVisualisation";
import { addControls } from "./custom-controls/addControls";
import { placeMarkers } from "./map/placeMarkers";
import { drawPath } from "./map/drawPath";
import { initMap } from "./map/initMap";

export async function generateMap(gpxData: GpxData, speedData: Array<SpeedSegment>, speedDataHighlights: SpeedDataHighlights) {
  const map = await initMap(); // Set map to use openstreetmap data

  // Define and place highlights markers
  const markers = await placeMarkers(map, gpxData, speedData, speedDataHighlights);

  // Trace ride path from LatLng points
  drawPath(gpxData, map);

  addControls(<L.Map>map, <L.LayerGroup>markers);

  initVisualisation(<L.Map>map, speedData);

  return map;
}
