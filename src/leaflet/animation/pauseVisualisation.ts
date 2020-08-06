export function pauseVisualisation() {
  const timeoutId = <string>localStorage.getItem("timeout");
  clearTimeout(parseInt(timeoutId));

  const centerCursor = document.getElementById("centerCursor");
  if (!centerCursor)
    throw new Error("centerCursor missing");
  centerCursor.style.display = "none";
}
