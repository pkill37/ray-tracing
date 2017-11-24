class Line extends Model {
    constructor(a, b, color) {
        super([...a, ...b], [...color, ...color], 0, 0, 0, 0, 0, 0, 0, 0, 0, null, gl.LINES);
        console.log(this)
    }
}
