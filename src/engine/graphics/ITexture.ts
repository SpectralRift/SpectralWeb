import { Vector2 } from "../math/Vector2";

interface ITexture {
	uploadPixelData(data: ArrayBufferView, size: Vector2): boolean;
    destroy(): void;
    getSize(): Vector2;

    bind(samplerSlot: number): void;
    unbind(): void;
}

export { ITexture };
