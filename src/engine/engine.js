import { Vector3 } from "three";
import { LKGcamera, GLcamera } from "./camera";
import { LKGRenderer, GLRenderer } from "./renderer";
import State from "./state";
import EngineEditorCamera from "./util/cameracontrols/engineeditorcamera";
export function loadScene(scene) {
  State.renderingLKG = false;

  scene.add(new EngineEditorCamera(GLcamera, GLRenderer.domElement));

  let selectedRenderer = GLRenderer;
  let selectedCamera = GLcamera;

  // main app render loop
  const update = () => {
    requestAnimationFrame(update);
    selectedRenderer.render(scene, selectedCamera);

    // TRAVERSE UPDATE METHODS IN SCENE OBJECTS
    scene.traverse(obj => {
      typeof obj.Update === "function" ? obj.Update() : false;
    });
  };

  // DOM append
  document.querySelector(".app").appendChild(selectedRenderer.domElement);

  window.addEventListener("keydown", e => {
    if (e.key == "`") {
      toggleLKG();
    }
  });

  requestAnimationFrame(update);

  const toggleLKG = () => {
    const childs = document.querySelector(".app").childNodes;
    document.querySelector(".app").removeChild(childs[0]);

    if (State.renderingLKG) {
      selectedCamera = GLcamera;
      selectedRenderer = GLRenderer;
      toggleFullscreen(false);
      console.log("switching to ThreeJS Renderer");
    } else {
      selectedCamera = LKGcamera;
      selectedRenderer = LKGRenderer;
      toggleFullscreen(true);
      console.log("switching to LKG Renderer");
    }
    State.renderingLKG = !State.renderingLKG;
    document.querySelector(".app").appendChild(selectedRenderer.domElement);
  };

  const toggleFullscreen = shouldFullScreen => {
    const r = document.querySelector(".app");

    if (shouldFullScreen) {
      // Get your full screen element
      const rfs =
        r.requestFullscreen ||
        r.webkitRequestFullScreen ||
        r.mozRequestFullScreen ||
        r.msRequestFullscreen;
      rfs.call(r);
    } else {
      document.exitFullscreen();
    }
  };

  window.addEventListener("resize", () => {
    if (State.renderingLKG) return;
    selectedCamera.aspect = window.innerWidth / window.innerHeight;
    selectedCamera.updateProjectionMatrix();
    selectedRenderer.setSize(window.innerWidth, window.innerHeight);
  });
}
