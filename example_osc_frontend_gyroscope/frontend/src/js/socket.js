import { io } from "socket.io-client";
import { EVENT_OSC } from "./events.js";

function createConnection(serverUrl, onMessage, onStatusChange) {
  const socket = io(serverUrl);

  socket.on("connect", () => onStatusChange(true));
  socket.on("disconnect", () => onStatusChange(false));
  socket.on(EVENT_OSC, onMessage);

  return socket;
}

export function connect(serverUrl, onMessage, onStatusChange) {
  createConnection(serverUrl, onMessage, onStatusChange);
}
