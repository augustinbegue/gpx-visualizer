import { Segment } from "../../types";
export function parseGpxData(node: any, result?: any) {
  if (!result) {
    result = {
      segments: [],
      name
    };
  }

  switch (node.nodeName) {
    case "name":
      result.name = <string>node.textContent;
      break;

    case "trkseg":
      let segment: Array<Segment> = [];
      result.segments.push(segment);
      for (let i = 0; i < node.childNodes.length; i++) {
        let snode = node.childNodes[i];
        if (snode.nodeName == "trkpt") {
          let trkpt = {
            loc: [parseFloat(snode.attributes["lat"].value), parseFloat(snode.attributes["lon"].value)],
            time: 0,
            ele: 0
          };
          for (let j = 0; j < snode.childNodes.length; j++) {
            let ssnode = snode.childNodes[j];
            switch (ssnode.nodeName) {
              case "time":
                trkpt.time = new Date(ssnode.childNodes[0].data).getTime();
                break;
              case "ele":
                trkpt.ele = parseFloat(ssnode.childNodes[0].data);
                break;
            }
          }
          segment.push(trkpt);
        }
      }
      break;
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    parseGpxData(node.childNodes[i], result);
  }
  return result;
}
