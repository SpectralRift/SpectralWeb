import { IShader } from "./IShader";

interface IShaderProgram {
	link(): boolean;
	destroy(): void;
	bind(): void;
	unbind(): void;
	attachShader(shader: IShader): void;
    setUniformMat4(name: string, mat: number[]): void;
	setUniformNumber(name: string, val: number): void;
	getLinkLog(): string;
	isLinked(): boolean;

	// void SetUniformMat4(string name, const glm::mat4 &mat);
}

export { IShaderProgram };
