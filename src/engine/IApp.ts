import { IGraphicsContext } from "./graphics/IGraphicsContext";
import { IRenderer } from "./graphics/IRenderer";

interface IApp {
	onStart(renderer: IRenderer, context: IGraphicsContext): boolean;
	onShutdown(): void;
	onUpdate(deltaTime: number): void;
	onRender(deltaTime: number): void;
}

export { IApp };
