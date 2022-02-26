import { initDragAndDrop } from "./control/file/dropboxHelper";
import { loadFile } from "./control/file/loader";
import { GlobalData } from "./types";

export const mapboxUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
export const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

declare global {
  interface Window {
    __GLOBAL_DATA__: GlobalData;
  }
}

window.onload = function () {
  window.__GLOBAL_DATA__ = <GlobalData>{};

  initDragAndDrop();

  // File selection initialization
  const fileSelect = document.getElementById("fileSelect"),
    fileElem = <HTMLInputElement>document.getElementById("ride");

  fileSelect?.addEventListener(
    "click",
    function (e) {
      if (fileElem) {
        fileElem.click();
      }
      e.preventDefault();
    },
    false
  )

  fileElem?.addEventListener("change", function () {
    loadFile(<FileList>this.files)
  })

  // Fullscreen
  const fullscreenButton = document.getElementById("fullscreen");

  fullscreenButton?.addEventListener("click", function () {
    let mapBox = document.getElementById("mapBox");
    if (mapBox) {
      mapBox.requestFullscreen();
      mapBox.classList.add("fullscreen");
    }
  });

  document.addEventListener('fullscreenchange', fullScreenExitHandler, false);
  document.addEventListener('mozfullscreenchange', fullScreenExitHandler, false);
  document.addEventListener('MSFullscreenChange', fullScreenExitHandler, false);
  document.addEventListener('webkitfullscreenchange', fullScreenExitHandler, false);

  function fullScreenExitHandler() {
    if (!document.fullscreenElement) {
      let mapBox = document.getElementById("mapBox");
      mapBox?.classList.remove("fullscreen");
    }
  }


  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Space to toggle play/pause
    if (e.code === "Space") {
      const playButton = document.getElementById("startVisualisation");
      playButton?.click();
    }
  });
};


