// default scene loaded in src/engine/engine.js

import {
  Scene,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  Group,
  AmbientLight,
} from "three";

import { camera } from "../engine/camera";

const scene = new Scene();

const boxMat = new MeshStandardMaterial({ color: 0xff00ff, roughness: 0.5 });
const boxGeo = new BoxGeometry(0.12, 0.12, 0.12);
const boxMesh = new Mesh(boxGeo, boxMat);

const bArr = new Group();
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      const b = boxMesh.clone();
      const bm = new MeshStandardMaterial({
        color: `rgb(${(i + 1) * 51},${(j + 1) * 51},${(k + 1) * 51})`,
        roughness: 0,
      });
      b.material = bm;
      b.position.set(0.3 - i / 5, 0.3 - j / 5, 0.3 - k / 5);
      b.Update = () => {
        b.rotation.y += 0.0025 * (i + j + k);
      };
      bArr.add(b);
    }
  }
}
scene.add(bArr);
bArr.position.set(0, 0.5, -20);

const light = new DirectionalLight(0xffffff, 1);
light.position.set(0, 13, 3);
scene.add(light);

const ambLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

export { scene };
