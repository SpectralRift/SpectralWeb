import { IShader, ShaderType } from "../../engine/graphics/IShader";

// make sure we won't reference our class!
type NativeWebGLShader = globalThis.WebGLShader;

class WebGLShader implements IShader {
    private gl: WebGLRenderingContext;
    private shaderHandle: NativeWebGLShader;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    private mapShaderType(type: ShaderType) : number {
        switch(type) {
            case ShaderType.SHADER_TYPE_VERTEX:
                return this.gl.VERTEX_SHADER;
            case ShaderType.SHADER_TYPE_FRAGMENT:
                return this.gl.FRAGMENT_SHADER;
            default:
                return -1;
        }
    }

    public compile() : boolean {
        if (this.shaderHandle === undefined) {
            console.error("GLShader (compile): Shader handle is not initialized. Please call setSource() first.\n");
            return false;
        }

        this.gl.compileShader(this.shaderHandle);
        return this.isCompiled();
    }

    public destroy() : void {
        if(this.shaderHandle !== undefined) {
            this.gl.deleteShader(this.shaderHandle);
            this.shaderHandle = undefined;
        }
    }

    public setSource(source: string, type: ShaderType) : void {
        console.debug("WebGLShader (setSource): Setting source for shader type: " + type);

        if (this.shaderHandle === undefined) {
            console.debug("WebGLShader (setSource): no shader handle exists; creating one!");
            this.shaderHandle = this.gl.createShader(this.mapShaderType(type));
        }

        console.debug("WebGLShader (setSource): Source: " + source);
        this.gl.shaderSource(this.shaderHandle, source);
    }

    public getCompileLog() : string {
        return this.gl.getShaderInfoLog(this.shaderHandle);
    }

    public isCompiled() : boolean {
        if (this.shaderHandle === undefined) {
            return false;
        }

        return this.gl.getShaderParameter(this.shaderHandle, this.gl.COMPILE_STATUS) as boolean;
    }

    public getGLHandle() : NativeWebGLShader {
        return this.shaderHandle;
    }
}

export {WebGLShader};