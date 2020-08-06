import * as L from "leaflet";
import { GpxData, SpeedData, SpeedDataHighlights } from "../types";
import { initVisualisation } from "./animation/initVisualisation";
import { addControls } from "./custom-controls/addControls";
import { placeMarkers } from "./map/placeMarkers";
import { drawPath } from "./map/drawPath";
import { initMap } from "./map/initMap";

export function generateMap(gpxData: GpxData, speedData: Array<SpeedData>, speedDataHighlights: SpeedDataHighlights) {
  const map = initMap(); // Set map to use openstreetmap data


  // Define and place highlights markers
  const markers = placeMarkers(map, gpxData, speedData, speedDataHighlights);

  // Trace ride path from LatLng points
  drawPath(gpxData, map);

  addControls(<L.Map>map, <L.LayerGroup>markers);

  initVisualisation(<L.Map>map, speedData);
}
