var gl = null;
var shaderProgram = null;
var triangleVertexPositionBuffer = null;
var triangleVertexNormalBuffer = null;
var triangleVertexColorBuffer = null;

// The GLOBAL transformation parameters

var globalAngleYY = 0.0;

// GLOBAL Animation controls

var globalRotationYY_ON = 1;
var globalRotationYY_DIR = 1;
var globalRotationYY_SPEED = 1;

// Local Animation controls

var rotationXX_ON = 1;
var rotationXX_DIR = 1;
var rotationXX_SPEED = 1;
var rotationYY_ON = 1;
var rotationYY_DIR = 1;
var rotationYY_SPEED = 1;
var rotationZZ_ON = 1;
var rotationZZ_DIR = 1;
var rotationZZ_SPEED = 1;

// To allow choosing the way of drawing the model triangles
var primitiveType = null;

// To allow choosing the projection type
var projectionType = 1;

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {
	var timeNow = new Date().getTime();

	if(lastTime != 0) {
		var elapsed = timeNow - lastTime;

		// Global rotation
		if(globalRotationYY_ON) globalAngleYY += globalRotationYY_DIR * globalRotationYY_SPEED * (90 * elapsed) / 1000.0;

		/*// Local rotations
		if(rotationXX_ON) angleXX += rotationXX_DIR * rotationXX_SPEED * (90 * elapsed) / 1000.0;
		if(rotationYY_ON) angleYY += rotationYY_DIR * rotationYY_SPEED * (90 * elapsed) / 1000.0;
		if(rotationZZ_ON) angleZZ += rotationZZ_DIR * rotationZZ_SPEED * (90 * elapsed) / 1000.0;*/

		// Rotating the light sources
		for(var i = 0; i < lightSources.length; i++) {
			if(lightSources[i].isRotYYOn()) {
				var angle = lightSources[i].getRotAngleYY() + lightSources[i].getRotationSpeed() * (90 * elapsed) / 1000.0;
				lightSources[i].setRotAngleYY(angle);
			}
		}
	}
	lastTime = timeNow;
}

function tick() {
    requestAnimationFrame(tick);
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	drawScene();
	animate();
}

function initWebGL(canvas) {
	try {
		gl = canvas.getContext("webgl2");
        gl.clearColor(...COLORS.BLACK);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		gl.enable(gl.DEPTH_TEST);
		primitiveType = gl.TRIANGLES;
	} catch (e) {
		console.log("Could not initialise WebGL", e);
    }
}

function runWebGL() {
	var canvas = document.getElementById("canvas");
	initWebGL(canvas);
	shaderProgram = initShaders(gl);
	tick();
}

