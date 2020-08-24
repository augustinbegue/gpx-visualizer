import { Segment, SegmentStats } from "../../types";
import { maxRealSpeed } from "../../constants";

export function computeHighlights(segmentData: Array<Segment>): SegmentStats {
  let result = <SegmentStats>{}

  result.distance = 0;

  for (let i = 0; i < segmentData.length; i++) {
    const seg = segmentData[i].computed;
    let sseg;

    if (segmentData[i - 1]) sseg = segmentData[i - 1].computed;

    result.distance += seg.distance;

    if (seg.ele) {
      !result.maxEle ? result.maxEle = 0 : '';
      !result.minEle ? result.minEle = 0 : '';
      !result.gainEle ? result.gainEle = 0 : '';
      !result.totEle ? result.totEle = 0 : '';

      seg.ele > result.maxEle ? result.maxEle = seg.ele : '';
      seg.ele < result.minEle ? result.minEle = seg.ele : '';

      if (sseg?.ele) {
        let eleDiff = seg.ele - sseg.ele;

        if (eleDiff > 0) {
          result.gainEle += eleDiff;
          result.totEle += eleDiff;
        } else if (eleDiff < 0) {
          result.totEle += eleDiff;
        }
      }
    }

    if (seg.time) {
      !result.totalTime ? result.totalTime = 0 : '';
      result.totalTime += seg.time

      if (seg.speed && seg.filteredSpeed) {
        !result.avgSpeed ? result.avgSpeed = 0 : '';
        !result.avgMovingSpeed ? result.avgMovingSpeed = 0 : '';
        !result.movingTime ? result.movingTime = 0 : '';
        !result.maxSpeed ? result.maxSpeed = 0 : '';

        result.avgSpeed += seg.speed * seg.time;

        if (seg.speed > 5) {
          result.avgMovingSpeed += seg.speed * seg.time;
          result.movingTime += seg.time;
        }

        if (seg.filteredSpeed > result.maxSpeed && seg.filteredSpeed < maxRealSpeed) {
          result.maxSpeed = seg.filteredSpeed;
          result.maxSpeedIndex = i;
        }
      }

      if (seg.temp) {
        !result.avgTemp ? result.avgTemp = 0 : '';
        !result.maxTemp ? result.maxTemp = 0 : '';

        result.avgTemp += seg.temp * seg.time;

        if (seg.temp > result.maxTemp) {
          result.maxTemp = seg.temp;
        }
      }

      if (seg.hr) {
        !result.avgHr ? result.avgHr = 0 : '';
        !result.maxHr ? result.maxHr = 0 : '';

        result.avgHr += seg.hr * seg.time;

        if (seg.hr > result.maxHr) {
          result.maxHr = seg.hr;
          result.maxHrIndex = i;
        }
      }

      if (seg.cad) {
        !result.avgCad ? result.avgCad = 0 : '';
        !result.maxCad ? result.maxCad = 0 : '';

        result.avgCad += seg.cad * seg.time;

        if (seg.cad > result.maxCad) {
          result.maxCad = seg.cad;
          result.maxCadIndex = i;
        }
      }
    }
  }

  if (result.totalTime) {
    result.avgSpeed ? result.avgSpeed /= result.totalTime : '';
    result.avgCad ? result.avgCad /= result.totalTime : '';
    result.avgHr ? result.avgHr /= result.totalTime : '';
    result.avgTemp ? result.avgTemp /= result.totalTime : '';

    result.totalTime /= 3600;
  }

  if (result.movingTime) {
    result.avgMovingSpeed ? result.avgMovingSpeed /= result.movingTime : '';
    result.movingTime /= 3600;
  }

  return result;
}
