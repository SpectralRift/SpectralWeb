interface ICamera {
	getProjectionMatrix(): number[];
	getViewMatrix(): number[];

	update(width: number, height: number): void;
}

export { ICamera };
