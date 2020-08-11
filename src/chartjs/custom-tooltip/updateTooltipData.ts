import { ChartTooltipModel, ChartTooltipModelBody } from "chart.js";
import { placeLocationMarkerFromIndex } from "../../leaflet/animation/placeLocationMarker";

export function updateTooltipData(tooltipModel: ChartTooltipModel, getBody: (bodyItem: ChartTooltipModelBody) => string[], tooltipEl: HTMLElement) {
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function (title) {
      innerHtml += `<tr><th style="color: white; font-weight: 700;">Distance: ${Math.round(parseFloat(title) * 100) / 100}km</th></tr>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function (body, i) {
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
