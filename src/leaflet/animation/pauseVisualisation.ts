export function pauseVisualisation() {
  const timeoutId = window.__GLOBAL_DATA__.timeout;
  clearTimeout(timeoutId);

  const centerCursor = document.getElementById("centerCursor");
  if (!centerCursor)
    throw new Error("centerCursor missing");
  centerCursor.style.display = "none";
}
