import * as L from "leaflet";

export class ElevationControl extends L.Control {
  onAdd() {
    let elevationContainer = L.DomUtil.create("div", "elevation");

    let elevationText = L.DomUtil.create("span", "elevation-text", elevationContainer);
    let elevationLegend = L.DomUtil.create("span", "elevation-legend", elevationContainer);

    elevationText.innerText = "0";
    elevationLegend.innerText = "m";
    elevationText.id = "elevation";

    return elevationContainer;
  }

  onRemove() {
    // Nothing to do here
  }

  constructor(options?: L.ControlOptions) {
    super(options);
  }
}