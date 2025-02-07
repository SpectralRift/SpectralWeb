class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toArrayBuffer(): ArrayBuffer {
        return new Float32Array([this.x, this.y, this.z]).buffer;
    }
};

export { Vector3 };