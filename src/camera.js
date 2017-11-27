class Camera {
    constructor(origin, rotation, scale, dimension = 3) {
        
        this.origin = origin
        this.frustum = new Frustum(COLORS.BLACK, null, origin, rotation, scale);

        let cameraMatrix = translationMatrix(0,0,0)
        
        cameraMatrix = mult(cameraMatrix, scalingMatrix(this.frustum.scale[0], this.frustum.scale[1], this.frustum.scale[2]));
        cameraMatrix = mult(cameraMatrix, rotationZZMatrix(this.frustum.rotation[2]));
        cameraMatrix = mult(cameraMatrix, rotationYYMatrix(this.frustum.rotation[1]));
        cameraMatrix = mult(cameraMatrix, rotationXXMatrix(this.frustum.rotation[0]));
        cameraMatrix = mult(cameraMatrix, translationMatrix(this.frustum.translation[0], this.frustum.translation[1], this.frustum.translation[2]));
            
        //9 pixels

        let centerPixel = [0,-frustumHeight,0]
            
        let pixelMatrix = [Array(3),Array(3),Array(3)]
        //calculate from central pixel
        let displacement = frustumSize/3;
        
        pixelMatrix[0][0] = [-displacement,-frustumHeight,-displacement]  
        pixelMatrix[0][1] = [0,-frustumHeight,-displacement]     
        pixelMatrix[0][2] = [displacement,-frustumHeight,-displacement]     
        
        // pixelMatrix[1][0] = [-displacement,-frustumHeight,0]
        // pixelMatrix[1][1] = [0,-frustumHeight,0]
        // pixelMatrix[1][2] = [displacement,-frustumHeight,0]

        // pixelMatrix[2][0] = [-displacement,-frustumHeight,displacement]
        // pixelMatrix[2][1] = [0,-frustumHeight,displacement]
        // pixelMatrix[2][2] = [displacement,-frustumHeight,displacement]

        let pixelVector = pixelMatrix[0][1];



        this.cameraCenter = multiplyPointByMatrix( cameraMatrix, [pixelVector[0], pixelVector[1], pixelVector[2],1]).slice(0,3);
        
        this.cameraCenter = subtract( this.cameraCenter, this.origin)
    }
}

