class Line extends Model {
    constructor(a, b, color, translation, rotation, scale) {
        super([...a, ...b], [...color.slice(0,3), ...color.slice(0,3)], null, gl.LINES, translation, rotation, scale);
    }
}
