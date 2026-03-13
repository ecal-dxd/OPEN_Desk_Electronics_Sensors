const { OSC_PORT, SOCKET_PORT } = require("./config");
const { createSocketServer } = require("./socket");
const { createOscReceiver } = require("./osc");

const { broadcast } = createSocketServer(SOCKET_PORT);
createOscReceiver(OSC_PORT, broadcast);
