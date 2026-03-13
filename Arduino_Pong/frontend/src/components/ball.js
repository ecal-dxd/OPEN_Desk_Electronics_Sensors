import { eventEmitter } from "../utils";

export const ball = ({ x, y, ctx }) => {
	const radius = 20;
	const margin = 20;
	let dx = 4;
	let dy = 4;

	function update(players) {
		x += dx;
		y += dy;

		const canvasW = ctx.canvas.width;
		const canvasH = ctx.canvas.height;

		if (y - radius <= margin || y + radius >= canvasH - margin) {
			dy *= -1;
		}

		for (const p of players) {
			const bounds = p.getBounds();
			if (
				x - radius <= bounds.x + bounds.width &&
				x + radius >= bounds.x &&
				y >= bounds.y &&
				y <= bounds.y + bounds.height
			) {
				dx *= -1;
				break;
			}
		}

		if (x - radius <= margin || x + radius >= canvasW - margin) {
			reset();
		}
	}

	function reset() {
		x = ctx.canvas.width / 2;
		y = ctx.canvas.height / 2;
		dx = 4 * (Math.random() > 0.5 ? 1 : -1);
		dy = 4 * (Math.random() > 0.5 ? 1 : -1);
		eventEmitter("ballReset", { x, y });
	}

	function draw() {
		ctx.save();
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	return { update, draw, reset };
};
