import { ITexture } from "../../engine/graphics/ITexture";
import { Vector2 } from "../../engine/math/Vector2";

// make sure we won't reference our class!
type NativeWebGLTexture = globalThis.WebGLTexture;

class WebGLTexture implements ITexture {
    private gl: WebGLRenderingContext;
    private texture: NativeWebGLTexture;
    private size: Vector2;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.size = new Vector2(0, 0);
    }

    public uploadPixelData(data: ArrayBufferView, size: Vector2): boolean {
        if (!this.texture) {
            this.texture = this.gl.createTexture();
        }
        
        this.size = size;

        if (!this.texture) return false;

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            size.x,
            size.y,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            data
        );
        
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        
        this.unbind();
        return true;
    }

    public destroy(): void {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
        }
    }

    public getSize(): Vector2{
        return this.size;
    }

    public bind(samplerSlot: number): void {
        if (!this.texture) return;
        
        this.gl.activeTexture(this.gl.TEXTURE0 + samplerSlot);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    public unbind(): void {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
}

export { WebGLTexture };
