import { lerp } from "../utils";

export const player = ({ id, x, y, ctx }) => {
	const margin = 20;
	x = x || margin;
	let targetY = y;
	y = y || margin;
	let width = 30;
	let height = window.innerHeight * 0.3;

	function init() {
		console.log("player initialized");
	}

	function update(yValue) {
		targetY = yValue * ctx.canvas.height;
		console.log(y);

		if (targetY < margin) {
			targetY = margin;
		}
		if (targetY + height > ctx.canvas.height - margin) {
			targetY = ctx.canvas.height - height - margin;
		}
	}
	function draw() {
		ctx.save();
		y = lerp(y, targetY, 0.1);
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, width, height);
		ctx.restore();
	}

	function getBounds() {
		return { x, y, width, height };
	}

	return { init, update, draw, getBounds };
};
