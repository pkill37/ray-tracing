function compileShader(gl, shaderSource, shaderType) {
    // Create the shader object
    const shader = gl.createShader(shaderType);

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();

    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program.
    gl.linkProgram(program);

    // Check if it linked.
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw "program fqiled to link:" + gl.getProgramInfoLog(program);
    }

    return program;
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
        canvas.width  = width;
        canvas.height = height;
        return true;
    }
    return false;
}
