import { Vector3 } from "../math/Vector3";
import { ICamera } from "./ICamera";
import { IGraphicsContext } from "./IGraphicsContext";
import { IVertexBuffer } from "./IVertexBuffer";

class RenderMeshItem {
    public buffer: IVertexBuffer;
    public texture: any;
    public position: Vector3;
    public scale: Vector3;
    public rotation: Vector3;

    constructor(buffer: IVertexBuffer, texture: any, position: Vector3, scale: Vector3, rotation: Vector3) {
        this.buffer = buffer;
        this.texture = texture;
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
    }
};

interface IRenderer {
    init(ctx: IGraphicsContext): boolean;
    shutdown(): void;

    beginFrame(): void;
    endFrame(): void;

    queueMesh(buffer: IVertexBuffer, texture?: any, position?: Vector3, scale?: Vector3, rotation?: Vector3): void;

    useCamera(camera: ICamera): void;
}

export { IRenderer, RenderMeshItem };