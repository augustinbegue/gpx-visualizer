import { processFile } from "./processFile";
import { returnFileSize } from "./returnFileSize";

export function loadFile(files: FileList) {
  const gpxFile = files[0];
  const fileInfo = document.getElementsByClassName("file-info")[0];

  fileInfo.innerHTML = `Name: ${gpxFile.name} | Size: ${returnFileSize(gpxFile.size)}`;

  const fr = new FileReader();
  fr.onload = function () {
    processFile(<string>fr.result);
  };
  fr.readAsText(gpxFile);
}
