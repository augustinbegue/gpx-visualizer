import { playState } from "../../types";
import { startVisualisation } from "./startVisualisation";
import { pauseVisualisation } from "./pauseVisualisation";

export function initVisualisation() {
  window.__GLOBAL_DATA__.playState = "stopped";
  window.__GLOBAL_DATA__.currentIndex = 0;


  const startButton = document.getElementById("startVisualisation");
  if (!startButton)
    throw new Error("startButton missing");

  const stopButton = document.getElementById("stopVisualisation");
  if (!stopButton)
    throw new Error("stopButton missing");

  if (!startButton.classList.contains("initialized")) {
    startButton.addEventListener("click", function () {
      let newState: playState, state: playState = window.__GLOBAL_DATA__.playState;

      console.log('startButton');

      switch (state) {
        case "stopped":
          startVisualisation();
          newState = "inplay";
          break;
        case "inplay":
          pauseVisualisation();
          newState = "paused";
          break;
        case "paused":
          startVisualisation();
          newState = "inplay";
          break;
        default:
          newState = "paused";
          break;
      }

      updateState(startButton, newState);
    });

    startButton.classList.add("initialized");
  }

  if (!stopButton.classList.contains("initialized")) {
    stopButton.addEventListener("click", function () {
      updateState(startButton, "stopped");
      pauseVisualisation();

      console.log("stopButton");

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

    stopButton.classList.add("initialized");
  }
}

function updateState(startButton: HTMLElement, state: playState) {
  window.__GLOBAL_DATA__.playState = state;

  console.log(state);

  const iconSpan = startButton.getElementsByClassName("icon")[0];
  let innerHTML;

  switch (state) {
    case "inplay":
      innerHTML = `<i class="fas fa-pause"></i>`;
      break;
    case "stopped":
      innerHTML = `<i class="fas fa-play"></i>`;
      break;
    case "paused":
      innerHTML = `<i class="fas fa-play"></i>`;
      break;
    default:
      innerHTML = `<i class="fas fa-play"></i>`;
      break;
  }

  iconSpan.innerHTML = innerHTML;
}