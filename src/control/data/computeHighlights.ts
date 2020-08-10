import { SpeedData, SpeedDataHighlights } from "../../types";
import { maxRealSpeed } from "../../constants";
import KalmanFilter from 'kalmanjs';

export function computeHighlights(result: Array<SpeedData>): SpeedDataHighlights {
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

    if (seg.speed > maxSpeed && !isNaN(seg.speed) && seg.speed < maxRealSpeed) {
      maxSpeed = seg.speed;
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
