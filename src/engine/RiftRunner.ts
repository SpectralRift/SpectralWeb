import { Colors } from "./graphics/Color";
import { IRenderer } from "./graphics/IRenderer";
import { IRenderingSurface } from "./graphics/IRenderingSurface";
import { IApp } from "./IApp";

class RiftRunner {
	private static isRunning: boolean;
	private static animFrameId: number;
	private static isFirstFrame: boolean;
	private static lastFrameTimestamp: number;
    
    private static renderer: IRenderer;
	private static surface: IRenderingSurface;

	private static app: IApp;

	public static setSurface(surface: IRenderingSurface) {
		this.surface = surface;
	}

    public static getSurface(): IRenderingSurface {
        return this.surface;
    }

    public static setRenderer(renderer: IRenderer) {
		this.renderer = renderer;
	}

    public static getRenderer(): IRenderer {
        return this.renderer;
    }

	public static runApp(app: IApp) {
		if (this.isRunning) {
			console.error("RiftRunner (runApp): Already running.");
			return;
		}

		if (app === undefined) {
			console.error("RiftRunner (runApp): No app instance provided.");
			return;
		}

		if (this.surface === undefined) {
			console.error("RiftRunner (runApp): No surface set. Call setSurface() first.");
			return;
		}

        if (this.renderer === undefined) {
			console.error("RiftRunner (runApp): No renderer set. Call setRenderer() first.");
			return;
		}

		console.info("RiftRunner (runApp): Beginning runner loop.");

        if(!this.renderer.init(this.surface.getGContext())) {
            console.error("RiftRunner (runApp): Renderer failed to initialize.");
            return;
        }

		this.isFirstFrame = true;
        this.isRunning = true;
		this.app = app;

		if (!this.app.onStart(this.renderer, this.surface.getGContext())) {
			console.error("RiftRunner (runApp): App failed to start.");
			return;
		}

		this.animFrameId = requestAnimationFrame(this.onFrame.bind(this));
	}

	public static shutdown() {
        if (!this.isRunning) {
            console.error("RiftRunner (shutdown): Not running.");
            return;
        }

        console.info("RiftRunner (shutdown): Shutting down runner loop.");

		this.app.onShutdown();
        this.isRunning = false;

        cancelAnimationFrame(this.animFrameId);
        this.lastFrameTimestamp = 0;
    }

	private static onFrame(timestamp: number) {
		if (this.isFirstFrame) {
			console.info("RiftRunner (onFrame): First Frame at " + timestamp);
			this.isFirstFrame = false;
		} else {
            var delta = timestamp - this.lastFrameTimestamp;

            // render only if the surface is focused and the engine is running;
            if(this.isRunning && this.surface.isFocused()) {
                this.surface.getGContext().getBackend().clear(Colors.black);

				this.app.onUpdate(delta);

                // use the renderer to render stuff on the screen
                if(this.renderer) {
                    this.renderer.beginFrame();
					this.app.onRender(delta);
                    this.renderer.endFrame();
                }
            }
		}

        this.lastFrameTimestamp = timestamp;

		if (this.isRunning) {
			this.animFrameId = requestAnimationFrame(this.onFrame.bind(this));
		}
	}
}

export { RiftRunner };
