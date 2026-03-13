import * as THREE from "three";

export function createScene() {
  return new THREE.Scene();
}

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
  camera.position.z = 5;
  return camera;
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x111111);
  document.body.appendChild(renderer.domElement);
  return renderer;
}
