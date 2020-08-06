import * as L from "leaflet";

export class SpeedControl extends L.Control {
  onAdd() {
    let speedometerContainer = L.DomUtil.create("div", "speedometer");

    let speedometerText = L.DomUtil.create("span", "speedometer-text", speedometerContainer);
    let speedometerLegend = L.DomUtil.create("span", "speedometer-legend heading", speedometerContainer);

    speedometerText.innerText = "0";
    speedometerLegend.innerText = "km/h";
    speedometerText.id = "speedometer";

    return speedometerContainer;
  }

  onRemove() {
    // Nothing to do here
  }

  constructor(options?: L.ControlOptions) {
    super(options);
  }
}