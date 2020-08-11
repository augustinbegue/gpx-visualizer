export interface Segment {
  loc: Array<number>;
  ele?: Coordinates["altitude"];
  time?: number;
  temp?: number;
  hr?: number;
  cad?: number;
}

export interface GlobalData {
  gpxData: gpxData;
  speedData: SpeedData;
  speedDataHighlights: speedDataHighlights;
  map: L.Map;
  locationMarker: L.Marker;
  currentIndex: number;
  timeout: number;
  playState: playState;
}

export interface GpxData {
  segments: Array<Segments>;
  name: string;
}

interface ComputedData {
  speed: number;
  filteredSpeed: number;
  time: number;
  distance: number;
}

export type SpeedData = Array<SpeedSegment>;

export interface SpeedSegment {
  computed: ComputedData;
  loc1: Segment;
  loc2: Segment;
}

export interface SpeedDataHighlights {
  totalTime: number;
  movingTime: number;
  distance: number;
  avgSpeed: number;
  avgMovingSpeed: number;
  maxSpeed: number;
  maxSpeedIndex: number;
}

export type playState = "stopped" | "inplay" | "paused";