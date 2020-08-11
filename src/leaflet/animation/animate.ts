import * as L from "leaflet";
import { SpeedSegment } from "../../types";
import { displayLiveSpeed } from "../../methods/displayLiveSpeed";
import { displayLiveElevation } from "../../methods/displayLiveElevation";

export function animate(i: number, map: L.Map, speedSelector: HTMLSelectElement, speedData: Array<SpeedSegment>) {
  window.__GLOBAL_DATA__.currentIndex = i;

  let animationSpeed = parseInt(speedSelector.options[speedSelector.selectedIndex].value);
  const e = speedData[i];
  if (!e) {
    return;
  }

  map.panTo(<L.LatLngExpression>e.loc2.loc, { animate: true, duration: e.computed.time / animationSpeed, noMoveStart: true, easeLinearity: 1 });
  i++;

  if (e.computed.speed < 3) {
    displayLiveSpeed(Math.round(e.computed.speed), e.computed.time, animationSpeed);
  } else {
    displayLiveSpeed(Math.round(e.computed.filteredSpeed), e.computed.time, animationSpeed);
  }

  if (e.loc2.ele) {
    displayLiveElevation(Math.round(e.loc2.ele), e.computed.time, animationSpeed);
  }

  let timeout = (e.computed.time * 1000) / animationSpeed;

  window.__GLOBAL_DATA__.timeout = setTimeout(animate, timeout, i, map, speedSelector, speedData);
}
