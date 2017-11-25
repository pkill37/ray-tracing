class Frustum extends Model {
    constructor(vertices, colors, mvMatrix, translation, rotation, scale) {
        super(vertices, colors, mvMatrix, gl.LINE_LOOP, translation, rotation, scale);
    }
}
