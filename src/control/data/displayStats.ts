import { GpxData, SegmentStats } from "../../types";
import { display } from "../../methods/display";

export function displayStats(gpxData: GpxData, highlights: SegmentStats) {
  const gpx = document.getElementById("gpx");
  if (!gpx)
    throw new Error("gpx container not found");
  gpx.style.display = "block";

  display("gpxName", gpxData.name)

  display("gpxSegs", gpxData.segments.length.toString())

  display("distance", highlights.distance, "distance")

  display("totalTime", highlights.totalTime, 'time')

  display("movingTime", highlights.movingTime, 'time')

  display("avgSpeed", highlights.avgSpeed, 'speed')

  display("avgMovingSpeed", highlights.avgMovingSpeed, 'speed')

  display("maxSpeed", highlights.maxSpeed, 'speed')

  display("avgTemp", highlights.avgTemp, 'temp')

  display("maxTemp", highlights.maxTemp, 'temp')

  display("avgHr", highlights.avgHr, 'hr')

  display("maxHr", highlights.maxHr, 'hr')

  display("avgCad", highlights.avgCad, 'cad')

  display("maxCad", highlights.maxCad, 'cad')
}

