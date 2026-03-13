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

	// Map Arduino output to PARAMS keys (e.g. "Potentiometer value" → "linear_pot")
	const SENSOR_ALIASES = { "Potentiometer value": "linear_pot" };

	function normalizeData(data) {
		const [rawSensor, rawValue] = data.split(":").map((s) => s.trim());
		const sensor = SENSOR_ALIASES[rawSensor] || rawSensor;
		const param = PARAMS[sensor];
		if (!param) return null;

		const value = Number(rawValue);
		if (Number.isNaN(value)) return null;

		let normalizedValue = (value - param.min) / (param.max - param.min);
		normalizedValue = Math.max(0, Math.min(1, normalizedValue));
		return { value: normalizedValue, id: sensor };
	}

	parser.on("data", (line) => {
		const processedData = normalizeData(line);
		if (processedData) io.emit("arduino", processedData);
	});

	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

main();
