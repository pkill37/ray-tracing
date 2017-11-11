const fragmentShaderSource = `
    precision mediump float;
            
    varying vec4 vertexColor;

    void main(void) {
        
        // Using the passed vertex color
        
        gl_FragColor = vertexColor;
    }
`;

const vertexShaderSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    varying vec4 vertexColor;

    void main(void) {
        
        // To allow seeing the points drawn
        
        gl_PointSize = 5.0;
        
        // Just converting the (x,y,z) vertices to Homogeneous Coord.
        
        // And multiplying by the Projection and the Model-View matrix
        
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        
        // Converting the RGB color value to RGBA
        
        vertexColor = vec4(aVertexColor, 1.0);
    }
`;

function initShaders(gl) {
    var fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    var vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    var shaderProgram = createProgram(gl, vertexShader, fragmentShader);
	gl.useProgram(shaderProgram);

	// Coordinates 
	
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	// Colors 
	
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
	return shaderProgram;
}
