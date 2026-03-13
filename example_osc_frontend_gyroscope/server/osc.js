const osc = require("osc");

const GYRO_ADDRESS = "/gyrosc/gyro";
const QUAT_ADDRESS = "/gyrosc/quat";

function createOscReceiver(port, broadcast) {
  const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: port,
    metadata: true,
  });

  udpPort.on("message", (msg) => {
    if (msg.address === GYRO_ADDRESS) {
      const [x, y, z] = msg.args.map((a) => a.value);
      broadcast({ address: msg.address, x, y, z });
    } else if (msg.address === QUAT_ADDRESS) {
      const [w, x, y, z] = msg.args.map((a) => a.value);
      broadcast({ address: msg.address, w, x, y, z });
    }
  });

  udpPort.on("ready", () => {
    console.log(`📡  OSC listening on UDP port ${port}`);
  });

  udpPort.on("error", (err) => console.error("OSC error:", err));
  udpPort.open();
}

module.exports = { createOscReceiver };
