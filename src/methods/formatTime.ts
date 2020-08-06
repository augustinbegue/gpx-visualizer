export function formatTime(totalTime: number) {
  let hours = Math.floor(totalTime);
  let minutes = Math.floor((totalTime - hours) * 60);
  let seconds = Math.floor(((totalTime - hours) * 60 - minutes) * 60);
  return {
    hours,
    minutes,
    seconds,
  };
}
