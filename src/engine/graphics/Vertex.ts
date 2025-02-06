import { Color } from "./Color";

const enum PrimitiveType {
    PRIMITIVE_TYPE_UNKNOWN,
    PRIMITIVE_TYPE_TRIANGLES,
    PRIMITIVE_TYPE_POINTS,
    PRIMITIVE_TYPE_LINES
};

class Vertex {
    public posX: number;
    public posY: number;
    public posZ: number;
    public uvX: number;
    public uvY: number;
    public normalX: number;
    public normalY: number;
    public normalZ: number;
    public color: Color;

    public static readonly SIZE_IN_BYTES = ((8 * Float32Array.BYTES_PER_ELEMENT) + 4);

    constructor(posX: number, posY: number, posZ: number, uvX: number, uvY: number, normalX: number, normalY: number, normalZ: number, color: Color) {
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.uvX = uvX;
        this.uvY = uvY;
        this.normalX = normalX;
        this.normalY = normalY;
        this.normalZ = normalZ;
        this.color = color;
    }

    public toBuffer() : Uint8Array {
        const colorData = this.color.toArrayBuffer();
        const vertexData = new Float32Array([this.posX, this.posY, this.posZ, this.uvX, this.uvY, this.normalX, this.normalY, this.normalZ]);
        const arr = new Uint8Array(Vertex.SIZE_IN_BYTES);

        arr.set(new Uint8Array(vertexData.buffer), 0);
        arr.set(new Uint8Array(colorData.buffer), vertexData.length * Float32Array.BYTES_PER_ELEMENT);

        return arr;
    }
};

export { Vertex, PrimitiveType };