import * as L from "leaflet";
import { animate } from "./animate";

export function startVisualisation() {
  let i = window.__GLOBAL_DATA__.currentIndex;
  const segmentData = window.__GLOBAL_DATA__.segmentData;

  for (let i = 0; i < document.getElementsByClassName("speedometer").length; i++) {
    const element = <HTMLElement>document.getElementsByClassName("speedometer")[i];
    element.style.display = "block";
  }

  for (let i = 0; i < document.getElementsByClassName("elevation").length; i++) {
    const element = <HTMLElement>document.getElementsByClassName("elevation")[i];
    element.style.display = "block";
  }

  const speedSelector = <HTMLSelectElement>document.getElementById("speedSelector");
  if (!speedSelector)
    throw new Error("speedSelector missing");
  let animationSpeed = parseInt(speedSelector.options[speedSelector.selectedIndex].value);

  const centerCursor = document.getElementById("centerCursor");
  if (!centerCursor)
    throw new Error("centerCursor missing");
  centerCursor.style.display = "block";

  window.__GLOBAL_DATA__.map.setView(<L.LatLngExpression>segmentData[i].loc1.loc, 16, { animate: false });

  if (segmentData[0].computed.time)
    window.__GLOBAL_DATA__.timeout = setTimeout(animate, (segmentData[0].computed.time * 1000) / animationSpeed, i, window.__GLOBAL_DATA__.map, speedSelector, segmentData);
}
