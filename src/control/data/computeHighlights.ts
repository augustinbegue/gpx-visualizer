import { SpeedData, SpeedDataHighlights } from "../../types";

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

    let j,
      maxAvg = 0,
      maxAvgTime = 0;
    for (j = i - 5; j <= i + 5; j++) {
      let tempseg;

      if (!result[j])
        break;

      tempseg = result[j].computed;
      maxAvg += tempseg.speed * tempseg.time;
      maxAvgTime += tempseg.time;
    }

    let newMaxSpeed = maxAvg / maxAvgTime;

    if (newMaxSpeed > maxSpeed && !isNaN(newMaxSpeed)) {
      maxSpeed = newMaxSpeed;
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
