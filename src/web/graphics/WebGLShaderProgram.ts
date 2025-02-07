import { mat4 } from "gl-matrix";
import { IShader } from "../../engine/graphics/IShader";
import { IShaderProgram } from "../../engine/graphics/IShaderProgram";
import { WebGLShader } from "./WebGLShader";

// make sure we won't reference our class!
type NativeWebGLProgram = globalThis.WebGLProgram;

class WebGLShaderProgram implements IShaderProgram {
	private gl: WebGLRenderingContext;
	private programHandle: NativeWebGLProgram;
	private shaderList: WebGLShader[] = [];

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
	}

	public link(): boolean {
		if (this.programHandle === undefined) {
			this.programHandle = this.gl.createProgram();
		}

		for (const shader of this.shaderList) {
			if (!shader.isCompiled() && !shader.compile()) {
				console.error("WebGLShaderProgram (link): Failed to compile one or more shaders.");
				return false;
			}

			this.gl.attachShader(this.programHandle, shader.getGLHandle());
		}

        this.gl.linkProgram(this.programHandle);

        if (!this.isLinked()) {
            console.error("WebGLShaderProgram (link): Failed to link program.");
            console.error("WebGLShaderProgram (link): Linking log: " + this.getLinkLog());
            return false;
        }

		return true;
	}

	public destroy(): void {
		if (this.programHandle !== undefined) {
			this.gl.deleteProgram(this.programHandle);
			this.programHandle = undefined;
		}
	}

	public bind(): void {
		if (this.programHandle !== undefined) {
			this.gl.useProgram(this.programHandle);
		}
	}

	public unbind(): void {
		this.gl.useProgram(null);
	}

	public attachShader(shader: IShader): void {
		if (shader instanceof WebGLShader) {
			this.shaderList.push(shader);
		} else {
			console.error("WebGLShaderProgram (addShader): Shader is not an instance of GLShader.");
		}
	}

	public setUniformMat4(name: string, mat: mat4): void {
		if (this.programHandle === undefined) {
			console.error("WebGLShaderProgram (setUniformMat4): Program handle is not initialized.");
			return;
		}

		this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.programHandle, name), false, mat);
	}

	public setUniformNumber(name: string, val: number): void {
		if (this.programHandle === undefined) {
			console.error("WebGLShaderProgram (setUniformNumber): Program handle is not initialized.");
			return;
		}

		this.gl.uniform1i(this.gl.getUniformLocation(this.programHandle, name), val);
	}

	public getLinkLog(): string {
		return this.gl.getProgramInfoLog(this.programHandle);
	}

	public isLinked(): boolean {
		if (this.programHandle === undefined) {
			return false;
		}

		return this.gl.getProgramParameter(this.programHandle, this.gl.LINK_STATUS) as boolean;
	}
}

export { WebGLShaderProgram };
