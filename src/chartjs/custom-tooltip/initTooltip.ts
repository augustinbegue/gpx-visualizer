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
