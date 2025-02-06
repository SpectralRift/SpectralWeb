import { Colors } from "../../engine/graphics/Color";
import { ICamera } from "../../engine/graphics/ICamera";
import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderer } from "../../engine/graphics/IRenderer";
import { ShaderType } from "../../engine/graphics/IShader";
import { IShaderProgram } from "../../engine/graphics/IShaderProgram";
import { BufferUsageHint, IVertexBuffer } from "../../engine/graphics/IVertexBuffer";
import { PrimitiveType, Vertex } from "../../engine/graphics/Vertex";

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
	private renderShader: IShaderProgram;
	private uiRenderShader: IShaderProgram;
	private uiVertexBuffer: any;

	private meshQueue: any[] = [];
	private uiQueue: any[] = [];

	private isInFrame: boolean = false;

	private testVertexBuffer: IVertexBuffer;

	public init(ctx: IGraphicsContext): boolean {
		this.ctx = ctx;

		// load shaders
		console.info("SimpleRenderer (init): Loading shaders...");
        
		console.info("SimpleRenderer (init): Backend: " + this.ctx.getBackend().getIdentifier());

		if(ShaderList[this.ctx.getBackend().getIdentifier()] === undefined) {
			console.error("SimpleRenderer (init): No shaders found for backend: " + this.ctx.getBackend().getIdentifier());
			return false;
		}

        const {vertex, uiVertex, fragment} = ShaderList[this.ctx.getBackend().getIdentifier()];

		const vertexShader = this.ctx.getBackend().createShader();
		const fragmentShader = this.ctx.getBackend().createShader();
		const renderShaderProg = this.ctx.getBackend().createShaderProgram();

		if(vertexShader === null || fragmentShader === null || renderShaderProg === null) {
			console.error("SimpleRenderer (init): Failed to create shaders.");
			return false;
		}

		vertexShader.setSource(vertex, ShaderType.SHADER_TYPE_VERTEX);
		fragmentShader.setSource(fragment, ShaderType.SHADER_TYPE_FRAGMENT);

		if(!vertexShader.compile() || !fragmentShader.compile()) {
			console.error("SimpleRenderer (init): Failed to compile shaders.");
			console.error("SimpleRenderer (init): Vertex Shader Log: " + vertexShader.getCompileLog());
			console.error("SimpleRenderer (init): Fragment Shader Log: " + fragmentShader.getCompileLog());
			return false;
		}

		console.info("SimpleRenderer (init): 3D Shaders compiled successfully.");

		renderShaderProg.attachShader(vertexShader);
		renderShaderProg.attachShader(fragmentShader);

		if(!renderShaderProg.link()) {
			console.error("SimpleRenderer (init): Failed to link shader program.");
			console.error("SimpleRenderer (init): Shader Program Log: " + renderShaderProg.getLinkLog());
			return false;
		}

		console.info("SimpleRenderer (init): 3D Shaders linked successfully.");
		this.renderShader = renderShaderProg;

		this.testVertexBuffer = this.ctx.getBackend().createVertexBuffer();
		if(!this.testVertexBuffer.create()) {
			console.error("SimpleRenderer (init): Failed to create vertex buffer.");
			return false;
		}

		this.testVertexBuffer.upload([
			new Vertex(-0.5, -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Colors.green),
            new Vertex(0.5,  -0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Colors.red),
            new Vertex(0.0,  0.5,  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, Colors.blue)
		], PrimitiveType.PRIMITIVE_TYPE_TRIANGLES, BufferUsageHint.BUFFER_USAGE_HINT_STATIC);

		this.resetState();

		return true;
	}

	private resetState() : void {
		// clear queue
		this.meshQueue = [];
		this.uiQueue = [];

		this.isInFrame = false;
		this.currentCamera = null;
	}

	public shutdown(): void {

	}

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

		this.renderShader.bind();

		this.testVertexBuffer.bind();
		this.testVertexBuffer.draw();
		this.testVertexBuffer.unbind();

		this.renderShader.unbind();

		this.resetState();
	}

	public useCamera(camera: ICamera): void {
		this.currentCamera = camera;
	}
}

export { SimpleRenderer };
