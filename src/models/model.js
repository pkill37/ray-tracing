class Model {
    constructor(vertices, colors, mvMatrix, primitive = gl.TRIANGLES, translation = [0, 0, 0], rotation = [0, 0, 0], scale = [0.5, 0.5, 0.5]) {
        this.vertices = vertices
        this.colors = colors
        this.normals = computeVertexNormals(vertices)
        this.mvMatrix = mvMatrix
        this.primitive = primitive
        this.translation = translation
        this.rotation = rotation
        this.scale = scale
        console.log(this)
    }
}

