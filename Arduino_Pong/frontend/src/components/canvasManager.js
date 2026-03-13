export const canvasManager = () => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	function create() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);
	}

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return { ctx, create, resize };
};
