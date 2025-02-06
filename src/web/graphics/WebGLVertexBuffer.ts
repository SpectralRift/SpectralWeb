import { IVertexBuffer, BufferUsageHint } from "../../engine/graphics/IVertexBuffer";
import { PrimitiveType, Vertex } from "../../engine/graphics/Vertex";

// make sure we won't reference our class!
type NativeWebGLBuffer = globalThis.WebGLBuffer;

class WebGLVertexBuffer implements IVertexBuffer {
	private gl: WebGLRenderingContext;
	private primitiveType: PrimitiveType;
	private buffer: NativeWebGLBuffer;
	private bufferSize: number;

	private static lastBoundBuffer: NativeWebGLBuffer | null = null;

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
	}

	private mapPrimitiveType(type: PrimitiveType): number {
		switch (type) {
			case PrimitiveType.PRIMITIVE_TYPE_TRIANGLES:
				return this.gl.TRIANGLES;
			case PrimitiveType.PRIMITIVE_TYPE_POINTS:
				return this.gl.POINTS;
			case PrimitiveType.PRIMITIVE_TYPE_LINES:
				return this.gl.LINES;
			default:
				return -1;
		}
	}

	private mapUsageHint(hint: BufferUsageHint): number {
		switch (hint) {
			case BufferUsageHint.BUFFER_USAGE_HINT_STREAM:
				return this.gl.STREAM_DRAW;
			case BufferUsageHint.BUFFER_USAGE_HINT_STATIC:
				return this.gl.STATIC_DRAW;
			case BufferUsageHint.BUFFER_USAGE_HINT_DYNAMIC:
				return this.gl.DYNAMIC_DRAW;
			default:
				return -1;
		}
	}

	public create(): boolean {
		this.buffer = this.gl.createBuffer();
		return this.buffer !== undefined;
	}

	public destroy(): void {
		if (this.buffer !== undefined) {
			this.gl.deleteBuffer(this.buffer);
			this.buffer = null;
		}
	}

	public bind(): void {
		if (this.buffer !== undefined) {
			WebGLVertexBuffer.lastBoundBuffer = this.buffer;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		} else {
			console.warn("WebGLVertexBuffer (bind): No buffer created. Trying to create one...");
			if (!this.create()) {
				console.error("WebGLVertexBuffer (bind): Failed to create buffer.");
			} else {
				this.bind();
			}
		}
	}

	public unbind(): void {
		WebGLVertexBuffer.lastBoundBuffer = null;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	public draw(): void {
		if (WebGLVertexBuffer.lastBoundBuffer !== this.buffer) {
			this.bind();
		}

		this.gl.drawArrays(this.mapPrimitiveType(this.primitiveType), 0, this.bufferSize);
	}

	public upload(data: Vertex[], type: PrimitiveType, usage: BufferUsageHint): void {
		this.bufferSize = data.length;
		this.primitiveType = type;

		if (WebGLVertexBuffer.lastBoundBuffer !== this.buffer) {
			this.bind();
		}

		const vertexData = new Uint8Array(data.length * Vertex.SIZE_IN_BYTES);
		data.forEach((vertex, index) => {
			vertexData.set(vertex.toBuffer(), index * Vertex.SIZE_IN_BYTES);
		});

		this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexData, this.mapUsageHint(usage));

		var offset = 0;

		// position
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, Vertex.SIZE_IN_BYTES, offset);
		offset += 3 * Float32Array.BYTES_PER_ELEMENT;
		// uv
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, Vertex.SIZE_IN_BYTES, offset);
		offset += 2 * Float32Array.BYTES_PER_ELEMENT;
		// normal
		this.gl.enableVertexAttribArray(2);
		this.gl.vertexAttribPointer(2, 3, this.gl.FLOAT, false, Vertex.SIZE_IN_BYTES, offset);
		offset += 3 * Float32Array.BYTES_PER_ELEMENT;
		// color
		this.gl.enableVertexAttribArray(3);
		this.gl.vertexAttribPointer(3, 4, this.gl.UNSIGNED_BYTE, false, Vertex.SIZE_IN_BYTES, offset);
	}

	public size(): number {
		return this.bufferSize;
	}

	public getPrimitiveType(): PrimitiveType {
		return this.primitiveType;
	}
}

export { WebGLVertexBuffer };
