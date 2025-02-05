class Color {
    r: number = 0.0;
    g: number = 0.0;
    b: number = 0.0;
    a: number = 1.0;

    constructor(r: number, g: number, b: number, a: number = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

const Colors = {
    black: new Color(0.0, 0.0, 0.0, 1.0),
    white: new Color(1.0, 1.0, 1.0, 1.0),
    red: new Color(1.0, 0.0, 0.0, 1.0),
    green: new Color(0.0, 1.0, 0.0, 1.0),
    blue: new Color(0.0, 0.0, 1.0, 1.0),
    yellow: new Color(1.0, 1.0, 0.0, 1.0),
    cyan: new Color(0.0, 1.0, 1.0, 1.0),
    magenta: new Color(1.0, 0.0, 1.0, 1.0)
};

export { Color, Colors };