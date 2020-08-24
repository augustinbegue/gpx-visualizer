import { getChartIndex } from "./labelHelper";
import { extractData } from "../control/data/dataProcessors"
import { isInViewport } from "../helpers/isInViewport";

export class CustomContextMenu {
  element: HTMLElement;
  container: HTMLElement;
  chartIndex: number;
  entryPoint: number;
  exitPoint: number;

  constructor(id: string, container: HTMLElement) {
    this.container = container;
    this.chartIndex = 0;
    this.entryPoint = 0;
    this.exitPoint = 0;

    let element = document.getElementById(id);

    if (!element) {
      element = document.createElement('div');;
      element.id = id;
      element.classList.add('dropdown-menu');
      element.style.display = 'none';
      element.innerHTML =
      `<div class="dropdown-content">
        <a id="setEntryPt" class="dropdown-item">
          Set Entry Point
        </a>
        <hr class="dropdown-divider">
        <a id="setExitPt" class="dropdown-item">
          Set Exit Point
        </a>
        <hr class="dropdown-divider">
        <a id="extractPts" class="dropdown-item">
          Extract Points
        </a>
      </div>`;
      document.body.appendChild(element);

      document.getElementById("setEntryPt")?.addEventListener('click', this.setEntryPt);
      document.getElementById("setExitPt")?.addEventListener('click', this.setExitPt);
      document.getElementById("extractPts")?.addEventListener('click', this.extractPts);
    }

    document.addEventListener('contextmenu', this.documentContextmenuHandler);
    this.element = element;
  }

  summon(x: number, y: number) {
    document.addEventListener('click', this.outsideClickHandler);
    this.element.style.display = 'block';
    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;
    if (!isInViewport(this.element)) {
      let pos = this.element.getBoundingClientRect()

      this.element.style.top = `${y - pos.height}px`;
    }
  }

  hide() {
    this.element.style.display = 'none';
    this.element.style.top = `0px`;
    this.element.style.left = `0px`;
    document.removeEventListener('click', this.outsideClickHandler);
  }

  outsideClickHandler = (e: Event) => {
    if (!this.element.contains(<Node>e.target)) {
      this.hide();
    }
  };

  documentContextmenuHandler = (e: MouseEvent) => {
    this.chartIndex = getChartIndex(window.__GLOBAL_DATA__.currentChartLabel, window.__GLOBAL_DATA__.segmentData);
    if (this.container.contains(<Node>e.target)) {
      this.summon(e.pageX, e.pageY);
      e.preventDefault();
    }
  };

  setEntryPt = (_e: Event) => {
    this.hide();
    this.entryPoint = this.chartIndex;
  };

  setExitPt = (_e: Event) => {
    this.hide();
    this.exitPoint = this.chartIndex;
  };

  extractPts = (_e: Event) => {
    this.hide();
    extractData(this.entryPoint, this.exitPoint);
  };
}

