import { Color } from "../../engine/graphics/Color";
import { IGraphicalBackend } from "../../engine/graphics/IGraphicalBackend";

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
}

export {WebGLBackend};