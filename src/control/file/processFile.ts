import { generateMap } from "../../leaflet/generateMap";
import { displayStats } from "../data/displayStats";
import { computeData } from "../data/computeData";
import { computeHighlights } from "../data/computeHighlights";
import { parseXml } from "../data/parseXml";
import { generateCharts } from "../../chartjs/generateCharts";

export async function processFile(xmlStr: string) {
  window.__GLOBAL_DATA__.gpxData = parseXml(xmlStr);

  window.__GLOBAL_DATA__.segmentData = computeData(window.__GLOBAL_DATA__.gpxData);

  window.__GLOBAL_DATA__.segmentStats = computeHighlights(window.__GLOBAL_DATA__.segmentData);

  displayStats(window.__GLOBAL_DATA__.gpxData, window.__GLOBAL_DATA__.segmentStats);

  window.__GLOBAL_DATA__.map = await generateMap(window.__GLOBAL_DATA__.gpxData, window.__GLOBAL_DATA__.segmentData, window.__GLOBAL_DATA__.segmentStats);

  window.__GLOBAL_DATA__.chart = await generateCharts();
}
