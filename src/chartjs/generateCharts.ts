import { chartOptions } from "./chartOptions";
import { getChartData } from "./getChartData";
import { CustomContextMenu } from "./CustomContextMenu";

export async function generateCharts() {
  const segmentData = window.__GLOBAL_DATA__.segmentData;
  const { default: Chart } = await import(/* webpackChunkName: "chartjs" */ 'chart.js');

  const speedChartContainer = <HTMLElement>document.getElementById("speedChartContainer")
  speedChartContainer.innerHTML = '<canvas id="speedChart"></canvas>';

  const speedChartEl = <HTMLCanvasElement>document.getElementById("speedChart")
  const speedChartCtx = <CanvasRenderingContext2D>speedChartEl.getContext("2d")

  const speedChartData = getChartData(segmentData)

  const speedChart = new Chart(speedChartCtx, {
    type: 'line',
    data: speedChartData,
    options: chartOptions,
  })

  const contextMenu = new CustomContextMenu('contextmenu', speedChartEl)

  return speedChart;
}