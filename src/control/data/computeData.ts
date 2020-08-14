import { GpxData, Segment } from "../../types";
import { getSegDistance } from "./getSegDistance";
import { getSegSpeed } from "./getSegSpeed";
import KalmanFilter from "kalmanjs";
import { kFilterR, kFilterQ } from "../../constants";

export function computeData(gpxData: GpxData): Array<Segment> {
  const result = [];

  const kfSpeed = new KalmanFilter({R: kFilterR, Q: kFilterQ})

  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData1 = segment[j - 1];
      const locData2 = segment[j];

      let d = <number>getSegDistance(locData1.loc[0], locData1.loc[1], locData2.loc[0], locData2.loc[1], locData1.ele, locData2.ele);
      
      const tsegment:Segment = {
        computed: {
          distance: d
        },
        loc1: locData1,
        loc2: locData2
      }

      if (locData1.time && locData2.time) {
        const { speed, time } = getSegSpeed(d, locData1.time, locData2.time);

        const filteredSpeed = kfSpeed.filter(speed)

        tsegment.computed.speed = speed;
        tsegment.computed.time = time;
        tsegment.computed.filteredSpeed = filteredSpeed;
      }

      if (locData1.temp && locData2.temp)
        tsegment.computed.temp = (locData1.temp + locData2.temp) / 2;

      if (locData2.hr)
        tsegment.computed.hr = locData2.hr;

      if (locData2.cad)
        tsegment.computed.cad = locData2.cad;

      result.push(tsegment);
    }
  }

  return result;
}
