class Sphere extends Model {
    constructor(color, mvMatrix, translation, rotation, scale) {
        super(sphereVertices, flatten(Array(sphereVertices.length/3).fill(color.slice(0, 3))), mvMatrix, gl.TRIANGLES, translation, rotation, scale);
    }
}

