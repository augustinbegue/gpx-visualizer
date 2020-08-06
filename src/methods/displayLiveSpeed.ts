
export function displayLiveSpeed(computedSpeed: number, duration: number, animationSpeed: number) {
  const liveSpeedSpan = document.getElementById("speedometer");
  if (!liveSpeedSpan)
    throw new Error("liveSpeedSpan missing");

  const currentSpeed = parseInt(liveSpeedSpan.innerText);
  let sign: number, difference: number;

  if (currentSpeed > computedSpeed) {
    sign = -1;
    difference = currentSpeed - computedSpeed;
  }
  else {
    sign = 1;
    difference = computedSpeed - currentSpeed;
  }

  if (difference === 0) {
    return;
  }

  if (duration > 0.2 / animationSpeed) {
    if (animationSpeed > 10 || difference < 2) {
      return (liveSpeedSpan.innerHTML = computedSpeed.toString());
    }

    // Smooth speed display is animation speed is slower than 10 or difference higher than 1
    let interval = setInterval(function () {
      let displayedSpeed = parseInt(liveSpeedSpan.innerText);

      if (displayedSpeed === computedSpeed || displayedSpeed < 0) {
        liveSpeedSpan.innerHTML = computedSpeed.toString();
        clearInterval(interval);
      }

      if (sign > 0) {
        displayedSpeed++;
      }
      else {
        displayedSpeed--;
      }

      liveSpeedSpan.innerHTML = displayedSpeed.toString();
    }, ((duration - 0.5) / animationSpeed / difference) * 1000);
  }
}
