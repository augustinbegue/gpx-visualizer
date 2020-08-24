import { Segment } from "../types";
import { getChartLabel } from "./labelHelper";

export function getChartData(speedData: Segment[]): Chart.ChartData {
  return {
    datasets: [
      {
        label: "Elevation",
        yAxisID: "elevation-axis",
        borderColor: '#4287f5',
        backgroundColor: '#4287f530',
        data: speedData.map((element, index, arr) => {
          return {
            x: getChartLabel(index, arr),
            y: <number>element.loc2.ele,
          };
        }),
      },
      {
        label: "Speed",
        yAxisID: "speed-axis",
        borderColor: '#f54242',
        backgroundColor: '#f5424230',
        data: speedData.map((element, index, arr) => {
          return {
            x: getChartLabel(index, arr),
            y: Math.floor(<number>element.computed.filteredSpeed * 100) / 100,
          };
        }),
      },
      {
        label: "Location",
        yAxisID: "index-axis",
        borderColor: '#00000000',
        backgroundColor: '#00000000',
        data: speedData.map((_element, index, arr) => {
          return {
            x: getChartLabel(index, arr),
            y: index,
          };
        }),
      },
    ],
    labels: speedData.map((_element, index, arr) => {
      return getChartLabel(index, arr);
    }),
  };
}
