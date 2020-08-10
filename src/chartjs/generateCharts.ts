import { Chart, ChartData } from "chart.js";
import { SpeedData, SpeedDataHighlights } from "../types";

export function generateCharts(speedData: Array<SpeedData>, speedDataHighlights: SpeedDataHighlights) {
  const speedChartContainer = <HTMLElement>document.getElementById("speedChartContainer")
  speedChartContainer.innerHTML = '<canvas id="speedChart"></canvas>';
  const speedChartEl = <HTMLCanvasElement>document.getElementById("speedChart")
  const speedChartCtx = <CanvasRenderingContext2D>speedChartEl.getContext("2d")

  const speedChartData: ChartData = {
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
          }
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
            y: Math.floor(element.computed.speed * 100) / 100,
          }
        }),
      },
    ],
    labels: speedData.map((element, index, arr) => {
      return getChartIndex(index, arr);
    }),
  }

  console.log(speedChartData);


  const speedChart = new Chart(speedChartCtx, {
    type: 'line',
    data: speedChartData,
    options: {
      animation: {
        duration: 0 // general animation time
      },
      hover: {
        animationDuration: 0 // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0,
        }
      },
      scales: {
        yAxes: [{
          id: 'elevation-axis',
          type: 'linear',
          position: 'left',
          ticks: {
            callback: function(value, index, values) {
              return `${Math.round(<number>value)}m`;
            }
          }
        },
        {
          id: 'speed-axis',
          type: 'linear',
          position: 'right',
          ticks: {
            callback: function(value, index, values) {
              return `${Math.round(<number>value)}km/h`;
            }
          }
        }
        ],
        xAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return `${Math.round(<number>value * 10) / 10}km`;
            }
          }
        }]
      }
    }
  })
}

function getChartIndex(index: number, arr: Array<SpeedData>): number {
  if (index === 0) {
    return 0;
  } else {
    let distance = 0;
    for (let i = index; i >= 0; i--) {
      distance += arr[i].computed.distance;
    }
    return distance / 1000;
  }
}
