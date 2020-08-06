import { GpxData, SpeedData } from "../../types";
import { getSegDistance } from "./getSegDistance";
import { getSegSpeed } from "./getSegSpeed";

export function computeSpeed(gpxData: GpxData): Array<SpeedData> {
  const result = [];

  for (let i = 0; i < gpxData.segments.length; i++) {
    const segment = gpxData.segments[i];

    for (let j = 1; j < segment.length; j++) {
      const locData1 = segment[j - 1];
      const locData2 = segment[j];

      let d = <number>getSegDistance(locData1.loc[0], locData1.loc[1], locData2.loc[0], locData2.loc[1], locData1.ele, locData2.ele);

      const seg = getSegSpeed(d, locData1.time, locData2.time);

      result.push({
        computed: seg,
        loc1: locData1,
        loc2: locData2,
      });
    }
  }

  return result;
}
