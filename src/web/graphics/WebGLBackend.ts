import { Color } from "../../engine/graphics/Color";
import { IGraphicalBackend } from "../../engine/graphics/IGraphicalBackend";
import { IShader } from "../../engine/graphics/IShader";
import { IShaderProgram } from "../../engine/graphics/IShaderProgram";
import { IVertexBuffer } from "../../engine/graphics/IVertexBuffer";

import { WebGLShader } from "./WebGLShader";
import { WebGLShaderProgram } from "./WebGLShaderProgram";
import { WebGLVertexBuffer } from "./WebGLVertexBuffer";

class WebGLBackend implements IGraphicalBackend {
    private glContext: WebGLRenderingContext

    constructor(ctx: WebGLRenderingContext) {
        this.glContext = ctx;
    }

    public getName(): string {
        return "WebGL";
    }

    public getIdentifier(): string {
        return "webgl";
    }

    public setViewport(x: number, y: number, width: number, height: number) : void {
        this.glContext.viewport(x, y, width, height);
    }

    public setScissor(x: number, y: number, width: number, height: number) : void {
        this.glContext.enable(this.glContext.SCISSOR_TEST); 
        this.glContext.scissor(x, y, width, height);
    }

    public clear(color: Color) : void {
        this.glContext.clearColor(color.r, color.g, color.b, color.a);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
    }

    public createVertexBuffer() : IVertexBuffer {
        return new WebGLVertexBuffer(this.glContext);
    }

    public createShader() : IShader {
        return new WebGLShader(this.glContext);
    }

    public createShaderProgram(): IShaderProgram {
        return new WebGLShaderProgram(this.glContext);
    }
}

export {WebGLBackend};