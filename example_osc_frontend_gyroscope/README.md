# Gyroscope OSC

Two separate projects: server (OSC + Socket.IO) and frontend (Three.js).

## Server

```bash
cd server
npm install
npm start
```

- Socket.IO on port 3000
- OSC UDP on port 9000

## Frontend

```bash
cd frontend
npm install
npm run dev
```

- Vite dev server on port 5173
- Connects to `http://localhost:3000` (override with `VITE_SERVER_URL`)
