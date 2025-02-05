import { ICamera } from "../../engine/graphics/ICamera";
import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderer } from "../../engine/graphics/IRenderer";

const ShaderList = {
	webgl: {
		vertex: require("./shaders/webgl/Vertex3D.glsl"),
		uiVertex: require("./shaders/webgl/Vertex2D.glsl"),
		fragment: require("./shaders/webgl/Fragment3D.glsl"),
	},
} as any;

class SimpleRenderer implements IRenderer {
	private ctx: IGraphicsContext;

	private currentCamera: ICamera | null = null;
	private whitePixelTex: any;
	private renderShader: any;
	private uiRenderShader: any;
	private uiVertexBuffer: any;

	private meshQueue: any[] = [];
	private uiQueue: any[] = [];

	private isInFrame: boolean = false;

	public init(ctx: IGraphicsContext): boolean {
		this.ctx = ctx;

		// load shaders
		console.info("SimpleRenderer (init): Loading shaders...");
        
		console.info("SimpleRenderer (init): Backend: " + this.ctx.getBackend().getIdentifier());
        console.log(ShaderList[this.ctx.getBackend().getIdentifier()]);
        
		// reset state
		this.meshQueue = [];
		this.uiQueue = [];

		this.isInFrame = false;
		this.currentCamera = null;

		return true;
	}

	public shutdown(): void {}

	public beginFrame(): void {
		if (this.isInFrame) {
			console.warn("SimpleRenderer (beginFrame): Already in frame. Call endFrame() first.");
			return;
		}

		this.isInFrame = true;
	}

	public endFrame(): void {
		if (!this.isInFrame) {
			console.warn("SimpleRenderer (endFrame): Not in frame. Call beginFrame() first.");
			return;
		}

		// clear queue
		this.meshQueue = [];
		this.uiQueue = [];

		this.isInFrame = false;
		this.currentCamera = null;
	}

	public useCamera(camera: ICamera): void {
		this.currentCamera = camera;
	}
}

export { SimpleRenderer };
