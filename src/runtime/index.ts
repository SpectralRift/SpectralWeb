import { RiftRunner } from "../engine/RiftRunner";
import { CanvasSurface } from "../web/graphics/CanvasSurface";
import { SimpleRenderer } from "../web/graphics/SimpleRenderer";
import { TestApp } from "./TestApp";

document.addEventListener('DOMContentLoaded', () => {
    RiftRunner.setSurface(new CanvasSurface(document.getElementById("renderCanvas") as HTMLCanvasElement));
    RiftRunner.setRenderer(new SimpleRenderer());
    RiftRunner.runApp(new TestApp());
});