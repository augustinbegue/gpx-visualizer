import { GpxData, SpeedSegment } from "../../types";
import { getSegDistance } from "./getSegDistance";
import { getSegSpeed } from "./getSegSpeed";
import KalmanFilter from "kalmanjs";
import { kFilterR, kFilterQ } from "../../constants";

export function computeSpeed(gpxData: GpxData): Array<SpeedSegment> {
  const result = [];

  const kfSpeed = new KalmanFilter({R: kFilterR, Q: kFilterQ})

  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData1 = segment[j - 1];
      const locData2 = segment[j];

      let d = <number>getSegDistance(locData1.loc[0], locData1.loc[1], locData2.loc[0], locData2.loc[1], locData1.ele, locData2.ele);

      const seg = getSegSpeed(d, locData1.time, locData2.time);

      const filteredSpeed = kfSpeed.filter(seg.speed)

      result.push({
        computed: {
          ...seg,
          filteredSpeed: filteredSpeed
        },
        loc1: locData1,
        loc2: locData2,
      });
    }
  }

  return result;
}
