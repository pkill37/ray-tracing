class Sphere extends Model {
    constructor(vertices, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix, primitive) {
        super(vertices, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix, gl.TRIANGLES)
        console.log('sphere', this)
    }
}

