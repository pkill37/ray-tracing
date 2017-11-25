class Frustum extends Model {
    constructor(color, mvMatrix, translation, rotation, scale) {
        super(frustumVertices, flatten(Array(6*3).fill(color.slice(0,3))), null, gl.LINE_LOOP, [0, 0, 2], [0, Math.PI*2.8, Math.PI*1.5])
    }
}
