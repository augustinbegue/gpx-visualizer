import { parseGpxData } from "./parseGpxData";
import { GpxData } from "../../types";

export function parseXml(xmlstr: string): GpxData {
  const doc = new DOMParser().parseFromString(xmlstr, "text/xml");

  return parseGpxData(doc.documentElement);
}