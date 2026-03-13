# Arduino Pong

A physical Pong game where two players control paddles using Arduino sensors. Player 1 uses a linear potentiometer; Player 2 uses an ultrasonic distance sensor.

## Architecture

```
Arduino (sensors) → Serial → Node.js backend → Socket.IO → Web frontend (canvas)
```

- **Arduino**: Reads sensor values and sends them over serial
- **Backend**: Connects to Arduino, normalizes sensor data, broadcasts to clients via WebSocket
- **Frontend**: Canvas-based Pong game that receives sensor data in real time

## Hardware

### Player 1 – Linear potentiometer
- Connect to analog pin `A0`
- Sends values 0–1023 (10-bit ADC)

### Player 2 – Ultrasonic sensor
- Distance-based control
- Sends values in cm (configure min/max in `PARAMS.js`)

## Setup

### 1. Arduino

1. Open `arduino/linear_potentiometer/linear_potentiometer.ino` in Arduino IDE
2. Upload to your board
3. The sketch must send data in the format `sensor_id:value` per line, for example:
   - `linear_pot:512` (potentiometer)
   - `ultrasonic:15` (ultrasonic distance in cm)

If you use the default sketch, change the `Serial.println()` line to:

```cpp
Serial.print("linear_pot:");
Serial.println(potValue);
```

### 2. Backend

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Configuration

Edit `backend/PARAMS.js` to match your sensors:

```js
const PARAMS = {
  linear_pot: { min: 0, max: 1024 },   // potentiometer ADC range
  ultrasonic: { min: 0, max: 30 },     // distance in cm
};
```

## Project structure

```
Arduino_Pong/
├── arduino/
│   └── linear_potentiometer/     # Arduino sketch
├── backend/
│   ├── server.js                 # HTTP + Socket.IO server
│   ├── serial.js                 # Arduino serial connection
│   ├── PARAMS.js                 # Sensor calibration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.js               # Game loop, sensor → paddle mapping
│   │   ├── components/
│   │   │   ├── player.js         # Paddle logic
│   │   │   ├── ball.js          # Ball physics
│   │   │   └── api.js           # Socket.IO client
│   │   └── utils.js
│   └── package.json
└── README.md
```

## Dependencies

- **Backend**: `serialport`, `socket.io`
- **Frontend**: `socket.io-client`, `vite`
