import { ChartTooltipModel, ChartTooltipModelBody, ChartTooltipItem } from "chart.js";
import { setTooltipStyle } from "./setTooltipStyle";
import { updateTooltipData } from "./updateTooltipData";
import { initTooltip } from "./initTooltip";

export function customTooltip(tooltipModel: ChartTooltipModel): void | undefined {
  let { tooltipEl, tooltipPointer, locationMarker } = initTooltip();

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0';
    tooltipPointer.style.opacity = '0';
    locationMarker ? locationMarker.style.display = 'none' : '';
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

  function getBody(bodyItem: ChartTooltipModelBody) {
    return bodyItem.lines;
  }

  // Set Text
  updateTooltipData(tooltipModel, getBody, tooltipEl);

  // `this` will be the overall tooltip
  setTooltipStyle(this, tooltipEl, tooltipModel, tooltipPointer);
}


