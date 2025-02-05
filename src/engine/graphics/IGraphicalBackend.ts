import { Color } from "./Color";

interface IGraphicalBackend {
    getName(): string;
    getIdentifier(): string;

    setViewport(x: number, y: number, width: number, height: number) : void;
    setScissor(x: number, y: number, width: number, height: number) : void;

    clear(color: Color) : void;

    // createVertexBuffer() : IVertexBuffer;
    // createShader() : IShader;
    // createShaderProgram(): IShaderProgram;
    // createTexture() : ITexture;
}

export { IGraphicalBackend };