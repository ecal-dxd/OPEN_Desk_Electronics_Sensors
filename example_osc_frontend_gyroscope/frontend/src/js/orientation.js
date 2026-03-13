import * as THREE from "three";

const LERP = 0.1;

const qZupToYup = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
const qScreenFacing = new THREE.Quaternion(0, 1, 0, 0);
const qDeviceToScene = new THREE.Quaternion().copy(qScreenFacing).multiply(qZupToYup);

export function createOrientationState() {
  const targetQuat = new THREE.Quaternion();

  function applyQuat(x, y, z, w) {
    const q = new THREE.Quaternion(x, y, z, w);
    targetQuat.copy(qDeviceToScene).multiply(q);
  }

  function applyEuler(x, y, z) {
    const euler = new THREE.Euler(x, y, z, "YXZ");
    const q = new THREE.Quaternion().setFromEuler(euler);
    targetQuat.copy(qDeviceToScene).multiply(q);
  }

  function applyOscMessage(data) {
    if (data.address === "/gyrosc/quat") {
      applyQuat(data.x, data.y, data.z, data.w);
    } else if (data.address === "/gyrosc/gyro") {
      applyEuler(data.x, data.y, data.z);
    }
  }

  function getTargetQuat() {
    return targetQuat;
  }

  function getLerpFactor() {
    return LERP;
  }

  return { applyOscMessage, getTargetQuat, getLerpFactor };
}
