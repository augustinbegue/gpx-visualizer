import * as L from "leaflet";
import { Segment, playState } from "../../types";
import { updateState } from "../../methods/updateState";
import { startVisualisation } from "./startVisualisation";
import { pauseVisualisation } from "./pauseVisualisation";

export function initVisualisation(map: L.Map, speedData: Array<Segment>) {
  const startButton = document.getElementById("startVisualisation");
  if (!startButton)
    throw new Error("startButton missing");

  const stopButton = document.getElementById("stopVisualisation");
  if (!stopButton)
    throw new Error("stopButton missing");

  window.__GLOBAL_DATA__.playState =  "stopped";
  window.__GLOBAL_DATA__.currentIndex = 0;

  startButton.addEventListener("click", function () {
    let newState: playState, state: playState = window.__GLOBAL_DATA__.playState;

    switch (state) {
      case "stopped":
        startVisualisation(map, speedData);
        newState = "inplay";
        break;
      case "inplay":
        pauseVisualisation();
        newState = "paused";
        break;
      case "paused":
        startVisualisation(map, speedData);
        newState = "inplay";
        break;
      default:
        newState = "paused";
        break;
    }

    updateState(startButton, newState);
  });

  stopButton.addEventListener("click", function () {
    updateState(startButton, "stopped");
    pauseVisualisation();

    for (let i = 0; i < document.getElementsByClassName("speedometer").length; i++) {
      const element = <HTMLElement>document.getElementsByClassName("speedometer")[i];
      element.style.display = "none";
    }

    for (let i = 0; i < document.getElementsByClassName("elevation").length; i++) {
      const element = <HTMLElement>document.getElementsByClassName("elevation")[i];
      element.style.display = "none";
    }

    const centerCursor = document.getElementById("centerCursor");
    if (!centerCursor)
      throw new Error("centerCursor missing");
    centerCursor.style.display = "none";

    window.__GLOBAL_DATA__.currentIndex = 0;
  });
}
