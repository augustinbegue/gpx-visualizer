import { playState } from "../types";
export function updateState(startButton: HTMLElement, state: playState) {
  localStorage.setItem("state", state);

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
