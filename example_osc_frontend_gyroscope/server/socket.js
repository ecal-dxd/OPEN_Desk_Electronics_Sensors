const { createServer } = require("http");
const { Server } = require("socket.io");

const EVENT_OSC = "osc";

function createSocketServer(port) {
	const httpServer = createServer();
	const io = new Server(httpServer, { cors: { origin: "*" } });

	io.on("connection", (socket) => {
		console.log("Client connected");
		socket.on("disconnect", () => console.log("Client disconnected"));
	});

	function broadcast(data) {
		io.emit(EVENT_OSC, data);
	}

	httpServer.listen(port, () => {
		console.log(`\n📡  Socket.IO → http://localhost:${port}`);
	});

	return { broadcast };
}

module.exports = { createSocketServer, EVENT_OSC };
