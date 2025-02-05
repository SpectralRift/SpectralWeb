import { IGraphicalBackend } from "./IGraphicalBackend";
import { IRenderingSurface } from "./IRenderingSurface";

interface IGraphicsContext {
    getBackend(): IGraphicalBackend;
    getOwnerSurface(): IRenderingSurface;
}

export { IGraphicsContext };