export interface Segment {
  loc: Array<number>;
  ele: Coordinates["altitude"];
  time: number;
}

export type Segments = Array<Segment>;

export interface GpxData {
  segments: Array<Segments>;
  name: string;
}

interface ComputedData {
  speed: number;
  time: number;
  distance: number;
}

export interface SpeedData {
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