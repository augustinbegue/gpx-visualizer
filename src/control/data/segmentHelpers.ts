export function getSegDistance(lat1: Coordinates["latitude"], lon1: Coordinates["longitude"], lat2: Coordinates["latitude"], lon2: Coordinates["longitude"], ele1?: Coordinates["altitude"], ele2?: Coordinates["altitude"]): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // in metres

  if (ele1 && ele2) {
    const Δh = ele2 - ele1;

    if (Δh != 0) {
      d = Math.sqrt(Math.pow(d, 2) + Math.pow(Δh, 2));
    }
  }

  return d;
}

export function getSegSpeed(d: number, time1: number, time2: number) {
  const Δt = time2 / 1000 - time1 / 1000; // Time in seconds
  const v = d / Δt; // Speed in m.s-1
  const kph = v * 3.6; // Speed in km.h-1

  return {
    speed: kph,
    time: Δt,
  };
}
