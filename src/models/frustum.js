class Frustum extends Model {
    constructor(vertices, colors, rotation, scale, translation, mvMatrix) {
        super(vertices, colors, rotation, scale, translation, mvMatrix, gl.LINE_LOOP);
    }
}
