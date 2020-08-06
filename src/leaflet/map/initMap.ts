import * as L from "leaflet";

export function initMap() {
  const mapBox = document.getElementById("mapBox");
  if (!mapBox)
    throw new Error("mapBox container not found");
  mapBox.style.display = "block";

  const mapContainer = document.getElementById("mapContainer");
  if (!mapContainer)
    throw new Error("mapBox container not found");
  mapContainer.innerHTML = '<div id="rideMap"></div>';

  const map = L.map("rideMap");

  return map;
}
