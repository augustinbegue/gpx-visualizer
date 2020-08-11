import * as L from "leaflet";
import gpxMarkerIcon from "../assets/map-marker-alt-solid.svg";

export const gpxMarker = L.icon({
  iconUrl: gpxMarkerIcon,

  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export const locationMarker = L.divIcon({
  className: 'location-marker-container',

  html: '<span id="locationMarker"></span>',

  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -20],
})