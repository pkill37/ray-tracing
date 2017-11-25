class Scene {
    constructor() {
        this.models = []
        if (true) {
            this.pMatrix = perspective(45, 1, 0.05, 15)
            this.globalTz = -4.5
        } else {
            this.pMatrix = ortho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0)
            this.globalTz = 0
        }
        this.triangleVertexPositionBuffer = null
        this.triangleVertexNormalBuffer = null
        this.triangleVertexColorBuffer = null
    }

    add(model) {
        this.models.push(model)
    }

    remove(model) {
        this.models.pop(model)
    }

    initBuffers(vertices, normals, colors) {
        // TODO: reorder triangle lines

        // Vertex Coordinates
        this.triangleVertexPositionBuffer = gl.createBuffer();
        this.triangleVertexPositionBuffer.itemSize = 3;
        this.triangleVertexPositionBuffer.numItems = vertices.length / 3;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Vertex Normals
        this.triangleVertexNormalBuffer = gl.createBuffer();
        this.triangleVertexNormalBuffer.itemSize = 3;
        this.triangleVertexNormalBuffer.numItems = normals.length / 3;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.triangleVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Colors
        this.triangleVertexColorBuffer = gl.createBuffer();
        this.triangleVertexColorBuffer.itemSize = 3;
        this.triangleVertexColorBuffer.numItems = colors.length / 3;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }

    draw() {
        // Clearing the frame-buffer and the depth-buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Passing the Projection Matrix to apply the current projection
        var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(this.pMatrix)));

        // GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
        let mvMatrix = translationMatrix(0, 0, this.globalTz);

        for(let model of this.models) {
            this.drawModel(model, mvMatrix)
        }
    }

    drawModel(model, mvMatrix) {
        // The global model transformation is an input
        // Concatenate with the particular model transformations
        // Pay attention to transformation order
        mvMatrix = mult(mvMatrix, translationMatrix(model.translation[0], model.translation[1], model.translation[2]));
        mvMatrix = mult(mvMatrix, rotationZZMatrix(model.rotation[2]));
        mvMatrix = mult(mvMatrix, rotationYYMatrix(model.rotation[1]));
        mvMatrix = mult(mvMatrix, rotationXXMatrix(model.rotation[0]));
        mvMatrix = mult(mvMatrix, scalingMatrix(model.scale[0], model.scale[1], model.scale[2]));

        // Passing the Model View Matrix to apply the current transformation
        var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

        // Multiplying the reflection coefficents
        var ambientProduct = mult(kAmbi, lightSources[0].getAmbIntensity());
        var diffuseProduct = mult(kDiff, lightSources[0].getIntensity());
        var specularProduct = mult(kSpec, lightSources[0].getIntensity());

        // Associating the data to the vertex shader
        this.initBuffers(model.vertices, model.normals, model.colors);

        // Set shader uniforms
        gl.uniform3fv(gl.getUniformLocation(shaderProgram, "ambientProduct"), flatten(ambientProduct));
        gl.uniform3fv(gl.getUniformLocation(shaderProgram, "diffuseProduct"), flatten(diffuseProduct));
        gl.uniform3fv(gl.getUniformLocation(shaderProgram, "specularProduct"), flatten(specularProduct));
        gl.uniform1f(gl.getUniformLocation(shaderProgram, "shininess"), nPhong);
        gl.uniform4fv(gl.getUniformLocation(shaderProgram, "lightPosition"), flatten(lightSources[0].getPosition()));
        gl.uniform4fv(gl.getUniformLocation(shaderProgram, "viewerPosition"), flatten([0.0, 0.0, 0.0, 1.0]));

        if(model.primitive == gl.LINE_LOOP) {
            // To simulate wireframe drawing!
            // No faces are defined! There are no hidden lines!
            // Taking the vertices 3 by 3 and drawing a LINE_LOOP
            for(var i = 0; i < this.triangleVertexPositionBuffer.numItems / 3; i++) {
                gl.drawArrays(model.primitive, 3 * i, 3);
            }
        } else {
            gl.drawArrays(model.primitive, 0, this.triangleVertexPositionBuffer.numItems);
        }
    }
}
