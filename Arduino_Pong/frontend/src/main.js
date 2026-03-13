import "./style.css";

import { api } from "./components/api";
import { canvasManager } from "./components/canvasManager";
import { player } from "./components/player";
import { ball } from "./components/ball";

const main = () => {
	const ApiManager = api();
	const CanvasManager = canvasManager();
	const ctx = CanvasManager.ctx;
	const PlayerOne = player({ x: 20, y: 20, id: "1", ctx });
	const PlayerTwo = player({ x: window.innerWidth - 40, y: 20, id: "2", ctx });
	const Ball = ball({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
		ctx,
	});

	function init() {
		startEventListeners();
		CanvasManager.create();
		PlayerOne.init();
		PlayerTwo.init();
		loop();
	}

	function startEventListeners() {
		ApiManager.on("arduino", onDataHandler);
		window.addEventListener("ballReset", onBallReset);
	}

	function onBallReset(event) {
		console.log("Ball reset:", event.detail);
	}

	function onDataHandler(data) {
		if (data.id === "linear_pot") {
			PlayerOne.update(data.value);
		}
		if (data.id === "ultrasonic") {
			PlayerTwo.update(data.value);
		}
	}

	function loop() {
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		Ball.update([PlayerOne, PlayerTwo]);
		PlayerOne.draw();
		PlayerTwo.draw();
		Ball.draw();
		requestAnimationFrame(loop);
	}

	init();
};

main();
