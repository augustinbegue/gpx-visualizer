import { Segment } from "../types";

export function getChartLabel(index: number, arr: Array<Segment>): number {
  if (index === 0) {
    return 0;
  }
  else {
    let distance = 0;
    for (let i = index; i >= 0; i--) {
      distance += arr[i].computed.distance;
    }
    return distance / 1000;
  }
}

export function getChartIndex(label: number, arr: Array<Segment>): number {
  if (label === 0) {
    return 0;
  } else {
    let index = 0, tempDist = 0;
    for (index; index < arr.length; index++) {
      tempDist += arr[index].computed.distance;
      if (Math.round((tempDist / 1000) * 10**13) / 10**13 === Math.round(label * 10**13) / 10**13) {
        break;
      }
    }
    return index;   
  }
}