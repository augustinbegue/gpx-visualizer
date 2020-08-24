import { DataType } from "../types";
import { formatTime } from "./formatTime";

export function display(id: string, data: any | undefined, type?: DataType): void {
  const el = document.getElementById(id);
  if (!el)
    throw new Error(id + " container not found");
  const pEl = <HTMLElement>el.parentElement;

  if (!data) {
    pEl.style.display = 'none';
    return;
  }

  let text = '';

  switch (type) {
    case "speed":
      text = Math.round(data * 100) / 100 + " km/h";
      break;
    case "elevation":
      text = Math.round(data) + " m";
      break;
    case "time":
      let time = formatTime(data);
      text = `${time.hours}h ${time.minutes}m ${time.seconds}s`;
      break;
    case "distance":
      text = Math.round((data / 1000) * 100) / 100 + " km";
      break;
    case "temp":
      text = Math.round(data) + " °C";
      break;
    case "hr":
      text = Math.round(data) + " bpm";
      break;
    case "cad":
      text = Math.round(data) + " rpm";
      break;
    default:
      text = data;
      break;
  }

  el.innerHTML = text;
  pEl.style.display = 'block';
}
