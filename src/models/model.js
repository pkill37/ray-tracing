class Model {
    constructor(vertices, colors, rotation, scale, translation, mvMatrix, primitive) {
        this.vertices = vertices
        this.colors = colors
        this.normals = computeVertexNormals(vertices)
        this.rotation = rotation
        this.scale = scale
        this.translation = translation
        this.mvMatrix = mvMatrix
        this.primitive = primitive
        console.log(this)
    }
}

