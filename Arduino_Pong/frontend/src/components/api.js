import { io } from "socket.io-client";

export const api = () => {
	const socket = io("http://localhost:3000");

	return {
		send: (data) => {
			socket.emit(url, data);
		},
		on: (event, callback) => {
			socket.on(event, callback);
		},
		off: (event) => {
			socket.off(event);
		},
	};
};
