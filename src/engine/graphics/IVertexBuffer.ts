import { PrimitiveType, Vertex } from "./Vertex";

const enum BufferUsageHint {
	BUFFER_USAGE_HINT_UNKNOWN,
	BUFFER_USAGE_HINT_STREAM,
	BUFFER_USAGE_HINT_STATIC,
	BUFFER_USAGE_HINT_DYNAMIC,
}

interface IVertexBuffer {
	create(): boolean;

	destroy(): void;

	bind(): void;

	unbind(): void;

	draw(): void;

	upload(data: Vertex[], type: PrimitiveType, usage: BufferUsageHint): void;

	size(): number;

	getPrimitiveType(): PrimitiveType;
}

export { IVertexBuffer, BufferUsageHint };
