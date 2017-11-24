class Frustum extends Model {
    constructor(vertices, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix) {
        super(vertices, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix, gl.LINE_LOOP);
        console.log(this)
    }
}
