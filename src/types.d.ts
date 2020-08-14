export interface GpxSegment {
  loc: Array<number>;
  ele?: Coordinates["altitude"];
  time?: number;
  temp?: number;
  hr?: number;
  cad?: number;
}

export interface GlobalData {
  chart: Chart;
  gpxData: GpxData;
  segmentData: SegmentData;
  segmentStats: SegmentStats;
  map: L.Map;
  locationMarker: L.Marker;
  currentIndex: number;
  timeout: number;
  playState: playState;
}

export interface GpxData {
  segments: Array<Array<GpxSegment>>;
  name: string;
}

interface ComputedData {
  speed?: number;
  filteredSpeed?: number;
  time?: number;
  distance: number;
  temp?: number;
  hr?: number;
  cad?: number;
}

export type SegmentData = Array<Segment>;

export interface Segment {
  computed: ComputedData;
  loc1: GpxSegment;
  loc2: GpxSegment;
}

export interface SegmentStats {
  distance: number;
  totalTime?: number;
  movingTime?: number;
  avgSpeed?: number;
  avgMovingSpeed?: number;
  maxSpeed?: number;
  maxSpeedIndex?: number;
  avgTemp?: number;
  maxTemp?: number;
  avgHr?: number;
  maxHr?: number;
  maxHrIndex?: number;
  avgCad?: number;
  maxCad?: number;
  maxCadIndex?: number;
}

export type playState = "stopped" | "inplay" | "paused";

export type DataType = "text" | "speed" | "time" | "distance" | "temp" | "hr" | "cad"