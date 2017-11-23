//----------------------------------------------------------------------------
//  Drawing the 3D scene
//----------------------------------------------------------------------------

function drawScene() {

	let objs = {
		sphere0:{
			vertices: sphere,
			colors:flatten(Array(36864).fill([1, 0, 0])),
			normals:[],
			tx:0,
			ty:0,
			tz:0,
			sx:0.5,
			sy:0.5,
			sz:0.5,
			angleXX:0,
			angleYY:0,
			angleZZ:0,
			
		}, 
		sphere1:{
			vertices:sphere,
			colors:flatten(Array(36864).fill([0, 1, 0])),
			normals:[],
			tx:1,
			ty:1,
			tz:-5,
			sx:0.5,
			sy:0.5,
			sz:0.5,
			angleXX:0,
			angleYY:0,
			angleZZ:0

		}, 
		checkered_floor:{
			vertices:[],
			colors:[],
			normals:[],
			tx:3,
			ty:3,
			tz:0,
			sx:0.5,
			sy:0.5,
			sz:0.5,
			angleXX:0,
			angleYY:0,
			angleZZ:0
		}
	};
	var pMatrix;
	var mvMatrix = mat4();

	// Clearing the frame-buffer and the depth-buffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Computing the Projection Matrix
	if(projectionType == 0) {
		// For now, the default orthogonal view volume
		pMatrix = ortho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);

		// Global transformation !!
		globalTz = 0.0;

		// TO BE DONE !
		// Allow the user to control the size of the view volume
	} else {
		// A standard view volume.
		// Viewer is at (0,0,0)
		// Ensure that the model is "inside" the view volume
		pMatrix = perspective(45, 1, 0.05, 15);

		// Global transformation !!
		globalTz = -4.5;

		// TO BE DONE !
		// Allow the user to control the size of the view volume
	}

	// Passing the Projection Matrix to apply the current projection
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	mvMatrix = translationMatrix(0, 0, globalTz);

	for(obj of Object.values(objs)){
		drawModel(obj.vertices,
				  computeVertexNormals(obj.vertices),
				  obj.colors,
	              obj.angleXX, obj.angleYY, obj.angleZZ,
		          obj.sx, obj.sy, obj.sz,
		          obj.tx, obj.ty, obj.tz,
		          mvMatrix,
		          primitiveType);
	}
}

