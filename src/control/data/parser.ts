import { GpxData, GpxSegment } from "../../types";

export function parseXml(xmlstr: string): GpxData {
  const doc = new DOMParser().parseFromString(xmlstr, "text/xml");

  return parseGpxData(doc.documentElement);
}

function parseGpxData(node: any, result?: any) {
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
      let segments: Array<GpxSegment> = [];
      result.segments.push(segments);

      for (let i = 0; i < node.childNodes.length; i++) {
        let snode = node.childNodes[i];

        if (snode.nodeName == "trkpt") {
          let trkpt: GpxSegment = {
            loc: [parseFloat(snode.attributes["lat"].value), parseFloat(snode.attributes["lon"].value)],
          };

          for (let j = 0; j < snode.childNodes.length; j++) {
            const ssnode = snode.childNodes[j];

            switch (ssnode.nodeName) {
              case "time":
                trkpt.time = new Date(ssnode.childNodes[0].data).getTime();
                break;

              case "ele":
                trkpt.ele = parseFloat(ssnode.childNodes[0].data);
                break;

              case "extensions":
                const extnode = ssnode.childNodes[1]
                
                for (let k = 0; k < extnode.childNodes.length; k++) {
                  const sssnode = extnode.childNodes[k];

                  switch (sssnode.nodeName) {
                    case "gpxtpx:atemp":
                      trkpt.temp = parseFloat(sssnode.childNodes[0].data)
                      break;
                    case "gpxtpx:hr":
                      trkpt.hr = parseFloat(sssnode.childNodes[0].data)
                      break;
                    case "gpxtpx:cad":
                      trkpt.cad = parseFloat(sssnode.childNodes[0].data)
                      break;
                    default:
                      break;
                  }
                }
                break;
            }
          }
          segments.push(trkpt);
        }
      }
      break;
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    parseGpxData(node.childNodes[i], result);
  }
  return result;
}