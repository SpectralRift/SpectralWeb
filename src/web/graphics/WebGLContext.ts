import { IGraphicalBackend } from "../../engine/graphics/IGraphicalBackend";
import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderingSurface } from "../../engine/graphics/IRenderingSurface";
import { WebGLBackend } from "./WebGLBackend";

class WebGLContext implements IGraphicsContext {
    private parentSurface: IRenderingSurface;
    private backend: WebGLBackend;

    constructor(parentSurface: IRenderingSurface) {
        this.parentSurface = parentSurface;
        this.backend = new WebGLBackend(parentSurface.getNativeSurface().getContext('webgl') as WebGLRenderingContext);
    }

    public getBackend(): IGraphicalBackend {
        return this.backend;
    }

    public getOwnerSurface(): IRenderingSurface {
        return this.parentSurface;
    }
}

export {WebGLContext};