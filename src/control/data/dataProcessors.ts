import { generateMap } from "../../leaflet/generateMap";
import { displayStats } from "./displayStats";
import { computeHighlights } from "./highlightsProcessor";
import { generateCharts } from "../../chartjs/generateCharts";
import { GpxData, Segment } from "../../types";
import { getSegDistance, getSegSpeed } from "./segmentHelpers";
import KalmanFilter from "kalmanjs";
import { kFilterR, kFilterQ } from "../../constants";

// Refreshes the displayed data using the global variable window.__GLOBAL_DATA__.segmentData
export async function refreshData() {
  console.log(window.__GLOBAL_DATA__.segmentData);
  
  window.__GLOBAL_DATA__.segmentStats = computeHighlights(window.__GLOBAL_DATA__.segmentData);

  displayStats(window.__GLOBAL_DATA__.gpxData, window.__GLOBAL_DATA__.segmentStats);

  window.__GLOBAL_DATA__.map = await generateMap(window.__GLOBAL_DATA__.gpxData, window.__GLOBAL_DATA__.segmentData, window.__GLOBAL_DATA__.segmentStats);

  window.__GLOBAL_DATA__.chart = await generateCharts();
}


export function extractData(entryPoint: number, exitPoint: number) {
  window.__GLOBAL_DATA__.segmentData = window.__GLOBAL_DATA__.segmentData.slice(entryPoint, exitPoint);

  let segs = window.__GLOBAL_DATA__.gpxData.segments;

  for (let i = 0; i < segs.length; i++) {
    if (entryPoint > segs[i].length) {
      segs = segs.splice(i, 1);
    }
    else if (exitPoint < segs[i].length) {
      segs[i] = segs[i].slice(entryPoint, exitPoint);
    }
    else {
      segs[i] = segs[i].slice(entryPoint, segs[i].length);
    }
  }

  window.__GLOBAL_DATA__.gpxData.segments = segs;

  refreshData();
}


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

      if (locData1.ele && locData2.ele) {
        tsegment.computed.ele = locData2.ele
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