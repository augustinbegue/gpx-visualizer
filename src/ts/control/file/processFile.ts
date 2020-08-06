import { generateMap } from "../../leaflet/generateMap";
import { displayHighlights } from "../../methods/displayHighlights";
import { computeSpeed } from "../data/computeSpeed";
import { computeHighlights } from "../data/computeHighlights";
import { parseXml } from "../data/parseXml";

export function processFile(xmlStr: string) {
  const gpxData = parseXml(xmlStr);

  const speedData = computeSpeed(gpxData);

  const speedDataHighlights = computeHighlights(speedData);

  displayHighlights(gpxData, speedDataHighlights);

  generateMap(gpxData, speedData, speedDataHighlights);
}
