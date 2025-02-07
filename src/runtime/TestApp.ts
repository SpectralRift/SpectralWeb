import { IRenderer } from "../engine/graphics/IRenderer";
import { IApp } from "../engine/IApp";
import { Colors } from "../engine/graphics/Color";
import { BufferUsageHint, IVertexBuffer } from "../engine/graphics/IVertexBuffer";
import { PrimitiveType, Vertex } from "../engine/graphics/Vertex";
import { IGraphicsContext } from "../engine/graphics/IGraphicsContext";
import { Camera3D } from "../engine/graphics/Camera3D";
import { Vector3 } from "../engine/math/Vector3";
import { ITexture } from "../engine/graphics/ITexture";
import { Vector2 } from "../engine/math/Vector2";

const logoUrl = require("../../assets/SpectralRift.png");

class TestApp implements IApp {
	private renderer: IRenderer;
	private context: IGraphicsContext;
	private triangleBuffer: IVertexBuffer;
	private riftTexture: ITexture;

	private camera: Camera3D;
	private rotationAngle: number = 0;

	public async imageUrlToPixelData(url: string): Promise<any> {
		return new Promise((r: any) => {
			const image = new Image();
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			image.onload = function () {
				canvas.width = image.width;
				canvas.height = image.height;
				context.drawImage(image, 0, 0);

				r({
					data: context.getImageData(0, 0, image.width, image.height).data,
					width: image.width,
					height: image.height,
				});
			};

			image.src = url;
		});
	}

	onStart(renderer: IRenderer, context: IGraphicsContext): boolean {
		this.renderer = renderer;
		this.context = context;

		this.triangleBuffer = this.context.getBackend().createVertexBuffer();

		if (!this.triangleBuffer.create()) {
			console.error("TestApp (onStart): Failed to create vertex buffer.");
			return false;
		}

		this.triangleBuffer.upload(
			[
				// Front face
				new Vertex(-0.5, -0.5, 0.5, 0, 0, 0, 0, 0, Colors.red),
				new Vertex(0.5, -0.5, 0.5, 1, 0, 0, 0, 0, Colors.green),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(-0.5, -0.5, 0.5, 0, 0, 0, 0, 0, Colors.red),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(-0.5, 0.5, 0.5, 0, 1, 0, 0, 0, Colors.yellow),

				// Back face
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.cyan),
				new Vertex(0.5, -0.5, -0.5, 1, 0, 0, 0, 0, Colors.magenta),
				new Vertex(0.5, 0.5, -0.5, 1, 1, 0, 0, 0, Colors.orange),
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.cyan),
				new Vertex(0.5, 0.5, -0.5, 1, 1, 0, 0, 0, Colors.orange),
				new Vertex(-0.5, 0.5, -0.5, 0, 1, 0, 0, 0, Colors.white),

				// Left face
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.cyan),
				new Vertex(-0.5, -0.5, 0.5, 1, 0, 0, 0, 0, Colors.red),
				new Vertex(-0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.yellow),
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.cyan),
				new Vertex(-0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.yellow),
				new Vertex(-0.5, 0.5, -0.5, 0, 1, 0, 0, 0, Colors.white),

				// Right face
				new Vertex(0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.magenta),
				new Vertex(0.5, -0.5, 0.5, 1, 0, 0, 0, 0, Colors.green),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.magenta),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(0.5, 0.5, -0.5, 0, 1, 0, 0, 0, Colors.orange),

				// Bottom face
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.white),
				new Vertex(0.5, -0.5, -0.5, 1, 0, 0, 0, 0, Colors.magenta),
				new Vertex(0.5, -0.5, 0.5, 1, 1, 0, 0, 0, Colors.green),
				new Vertex(-0.5, -0.5, -0.5, 0, 0, 0, 0, 0, Colors.white),
				new Vertex(0.5, -0.5, 0.5, 1, 1, 0, 0, 0, Colors.green),
				new Vertex(-0.5, -0.5, 0.5, 0, 1, 0, 0, 0, Colors.red),

				// Top face
				new Vertex(-0.5, 0.5, -0.5, 0, 0, 0, 0, 0, Colors.white),
				new Vertex(0.5, 0.5, -0.5, 1, 0, 0, 0, 0, Colors.orange),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(-0.5, 0.5, -0.5, 0, 0, 0, 0, 0, Colors.white),
				new Vertex(0.5, 0.5, 0.5, 1, 1, 0, 0, 0, Colors.blue),
				new Vertex(-0.5, 0.5, 0.5, 0, 1, 0, 0, 0, Colors.yellow),
			],
			PrimitiveType.PRIMITIVE_TYPE_TRIANGLES,
			BufferUsageHint.BUFFER_USAGE_HINT_STATIC
		);

		this.imageUrlToPixelData(logoUrl).then((img: any) => {
			this.riftTexture = this.context.getBackend().createTexture();
			this.riftTexture.uploadPixelData(img.data, new Vector2(img.width, img.height));
		});

		this.camera = new Camera3D();

		this.camera.position.z = 5;

		return true;
	}

	onShutdown(): void {
		this.triangleBuffer.destroy();
	}

	onUpdate(deltaTime: number): void {
		document.getElementById("fps").innerText = (1000 / deltaTime).toFixed(0);
		this.camera.update(this.context.getOwnerSurface().getSize());
		this.rotationAngle += deltaTime * 0.1;
	}

	onRender(deltaTime: number): void {
		// specify camera to the renderer, otherwise it won't render anything
		this.renderer.useCamera(this.camera);

		// render triangle
		this.renderer.queueMesh(this.triangleBuffer, this.riftTexture, new Vector3(0, 0, 0), new Vector3(1, 1, 1), new Vector3(this.rotationAngle, this.rotationAngle, 0));
	}
}

export { TestApp };
