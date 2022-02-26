import { customTooltip } from "./customTooltip";
import { ChartOptions } from "chart.js";

export const chartOptions: ChartOptions = {
  tooltips: {
    enabled: false,
    custom: customTooltip,
    mode: 'index',
    intersect: false,
  },
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0,
      borderWidth: 0,
      hitRadius: 0,
      hoverRadius: 0,
      hoverBorderWidth: 0,
    }
  },
  scales: {
    yAxes: [{
      id: 'elevation-axis',
      type: 'linear',
      position: 'left',
      ticks: {
        callback: function (value, _index, _values) {
          return `${Math.round(<number>value)}m`;
        }
      },
      gridLines: {
        drawOnChartArea: false,
      },
    },
    {
      id: 'speed-axis',
      type: 'linear',
      position: 'right',
      ticks: {
        callback: function (value, _index, _values) {
          return `${Math.round(<number>value)}km/h`;
        }
      },
      gridLines: {
        drawOnChartArea: false,
      },
    },
    {
      id: 'index-axis',
      type: 'linear',
      display: false
    }
    ],
    xAxes: [{
      id: 'distance',
      position: 'bottom',
      ticks: {
        callback: function (value, _index, _values) {
          return `${Math.round(<number>value * 10) / 10}km`;
        }
      },
    }]
  }
};
