import * as THREE from "three";

export function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(3, 4, 5);
  scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0x8888ff, 0.4);
  backLight.position.set(-3, -2, -4);
  scene.add(backLight);
}
