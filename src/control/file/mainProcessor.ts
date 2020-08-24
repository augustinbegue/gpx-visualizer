import { computeData } from "../data/dataProcessors";
import { parseXml } from "../data/parser";
import { refreshData } from "../data/dataProcessors";;

export async function processFile(xmlStr: string) {
  window.__GLOBAL_DATA__.gpxData = parseXml(xmlStr);

  window.__GLOBAL_DATA__.segmentData = computeData(window.__GLOBAL_DATA__.gpxData);

  await refreshData();
}

