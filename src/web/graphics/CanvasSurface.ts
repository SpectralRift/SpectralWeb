import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderingSurface } from "../../engine/graphics/IRenderingSurface";
import { Vector2 } from "../../engine/math/Vector2";
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

    public getSize(): Vector2 {
        return new Vector2(this.canvas.width, this.canvas.height);
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