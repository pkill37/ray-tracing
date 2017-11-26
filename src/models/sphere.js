class Sphere extends Model {
    constructor(center, radius, color, rotation) {
        super(sphereVertices, flatten(Array(sphereVertices.length/3).fill(color.slice(0, 3))), null, gl.TRIANGLES, center, rotation, Array(3).fill(radius));
        this.center = center
        this.radius = radius
    }
}

