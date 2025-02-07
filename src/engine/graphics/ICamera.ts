import { mat4 } from "gl-matrix";
import { Vector2 } from "../math/Vector2";

interface ICamera {
	getProjectionMatrix(): mat4;
	getViewMatrix(): mat4;

	update(viewportSize: Vector2): void;
}

export { ICamera };
