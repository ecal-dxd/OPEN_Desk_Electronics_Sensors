const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const ARDUINO_VENDOR_IDS = ["2341", "2a03", "1a86", "0403"];

async function findArduinoPort() {
	const ports = await SerialPort.list();

	console.log("Available serial ports:");
	ports.forEach((p) => {
		console.log(`  ${p.path} | vendor: ${p.vendorId || "?"} | manufacturer: ${p.manufacturer || "?"}`);
	});

	const arduino = ports.find((p) =>
		ARDUINO_VENDOR_IDS.includes(p.vendorId?.toLowerCase())
	);

	if (!arduino) {
		throw new Error("No Arduino found. Check USB connection.");
	}

	console.log(`Arduino found on ${arduino.path}`);
	return arduino.path;
}

async function connectArduino(baudRate = 9600) {
	const path = await findArduinoPort();
	const port = new SerialPort({ path, baudRate });
	const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

	port.on("error", (err) => console.error("Serial error:", err.message));

	return { port, parser };
}

module.exports = { connectArduino };
