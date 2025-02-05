import { IGraphicsContext } from "./IGraphicsContext";

interface IRenderingSurface {
    getGContext(): IGraphicsContext;
    getNativeSurface(): any;

    getWidth(): number;
    getHeight(): number;

    isFocused(): boolean;
}

export { IRenderingSurface };