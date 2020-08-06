
export function displayLiveElevation(computedElevation: number, duration: number, animationSpeed: number) {
  const elevationSpan = document.getElementById("elevation");

  if (duration > 0.2 / animationSpeed && elevationSpan) {
    elevationSpan.innerHTML = computedElevation.toString();
  }
}
