import { Camera as LKGCamera } from "./vendor/holoplay/lib/holoplay.module";
import { PerspectiveCamera } from "three";
export const LKGcamera = new LKGCamera();

export const GLcamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
