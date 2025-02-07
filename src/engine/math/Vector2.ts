class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toArrayBuffer(): ArrayBuffer {
        return new Float32Array([this.x, this.y]).buffer;
    }
};

export { Vector2 };