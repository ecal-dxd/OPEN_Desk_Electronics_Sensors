import { createScene, createCamera, createRenderer } from "./js/scene.js";
import { addLights } from "./js/lights.js";
import { loadPhoneModel } from "./js/model.js";
import { createOrientationState } from "./js/orientation.js";
import { connect } from "./js/socket.js";
import { createHud } from "./js/hud.js";
import { SERVER_URL } from "./config.js";

function main() {
	const scene = createScene();
	const camera = createCamera(window.innerWidth / window.innerHeight);
	const renderer = createRenderer();

	addLights(scene);
	const model = loadPhoneModel(scene);

	const orientation = createOrientationState();
	const hud = createHud();

	function handleOscMessage(data) {
		orientation.applyOscMessage(data);
		if (data.address === "/gyrosc/quat") {
			hud.updateValues(data.x, data.y, data.z, 3);
		} else if (data.address === "/gyrosc/gyro") {
			hud.updateValues(data.x, data.y, data.z, 4);
		}
	}

	connect(SERVER_URL, handleOscMessage, hud.setConnected);

	function animate() {
		requestAnimationFrame(animate);
		model.quaternion.slerp(
			orientation.getTargetQuat(),
			orientation.getLerpFactor(),
		);
		renderer.render(scene, camera);
	}

	animate();

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}

main();
