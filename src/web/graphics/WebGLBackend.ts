import { Color } from "../../engine/graphics/Color";
import { IGraphicalBackend } from "../../engine/graphics/IGraphicalBackend";
import { IShader } from "../../engine/graphics/IShader";
import { IShaderProgram } from "../../engine/graphics/IShaderProgram";
import { ITexture } from "../../engine/graphics/ITexture";
import { IVertexBuffer } from "../../engine/graphics/IVertexBuffer";
import { Vector2 } from "../../engine/math/Vector2";

import { WebGLShader } from "./WebGLShader";
import { WebGLShaderProgram } from "./WebGLShaderProgram";
import { WebGLTexture } from "./WebGLTexture";
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

    public setViewport(pos: Vector2, size: Vector2) : void {
        this.glContext.viewport(pos.x, pos.y, size.x, size.y);
    }

    public setScissor(pos: Vector2, size: Vector2) : void {
        this.glContext.enable(this.glContext.SCISSOR_TEST); 
        this.glContext.scissor(pos.x, pos.y, size.x, size.y);
    }

    public clear(color: Color) : void {
        this.glContext.clearColor(color.r, color.g, color.b, color.a);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT);
        this.glContext.enable(this.glContext.DEPTH_TEST);
    }

    public createVertexBuffer() : IVertexBuffer {
        return new WebGLVertexBuffer(this.glContext);
    }

    public createTexture(): ITexture {
        return new WebGLTexture(this.glContext);
    }

    public createShader() : IShader {
        return new WebGLShader(this.glContext);
    }

    public createShaderProgram(): IShaderProgram {
        return new WebGLShaderProgram(this.glContext);
    }
}

export {WebGLBackend};