class Line extends Model {
    constructor(a, b, color, translation, rotation, scale) {
        super([...a, ...b], [...color, ...color], null, gl.LINES, translation, rotation, scale);
    }
}
