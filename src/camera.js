class Camera {
    constructor(origin, rotation, scale, dimension = 3) {
        
        this.origin = origin
        this.frustum = new Frustum(COLORS.BLACK, null, origin, rotation, scale);
        
        //9 pixels
        this.cameraMatrix = translationMatrix(0,0,0)
        //this.cameraMatrix = mult(mvMatrix,this.cameraMatrix);

        this.cameraMatrix = mult(this.cameraMatrix, translationMatrix(this.frustum.translation[0], this.frustum.translation[1], this.frustum.translation[2]));
        this.cameraMatrix = mult(this.cameraMatrix, rotationZZMatrix(this.frustum.rotation[2]));
        this.cameraMatrix = mult(this.cameraMatrix, rotationYYMatrix(this.frustum.rotation[1]));
        this.cameraMatrix = mult(this.cameraMatrix, rotationXXMatrix(this.frustum.rotation[0]));
        this.cameraMatrix = mult(this.cameraMatrix, scalingMatrix(this.frustum.scale[0], this.frustum.scale[1], this.frustum.scale[2]));


        let displacement = frustumSize/3;
            
        let pixelMatrix = [Array(3),Array(3),Array(3)]
        
        pixelMatrix[0][0] = [-displacement,-frustumHeight,-displacement]  
        pixelMatrix[0][1] = [0,-frustumHeight,-displacement]     
        pixelMatrix[0][2] = [displacement,-frustumHeight,-displacement]     
        
        pixelMatrix[1][0] = [-displacement,-frustumHeight,0]
        pixelMatrix[1][1] = [0,-frustumHeight,0]
        pixelMatrix[1][2] = [displacement,-frustumHeight,0]

        pixelMatrix[2][0] = [-displacement,-frustumHeight,displacement]
        pixelMatrix[2][1] = [0,-frustumHeight,displacement]
        pixelMatrix[2][2] = [displacement,-frustumHeight,displacement]

        this.pixelVector = pixelMatrix[1][0];
        
        this.nearVector = multiplyPointByMatrix( this.cameraMatrix, [this.pixelVector[0], this.pixelVector[1], this.pixelVector[2],0]).slice(0,3);        
    }

}

