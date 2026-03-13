const http = require("http");
const { Server } = require("socket.io");
const { connectArduino } = require("./serial");
const { PARAMS } = require("./PARAMS");

const PORT = 3000;

const server = http.createServer();
const io = new Server(server, {
	cors: { origin: "*" },
});

server.on("error", (err) => console.error("Server error:", err.message));

io.on("connection", (socket) => {
	console.log("Client connected:", socket.id);

	// socket.on("event", (data) => socket.broadcast.emit("event", data));
	socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

async function main() {
	const { parser } = await connectArduino();

	function normalizeData(data) {
		const [sensor, value] = data.split(":");
		const param = PARAMS[sensor];
		const normalizedValue = (value - param.min) / (param.max - param.min);
		if (normalizedValue < 0) {
			return 0;
		}
		if (normalizedValue > 1) {
			return 1;
		}
		return { value: normalizedValue, id: sensor };
	}

	parser.on("data", (line) => {
		const processedData = normalizeData(line);
		io.emit("arduino", processedData);
	});

	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

main();
