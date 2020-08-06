export function getSegSpeed(d: number, time1: number, time2: number) {
  const Δt = time2 / 1000 - time1 / 1000; // Time in seconds
  const v = d / Δt; // Speed in m.s-1
  const kph = v * 3.6; // Speed in km.h-1

  return {
    speed: kph,
    time: Δt,
    distance: d,
  };
}
