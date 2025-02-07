import { mat4 } from "gl-matrix";
import { IShader } from "./IShader";

interface IShaderProgram {
	link(): boolean;
	destroy(): void;
	bind(): void;
	unbind(): void;
	attachShader(shader: IShader): void;
    setUniformMat4(name: string, mat: mat4): void;
	setUniformNumber(name: string, val: number): void;
	getLinkLog(): string;
	isLinked(): boolean;
}

export { IShaderProgram };
