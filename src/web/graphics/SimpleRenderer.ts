import { mat4 } from "gl-matrix";
import { ICamera } from "../../engine/graphics/ICamera";
import { IGraphicsContext } from "../../engine/graphics/IGraphicsContext";
import { IRenderer, RenderMeshItem } from "../../engine/graphics/IRenderer";
import { ShaderType } from "../../engine/graphics/IShader";
import { IShaderProgram } from "../../engine/graphics/IShaderProgram";
import { IVertexBuffer } from "../../engine/graphics/IVertexBuffer";
import { Vector3 } from "../../engine/math/Vector3";
import { Vector2 } from "../../engine/math/Vector2";


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

	private meshQueue: RenderMeshItem[] = [];

	private isInFrame: boolean = false;

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

		// create white pixel texture
		this.whitePixelTex = this.ctx.getBackend().createTexture();
		this.whitePixelTex.uploadPixelData(new Uint8Array(
			[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
		), new Vector2(1, 1));

		this.resetState();

		return true;
	}

	private resetState() : void {
		// clear queue
		this.meshQueue = [];
		// this.uiQueue = [];

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

		if(this.currentCamera !== null) {
			this.renderShader.bind();

			this.renderShader.setUniformNumber("sTexture", 0); // set texture sampler for GL
			this.renderShader.setUniformMat4("ufProjMatrix", this.currentCamera.getProjectionMatrix());
			this.renderShader.setUniformMat4("ufViewMatrix", this.currentCamera.getViewMatrix());

			this.meshQueue.forEach((mesh) => {
				this.renderShader.bind();

				// set model matrix
				const model = mat4.create();
				mat4.translate(model, model, [mesh.position.x, mesh.position.y, mesh.position.z]);
				mat4.rotate(model, model, (mesh.rotation.x * Math.PI) / 180, [1, 0, 0]);
				mat4.rotate(model, model, (mesh.rotation.y * Math.PI) / 180, [0, 1, 0]);
				mat4.rotate(model, model, (mesh.rotation.z * Math.PI) / 180, [0, 0, 1]);
				mat4.scale(model, model, [mesh.scale.x, mesh.scale.y, mesh.scale.z]);
				this.renderShader.setUniformMat4("ufModelMatrix", model);

				mesh.buffer.bind();
				mesh.texture.bind(0);

				mesh.buffer.draw();

				mesh.buffer.unbind();
				mesh.texture.unbind();
			});

			this.renderShader.unbind();
		} else {
			console.warn("SimpleRenderer (endFrame): No camera set. Cannot render 3D.");
		}

		this.resetState();
	}

	public queueMesh(buffer: IVertexBuffer, texture?: any, position?: Vector3, scale?: Vector3, rotation?: Vector3): void {
		this.meshQueue.push(new RenderMeshItem(
			buffer,
			texture || this.whitePixelTex,
			position || new Vector3(0, 0, 0),
			scale || new Vector3(1, 1, 1),
			rotation || new Vector3(0, 0, 0)
		));
	}

	public useCamera(camera: ICamera): void {
		this.currentCamera = camera;
	}
}

export { SimpleRenderer };
