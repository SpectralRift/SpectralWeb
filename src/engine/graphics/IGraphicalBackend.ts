import { Vector2 } from "../math/Vector2";
import { Color } from "./Color";
import { IShader } from "./IShader";
import { IShaderProgram } from "./IShaderProgram";
import { ITexture } from "./ITexture";
import { IVertexBuffer } from "./IVertexBuffer";

interface IGraphicalBackend {
    getName(): string;
    getIdentifier(): string;

    setViewport(pos: Vector2, size: Vector2) : void;
    setScissor(pos: Vector2, size: Vector2) : void;

    clear(color: Color) : void;

    createVertexBuffer() : IVertexBuffer;
    createShader() : IShader;
    createShaderProgram(): IShaderProgram;
    createTexture() : ITexture;
}

export { IGraphicalBackend };