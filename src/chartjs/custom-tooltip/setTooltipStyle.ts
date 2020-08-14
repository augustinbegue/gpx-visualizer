export function setTooltipStyle(tooltipEl: HTMLElement, tooltipModel: Chart.ChartTooltipModel, tooltipPointer: HTMLElement, Chart: any) {
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
  tooltipPointer.style.left = position.left + window.pageXOffset + tooltipModel.caretX - 2 + 'px';
  tooltipPointer.style.top = position.top + window.pageYOffset + 'px';
  tooltipPointer.style.height = (position.height - 76) + 'px';
  tooltipPointer.style.marginTop = '32px';
}
