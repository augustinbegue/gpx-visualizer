import { ChartData } from "chart.js";
import { SpeedSegment } from "../types";
import { getChartIndex } from "./getChartIndex";
export function getChartData(speedData: SpeedSegment[]): ChartData {
  return {
    datasets: [
      {
        label: "Elevation",
        yAxisID: "elevation-axis",
        borderColor: '#4287f5',
        backgroundColor: '#4287f530',
        data: speedData.map((element, index, arr) => {
          return {
            x: getChartIndex(index, arr),
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
            x: getChartIndex(index, arr),
            y: Math.floor(element.computed.filteredSpeed * 100) / 100,
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
            x: getChartIndex(index, arr),
            y: index,
          };
        }),
      },
    ],
    labels: speedData.map((_element, index, arr) => {
      return getChartIndex(index, arr);
    }),
  };
}
