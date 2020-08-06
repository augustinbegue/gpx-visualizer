import * as L from "leaflet";
import { SpeedData } from "../../types";
import { displayLiveSpeed } from "../../methods/displayLiveSpeed";
import { displayLiveElevation } from "../../methods/displayLiveElevation";

export function animate(i: number, map: L.Map, speedSelector: HTMLSelectElement, speedData: Array<SpeedData>) {
  localStorage.setItem("currentIndex", i.toString());

  let animationSpeed = parseInt(speedSelector.options[speedSelector.selectedIndex].value);
  const e = speedData[i];
  if (!e) {
    return;
  }

  map.panTo(<L.LatLngExpression>e.loc2.loc, { animate: true, duration: e.computed.time / animationSpeed, noMoveStart: true, easeLinearity: 1 });
  i++;

  displayLiveSpeed(Math.round(e.computed.speed), e.computed.time, animationSpeed);

  if (e.loc2.ele) {
    displayLiveElevation(Math.round(e.loc2.ele), e.computed.time, animationSpeed);
  }

  let timeout = (e.computed.time * 1000) / animationSpeed;

  let timeoutId = setTimeout(animate, timeout, i, map, speedSelector, speedData);
  localStorage.setItem("timeout", timeoutId.toString());
}
