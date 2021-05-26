import { LKGcamera } from "./camera";
import { LKGRenderer } from "./renderer";
import State from "./state";
import EngineEditorCamera from "./util/cameracontrols/engineeditorcamera";
export function loadScene(scene) {
  State.renderingLKG = false;

  scene.add(new EngineEditorCamera(LKGcamera, LKGRenderer.domElement));
  LKGRenderer.render2d = true;

  // main app render loop
  const update = () => {
    requestAnimationFrame(update);
    LKGRenderer.render(scene, LKGcamera);

    // TRAVERSE UPDATE METHODS IN SCENE OBJECTS
    scene.traverse(obj => {
      typeof obj.Update === "function" ? obj.Update() : false;
    });
  };

  // DOM append
  document.querySelector(".app").appendChild(LKGRenderer.domElement);

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
      LKGRenderer.render2d = true;
      toggleFullscreen(false);
      console.log("switching to ThreeJS Renderer");
    } else {
      LKGRenderer.render2d = false;
      toggleFullscreen(true);
      console.log("switching to LKG Renderer");
    }
    State.renderingLKG = !State.renderingLKG;
    document.querySelector(".app").appendChild(LKGRenderer.domElement);
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
    LKGcamera.aspect = window.innerWidth / window.innerHeight;
    LKGcamera.updateProjectionMatrix();
  });
}
