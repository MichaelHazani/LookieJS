import { Renderer } from "./vendor/holoplay/lib/holoplay.module";
import { WebGLRenderer } from "three";

export const LKGRenderer = new Renderer();
export const GLRenderer = new WebGLRenderer();

GLRenderer.setPixelRatio(window.devicePixelRatio);
GLRenderer.setSize(window.innerWidth, window.innerHeight);
GLRenderer.setClearColor(0x000000, 0.0);
