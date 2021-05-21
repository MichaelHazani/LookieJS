import { camera } from "./camera";
import { renderer } from "./renderer";
import State from "./state";
import Physics from "./physics/physics";

export function loadScene(scene) {
  // main app render loop
  const update = () => {
    requestAnimationFrame(update);
    // PHYSICS
    if (!State.isPaused) Physics.Update();
    renderer.render(scene, camera);

    // TRAVERSE UPDATE METHODS IN SCENE OBJECTS
    scene.traverse(obj => {
      typeof obj.Update === "function" ? obj.Update() : false;
    });
  };

  // DOM append
  document.querySelector(".app").appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  requestAnimationFrame(update);
}
