import { chartOptions } from "./chartOptions";
import { getChartData } from "./getChartData";

export async function generateCharts() {
  const speedData = window.__GLOBAL_DATA__.speedData;
  const { default: Chart } = await import(/* webpackChunkName: "chartjs" */ 'chart.js');

  const speedChartContainer = <HTMLElement>document.getElementById("speedChartContainer")
  speedChartContainer.innerHTML = '<canvas id="speedChart"></canvas>';

  const speedChartEl = <HTMLCanvasElement>document.getElementById("speedChart")
  const speedChartCtx = <CanvasRenderingContext2D>speedChartEl.getContext("2d")

  const speedChartData = getChartData(speedData)

  const speedChart = new Chart(speedChartCtx, {
    type: 'line',
    data: speedChartData,
    options: chartOptions,
  })
}


