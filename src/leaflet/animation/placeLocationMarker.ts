import * as L from "leaflet";
import { locationMarker } from "../assets/markers";

export function placeLocationMarkerFromIndex(index: number) {
  const speedData = window.__GLOBAL_DATA__.segmentData

  const segment = speedData[index]

  let marker = window.__GLOBAL_DATA__.locationMarker

  if (marker) {
    window.__GLOBAL_DATA__.locationMarker.remove()
  }

  window.__GLOBAL_DATA__.locationMarker = L.marker(<L.LatLngExpression>segment.loc2.loc, { icon: locationMarker }).addTo(window.__GLOBAL_DATA__.map)
  
  let locationMarkerEl = document.getElementById('locationMarker');
  locationMarkerEl ? locationMarkerEl.style.display = 'block' : '';
}