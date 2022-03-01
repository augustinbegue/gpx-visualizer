import * as L from "leaflet";
import { Segment } from "../../types";
import { display } from "../../helpers/display";
import { customTooltip } from "../../chartjs/customTooltip";
import { getChartData } from "../../chartjs/getChartData";

export function animate(i: number, map: L.Map, speedSelector: HTMLSelectElement, speedData: Array<Segment>) {
  window.__GLOBAL_DATA__.currentIndex = i;

  let animationSpeed = parseInt(speedSelector.options[speedSelector.selectedIndex].value);
  const e = speedData[i];
  if (!e) {
    return;
  }

  if (e.computed.time) {
    map.panTo(<L.LatLngExpression>e.loc2.loc, { animate: true, duration: e.computed.time / animationSpeed, noMoveStart: true, easeLinearity: 1 });
    placeChartPointer(i, speedData)
    i++;

    if (e.computed.speed && e.computed.filteredSpeed && e.computed.time > 0.2 / animationSpeed) {
      if (e.computed.speed < 3) {
        displayLiveSpeed(Math.round(e.computed.speed), e.computed.time, animationSpeed);
      } else {
        displayLiveSpeed(Math.round(e.computed.filteredSpeed), e.computed.time, animationSpeed);
      }

      if (e.loc2.ele) {
        display("elevation", Math.round(e.loc2.ele).toString())
      }
    }

    let timeout = (e.computed.time * 1000) / animationSpeed;

    window.__GLOBAL_DATA__.timeout = setTimeout(animate, timeout, i, map, speedSelector, speedData);
  }
}

function displayLiveSpeed(computedSpeed: number, duration: number, animationSpeed: number) {
  const liveSpeedSpan = document.getElementById("speedometer");
  if (!liveSpeedSpan)
    throw new Error("liveSpeedSpan missing");

  const currentSpeed = parseInt(liveSpeedSpan.innerText);
  let sign: number, difference: number;

  if (computedSpeed < 0)
    computedSpeed = 0;

  if (currentSpeed > computedSpeed) {
    sign = -1;
    difference = currentSpeed - computedSpeed;
  }
  else {
    sign = 1;
    difference = computedSpeed - currentSpeed;
  }

  if (difference === 0) {
    return;
  }

  if (duration > 0.2 / animationSpeed) {
    if (animationSpeed > 5 || difference <= 2) {
      liveSpeedSpan.innerHTML = computedSpeed.toString();
      return;
    }

    // Smooth speed display is animation speed is slower than 10 or difference higher than 1
    let interval = setInterval(function () {
      let displayedSpeed = parseInt(liveSpeedSpan.innerText);

      if (displayedSpeed === computedSpeed) {
        liveSpeedSpan.innerHTML = computedSpeed.toString();
        clearInterval(interval);
      }

      if (displayedSpeed < 0) {
        displayedSpeed = 0;
        clearInterval(interval);
      }

      if (sign > 0) {
        displayedSpeed++;
      }
      else {
        displayedSpeed--;
      }

      liveSpeedSpan.innerHTML = displayedSpeed.toString();
    }, ((duration - 0.5) / animationSpeed / difference) * 1000);
  }
}

function placeChartPointer(index: number, speedData: Array<Segment>) {
  const position = <DOMRect>window.__GLOBAL_DATA__.chart.canvas?.getBoundingClientRect();

  const chartData = getChartData(speedData)

  if (!chartData.datasets || !chartData.datasets[0].data || !chartData.datasets[1].data || !chartData.labels) {
    return;
  }

  const body = [{ lines: [`Elevation: ${(chartData.datasets[0].data[index] as Chart.ChartPoint).y}`] }, { lines: [`Speed: ${(chartData.datasets[1].data[index] as Chart.ChartPoint).y}`] }];
  const title = [`${chartData.labels[index]}`];

  const xPos = ((position.width - 94) / chartData.labels.length) * index + 40;

  const tooltipModel = {
    afterBody: [],
    backgroundColor: "rgba(0,0,0,0.8)",
    beforeBody: [],
    body: body,
    bodyFontColor: "#fff",
    bodyFontSize: 12,
    bodySpacing: 2,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    caretPadding: 2,
    caretSize: 5,
    caretX: xPos,
    caretY: 0,
    cornerRadius: 6,
    dataPoints: [{}, {}],
    displayColors: true,
    footer: [],
    footerFontColor: "#fff",
    footerFontSize: 12,
    footerMarginTop: 6,
    footerSpacing: 2,
    height: 70,
    labelColors: [{}, {}],
    labelTextColors: ["#fff", "#fff"],
    legendColorBackground: "#fff",
    opacity: 1,
    rtl: undefined,
    textDirection: undefined,
    title: title,
    titleFontColor: "#fff",
    titleFontSize: 12,
    titleMarginBottom: 6,
    titleSpacing: 2,
    width: 128.7890625,
    x: xPos,
    xAlign: "right",
    xPadding: 6,
    y: 0,
    yAlign: "center",
    yPadding: 6,
    _bodyAlign: "left",
    _bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    _bodyFontStyle: "normal",
    _footerAlign: "left",
    _footerFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    _footerFontStyle: "bold",
    _titleAlign: "left",
    _titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    _titleFontStyle: "bold",
  }

  customTooltip(<Chart.ChartTooltipModel><unknown>tooltipModel)
}