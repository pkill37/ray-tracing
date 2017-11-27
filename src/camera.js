class Camera {
    constructor(origin, rotation, scale, dimension = 3) {
        this.origin = origin
        this.frustum = new Frustum(COLORS.BLACK, null, origin, rotation, scale)

        this.cameraMatrix = translationMatrix(0,0,0)
        this.cameraMatrix = mult(this.cameraMatrix, scalingMatrix(this.frustum.scale[0], this.frustum.scale[1], this.frustum.scale[2]))
        this.cameraMatrix = mult(this.cameraMatrix, rotationZZMatrix(this.frustum.rotation[2]))
        this.cameraMatrix = mult(this.cameraMatrix, rotationYYMatrix(this.frustum.rotation[1]))
        this.cameraMatrix = mult(this.cameraMatrix, rotationXXMatrix(this.frustum.rotation[0]))
        this.cameraMatrix = mult(this.cameraMatrix, translationMatrix(this.frustum.translation[0], this.frustum.translation[1], this.frustum.translation[2]))
            
        //9 pixels
        //calculate from central pixel

        let centerPixel = [0,-frustumHeight,0]
        let displacement = frustumSize/3

        this.pixelMatrix = [Array(3),Array(3),Array(3)]
        
        this.pixelMatrix[0][0] = [-displacement,-frustumHeight,-displacement]  
        this.pixelMatrix[0][1] = [0,-frustumHeight,-displacement]     
        this.pixelMatrix[0][2] = [displacement,-frustumHeight,-displacement]     
        
        this.pixelMatrix[1][0] = [-displacement,-frustumHeight,0]
        this.pixelMatrix[1][1] = [0,-frustumHeight,0]
        this.pixelMatrix[1][2] = [displacement,-frustumHeight,0]

        this.pixelMatrix[2][0] = [-displacement,-frustumHeight,displacement]
        this.pixelMatrix[2][1] = [0,-frustumHeight,displacement]
        this.pixelMatrix[2][2] = [displacement,-frustumHeight,displacement]

        this.setPixelVector(0, 1)
    }

    setPixelVector(i, j) {
        this.pixelVector = this.pixelMatrix[i][j]
        this.cameraCenter = multiplyPointByMatrix(this.cameraMatrix, [this.pixelVector[0], this.pixelVector[1], this.pixelVector[2], 1]).slice(0,3)
        this.cameraCenter = subtract(this.cameraCenter, this.origin)
    }
}

