export function createHud() {
  const dot = document.getElementById("dot");
  const statusText = document.getElementById("statusText");
  const vx = document.getElementById("vx");
  const vy = document.getElementById("vy");
  const vz = document.getElementById("vz");

  function setConnected(connected) {
    dot.className = connected ? "dot on" : "dot off";
    statusText.textContent = connected ? "Connected" : "Disconnected — retrying…";
  }

  function updateValues(x, y, z, decimals = 4) {
    vx.textContent = x.toFixed(decimals);
    vy.textContent = y.toFixed(decimals);
    vz.textContent = z.toFixed(decimals);
  }

  return { setConnected, updateValues };
}
