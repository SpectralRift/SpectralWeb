import { Vector2 } from "../math/Vector2";
import { IGraphicsContext } from "./IGraphicsContext";

interface IRenderingSurface {
    getGContext(): IGraphicsContext;
    getNativeSurface(): any;

    getSize(): Vector2;

    isFocused(): boolean;
}

export { IRenderingSurface };