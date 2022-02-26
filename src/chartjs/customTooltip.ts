import { placeLocationMarkerFromIndex } from "../leaflet/animation/placeLocationMarker";

export async function customTooltip(tooltipModel: Chart.ChartTooltipModel): Promise<void | undefined> {
  const { default: Chart } = await import(/* webpackChunkName: "chartjs" */ 'chart.js');

  let { tooltipEl, tooltipPointer } = initTooltip();

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  }
  else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem: Chart.ChartTooltipModelBody) {
    return bodyItem.lines;
  }

  // Set Text
  updateTooltipData(tooltipModel, getBody, tooltipEl, Chart);

  // `this` will be the overall tooltip
  setTooltipStyle(tooltipEl, tooltipModel, tooltipPointer, Chart);
}

export function initTooltip() {
  let tooltipEl = document.getElementById("chartjs-tooltip");
  let tooltipPointer = document.getElementById("chartjs-pointer");
  let locationMarker = document.getElementById('locationMarker');

  if (!tooltipEl || !tooltipPointer) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    tooltipPointer = document.createElement('span');
    tooltipPointer.id = 'chartjs-pointer';
    document.body.appendChild(tooltipEl);
    document.body.appendChild(tooltipPointer);
  }

  return { tooltipEl, tooltipPointer, locationMarker };
}

export function updateTooltipData(tooltipModel: Chart.ChartTooltipModel, getBody: (bodyItem: Chart.ChartTooltipModelBody) => string[], tooltipEl: HTMLElement, _: any) {
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<tr><th style="color: white; font-weight: 700;">Distance: ${Math.round(parseFloat(title) * 100) / 100}km</th></tr>`;
      window.__GLOBAL_DATA__.currentChartLabel = parseFloat(title);
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, _) {
      if (body[0].startsWith(`Elevation`)) {
        let text = body.toString();
        text += 'm';
        innerHtml += '<tr><td>' + text + '</td></tr>';
      } else if (body[0].startsWith(`Speed`)) {
        let text = body.toString();
        text += 'km/h'
        innerHtml += '<tr><td>' + text + '</td></tr>';
      } else if (body[0].startsWith(`Location`)) {
        placeLocationMarkerFromIndex(parseInt(body[0].replace(/\D/g, '')));
      }
    });

    innerHtml += '</tbody>';

    const tableRoot = <HTMLTableElement>tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }
}

export function setTooltipStyle(tooltipEl: HTMLElement, tooltipModel: Chart.ChartTooltipModel, tooltipPointer: HTMLElement, _: any) {
  const position = <DOMRect>window.__GLOBAL_DATA__.chart.canvas?.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = '1';
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 10 + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + (position.height / 3) + 'px';
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
  tooltipEl.style.pointerEvents = 'none';

  // Set tooltip pointer style
  tooltipPointer.style.opacity = '1';
  tooltipPointer.style.position = 'absolute';
  tooltipPointer.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  tooltipPointer.style.top = position.top + window.pageYOffset + 'px';
  tooltipPointer.style.height = (position.height - 76) + 'px';
  tooltipPointer.style.marginTop = '32px';
  tooltipPointer.style.pointerEvents = 'none';
}
