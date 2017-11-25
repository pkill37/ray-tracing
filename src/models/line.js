class Line extends Model {
    constructor(a, b, color) {
        super([...a, ...b], [...color, ...color], [0, 0, 0], [0, 0, 0], [1, 1, 4], null, gl.LINES);
    }
}
