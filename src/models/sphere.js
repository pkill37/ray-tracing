class Sphere extends Model {
    constructor(vertices, colors, mvMatrix, translation, rotation, scale) {
        super(vertices, colors, mvMatrix, gl.TRIANGLES, translation, rotation, scale);
    }
}

