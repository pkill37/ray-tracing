//----------------------------------------------------------------------------
//  Drawing the 3D scene
//----------------------------------------------------------------------------

function drawScene() {
	var pMatrix;
	var mvMatrix = mat4();

	// Clearing the frame-buffer and the depth-buffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Computing the Projection Matrix
	if( projectionType == 0 ) {
		// For now, the default orthogonal view volume
		pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );

		// Global transformation !!
		globalTz = 0.0;

		// TO BE DONE !
		// Allow the user to control the size of the view volume
	} else {
		// A standard view volume.
		// Viewer is at (0,0,0)
		// Ensure that the model is "inside" the view volume
		pMatrix = perspective( 45, 1, 0.05, 15 );

		// Global transformation !!
		globalTz = -2.5;

		// TO BE DONE !
		// Allow the user to control the size of the view volume
	}

	// Passing the Projection Matrix to apply the current projection
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	mvMatrix = translationMatrix( 0, 0, globalTz );

	// Instantianting the current model
	drawModel( angleXX, angleYY, angleZZ,
	           sx, sy, sz,
	           tx, ty, tz,
	           mvMatrix,
	           primitiveType );
}

