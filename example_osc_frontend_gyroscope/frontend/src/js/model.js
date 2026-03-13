import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const ASSETS_PATH = "/assets/";
const MODEL_SCALE = 3;

function centerAndScale(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = MODEL_SCALE / maxDim;
  obj.scale.setScalar(scale);
  obj.position.copy(center.multiplyScalar(-scale));
}

export function loadPhoneModel(scene) {
  const model = new THREE.Group();
  scene.add(model);

  const mtlLoader = new MTLLoader();
  mtlLoader.setPath(ASSETS_PATH);
  mtlLoader.load("iphone.mtl", (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(ASSETS_PATH);
    objLoader.load("iphone.obj", (obj) => {
      centerAndScale(obj);
      model.add(obj);
    });
  });

  return model;
}
