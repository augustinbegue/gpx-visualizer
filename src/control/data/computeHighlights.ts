import { SpeedSegment, SpeedDataHighlights } from "../../types";
import { maxRealSpeed } from "../../constants";

export function computeHighlights(result: Array<SpeedSegment>): SpeedDataHighlights {
  let totalTime = 0,
    movingTime = 0,
    distance = 0,
    avgSpeed = 0,
    avgMovingSpeed = 0,
    maxSpeed = 0,
    maxSpeedIndex = 0;

  for (let i = 0; i < result.length; i++) {
    const seg = result[i].computed;

    distance += seg.distance;

    totalTime += seg.time;
    avgSpeed += seg.speed * seg.time;

    if (seg.speed > 5) {
      avgMovingSpeed += seg.speed * seg.time;
      movingTime += seg.time;
    }

    if (seg.filteredSpeed > maxSpeed && !isNaN(seg.filteredSpeed) && seg.filteredSpeed < maxRealSpeed) {
      maxSpeed = seg.filteredSpeed;
      maxSpeedIndex = i;
    }
  }

  avgSpeed /= totalTime;
  avgMovingSpeed /= movingTime;
  totalTime /= 3600;
  movingTime /= 3600;

  return {
    totalTime,
    movingTime,
    distance,
    avgSpeed,
    avgMovingSpeed,
    maxSpeed,
    maxSpeedIndex,
  };
}
