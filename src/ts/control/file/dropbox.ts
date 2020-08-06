import { loadFile } from "./loadFile";
export function initDragAndDrop() {
  const dropbox = document.getElementById("dropbox");

  dropbox?.addEventListener("dragenter", dragenter, false);
  dropbox?.addEventListener("dragover", dragover, false);
  dropbox?.addEventListener("drop", drop, false);
}
function dragenter(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();
}
function dragover(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;

  if (!dt)
    throw new Error("No files found after drag & drop");

  const files = dt.files;

  loadFile(files);
}
