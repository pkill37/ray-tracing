class Model {
    constructor(vertices, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix, primitive) {
        this.vertices = vertices
        this.colors = colors
        this.normals = computeVertexNormals(vertices)
        this.angleXX = angleXX
        this.angleYY = angleYY
        this.angleZZ = angleZZ
        this.sx = sx 
        this.sy = sy 
        this.sz = sz 
        this.tx = tx 
        this.ty = ty 
        this.tz = tz 
        this.mvMatrix = mvMatrix
        this.primitive = primitive
    }
}

