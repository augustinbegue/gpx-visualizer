import { parseGpxData } from "./parseGpxData";

export function parseXml(xmlstr: string) {
  const doc = new DOMParser().parseFromString(xmlstr, "text/xml");
  return parseGpxData(doc.documentElement);
}
