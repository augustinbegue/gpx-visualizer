import { Segment } from "../types";

export function getChartIndex(index: number, arr: Array<Segment>): number {
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
