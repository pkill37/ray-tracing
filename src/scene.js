function drawModel(vertices, normals, colors, angleXX, angleYY, angleZZ, sx, sy, sz, tx, ty, tz, mvMatrix, primitiveType) {
	// The global model transformation is an input
	// Concatenate with the particular model transformations
    // Pay attention to transformation order
	mvMatrix = mult(mvMatrix, translationMatrix(tx, ty, tz));
	mvMatrix = mult(mvMatrix, rotationZZMatrix(angleZZ));
	mvMatrix = mult(mvMatrix, rotationYYMatrix(angleYY));
	mvMatrix = mult(mvMatrix, rotationXXMatrix(angleXX));
	mvMatrix = mult(mvMatrix, scalingMatrix(sx, sy, sz));

	// Passing the Model View Matrix to apply the current transformation
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

    // Multiplying the reflection coefficents
    var ambientProduct = mult(kAmbi, lightSources[0].getAmbIntensity());
    var diffuseProduct = mult(kDiff, lightSources[0].getIntensity());
    var specularProduct = mult(kSpec, lightSources[0].getIntensity());

	// Associating the data to the vertex shader
	initBuffers(vertices, normals, colors);

	// Partial illumonation terms and shininess Phong coefficient
	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "ambientProduct"), flatten(ambientProduct));
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "specularProduct"), flatten(specularProduct));
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "shininess"), nPhong);

	//Position of the Light Source
	gl.uniform4fv(gl.getUniformLocation(shaderProgram, "lightPosition"), flatten(lightSources[0].getPosition()));

	// primitiveType allows drawing as filled triangles / wireframe / vertices
	if(primitiveType == gl.LINE_LOOP) {
		// To simulate wireframe drawing!
		// No faces are defined! There are no hidden lines!
		// Taking the vertices 3 by 3 and drawing a LINE_LOOP
		for(var i = 0; i < triangleVertexPositionBuffer.numItems / 3; i++) {
			gl.drawArrays(primitiveType, 3 * i, 3);
		}
	} else {
		gl.drawArrays(primitiveType, 0, triangleVertexPositionBuffer.numItems);
	}
}

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
    var globalTz;

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

    for(obj of Object.values(objs)) {
        drawModel(
            obj.vertices,
            computeVertexNormals(obj.vertices),
            obj.colors,
            obj.angleXX, obj.angleYY, obj.angleZZ,
            obj.sx, obj.sy, obj.sz,
            obj.tx, obj.ty, obj.tz,
            mvMatrix,
            primitiveType
        );
    }
}

