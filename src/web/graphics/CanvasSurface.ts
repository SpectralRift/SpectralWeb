import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderingSurface } from "../../engine/graphics/IRenderingSurface";
import { WebGLContext } from "./WebGLContext";

class CanvasSurface implements IRenderingSurface {
    private canvas: HTMLCanvasElement;
    private gContext: WebGLContext;

    constructor(canvas: HTMLCanvasElement) {
        if(canvas === null) {
            throw new Error("Canvas element is null");
        }

        this.canvas = canvas;
        this.gContext = new WebGLContext(this);
    }

    public getWidth(): number {
        return this.canvas.width;
    }

    public getHeight(): number {
        return this.canvas.height;
    }

    public getGContext(): IGraphicsContext {
        return this.gContext;
    }

    public getNativeSurface() : any {
        return this.canvas;
    }

    public isFocused() : boolean {
        return !document.hidden;
    }
}

export { CanvasSurface };