export const lerp = (a, b, t) => {
	return a + (b - a) * t;
};

export const eventEmitter = (event, data) => {
	window.dispatchEvent(new CustomEvent(event, { detail: data }));
};
