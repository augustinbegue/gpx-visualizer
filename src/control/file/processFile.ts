import { generateMap } from "../../leaflet/generateMap";
import { displayHighlights } from "../../methods/displayHighlights";
import { computeSpeed } from "../data/computeSpeed";
import { computeHighlights } from "../data/computeHighlights";
import { parseXml } from "../data/parseXml";
import { generateCharts } from "../../chartjs/generateCharts";

export async function processFile(xmlStr: string) {
  window.__GLOBAL_DATA__.gpxData = parseXml(xmlStr);

  window.__GLOBAL_DATA__.speedData = computeSpeed(window.__GLOBAL_DATA__.gpxData);

  const speedDataHighlights = computeHighlights(window.__GLOBAL_DATA__.speedData);

  displayHighlights(window.__GLOBAL_DATA__.gpxData, speedDataHighlights);

  window.__GLOBAL_DATA__.map = await generateMap(window.__GLOBAL_DATA__.gpxData, window.__GLOBAL_DATA__.speedData, speedDataHighlights);

  generateCharts();
}
