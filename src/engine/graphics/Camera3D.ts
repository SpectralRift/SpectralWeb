import { mat4, vec3 } from "gl-matrix";
import { ICamera } from "./ICamera";
import { Vector3 } from "../math/Vector3";
import { Vector2 } from "../math/Vector2";

class Camera3D implements ICamera {
    private projectionMatrix: mat4 = mat4.create();
    private viewMatrix: mat4 = mat4.create();

    public fov: number = 45.0;
    public nearClip: number = 0.1;
    public farClip: number = 2000.0;

    public position: Vector3;
    public rotation: Vector2;

    constructor() {
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector2(-90, 0);
    }

    getProjectionMatrix(): mat4 {
        return this.projectionMatrix;
    }

    getViewMatrix(): mat4 {
        return this.viewMatrix;
    }

    update(viewportSize: Vector2): void {
        mat4.perspective(
            this.projectionMatrix,
            (this.fov * Math.PI) / 180, // convert to radians
            viewportSize.x / viewportSize.y,
            this.nearClip,
            this.farClip
        );

        const front: vec3 = vec3.fromValues(
            Math.cos((this.rotation.x * Math.PI) / 180) * Math.cos((this.rotation.y * Math.PI) / 180),
            Math.sin((this.rotation.y * Math.PI) / 180),
            Math.sin((this.rotation.x * Math.PI) / 180) * Math.cos((this.rotation.y * Math.PI) / 180)
        );
        vec3.normalize(front, front);

        const right: vec3 = vec3.create();
        vec3.cross(right, front, [0, 1, 0]);
        vec3.normalize(right, right);

        const up: vec3 = vec3.create();
        vec3.cross(up, right, front);
        vec3.normalize(up, up);

        const positionVec: vec3 = vec3.fromValues(this.position.x, this.position.y, this.position.z);
        const targetVec: vec3 = vec3.create();
        vec3.add(targetVec, positionVec, front);

        mat4.lookAt(this.viewMatrix, positionVec, targetVec, up);
    }
};

export { Camera3D };