import { initDragAndDrop } from "./control/file/dropbox";
import { loadFile } from "./control/file/loadFile";

export const mapboxUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
export const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';


window.onload = function () {
  initDragAndDrop();

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
  );

  fileElem?.addEventListener("change", function() {
    loadFile(<FileList>this.files)
  })
};


