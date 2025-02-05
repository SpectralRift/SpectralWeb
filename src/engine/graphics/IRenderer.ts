import { ICamera } from "./ICamera";
import { IGraphicsContext } from "./IGraphicsContext";

interface IRenderer {
    init(ctx: IGraphicsContext): boolean;
    shutdown(): void;

    beginFrame(): void;
    endFrame(): void;

    useCamera(camera: ICamera): void;
}

export { IRenderer };