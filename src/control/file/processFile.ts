import { generateMap } from "../../leaflet/generateMap";
import { displayHighlights } from "../../methods/displayHighlights";
import { computeSpeed } from "../data/computeSpeed";
import { computeHighlights } from "../data/computeHighlights";
import { parseXml } from "../data/parseXml";
import { generateCharts } from "../../chartjs/generateCharts";
import { GpxData } from "../../types";

export function processFile(xmlStr: string) {
  const gpxData: GpxData = parseXml(xmlStr);

  const speedData = computeSpeed(gpxData);

  const speedDataHighlights = computeHighlights(speedData);

  displayHighlights(gpxData, speedDataHighlights);

  generateCharts(speedData, speedDataHighlights);

  generateMap(gpxData, speedData, speedDataHighlights);
}
