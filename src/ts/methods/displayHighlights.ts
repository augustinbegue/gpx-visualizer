import { GpxData, SpeedDataHighlights } from "../types";
import { formatTime } from "./formatTime";

export function displayHighlights(gpxData: GpxData, speedDataHighlights: SpeedDataHighlights) {
  const gpx = document.getElementById("gpx");
  if (!gpx)
    throw new Error("gpx container not found");
  gpx.style.display = "block";

  const gpxName = document.getElementById("gpxName");
  if (!gpxName)
    throw new Error("gpxName container not found");
  gpxName.innerHTML = gpxData.name;

  const gpxSegs = document.getElementById("gpxSegs");
  if (!gpxSegs)
    throw new Error("gpxSegs container not found");
  gpxSegs.innerHTML = gpxData.segments.length.toString();

  let time = formatTime(speedDataHighlights.totalTime);
  const totalTime = document.getElementById("totalTime");
  if (!totalTime)
    throw new Error("totalTime container not found");
  totalTime.innerHTML = `${time.hours}h ${time.minutes}m ${time.seconds}s`;

  time = formatTime(speedDataHighlights.movingTime);
  const movingTime = document.getElementById("movingTime");
  if (!movingTime)
    throw new Error("movingTime container not found");
  movingTime.innerHTML = `${time.hours}h ${time.minutes}m ${time.seconds}s`;

  const distance = document.getElementById("distance");
  if (!distance)
    throw new Error("distance container not found");
  distance.innerHTML = Math.round((speedDataHighlights.distance / 1000) * 100) / 100 + " km";

  const avgSpeed = document.getElementById("avgSpeed");
  if (!avgSpeed)
    throw new Error("avgSpeed container not found");
  avgSpeed.innerHTML = Math.round(speedDataHighlights.avgSpeed * 100) / 100 + " km/h";

  const avgMovingSpeed = document.getElementById("avgMovingSpeed");
  if (!avgMovingSpeed)
    throw new Error("avgMovingSpeed container not found");
  avgMovingSpeed.innerHTML = Math.round(speedDataHighlights.avgMovingSpeed * 100) / 100 + " km/h";

  const maxSpeed = document.getElementById("maxSpeed");
  if (!maxSpeed)
    throw new Error("maxSpeed container not found");
  maxSpeed.innerHTML = Math.round(speedDataHighlights.maxSpeed * 100) / 100 + " km/h";
}
