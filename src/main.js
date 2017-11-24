var gl = null;
var shaderProgram = null;

function tick() {
    requestAnimationFrame(tick);
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    scene.draw();
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

var scene;
function runWebGL() {
	var canvas = document.getElementById("canvas");
	initWebGL(canvas);
	shaderProgram = initShaders(gl);
	scene = new Scene()
 
    let size = 1;
    let frustum = [
        [-size/2, 0, size/2],
        [size/2, 0, size/2],
        [size/2, 0, -size/2],
        [-size/2, 0, -size/2],
        [0, 1, 0],
    ];
    let frustumVertices = [
        ...frustum[0],
        ...frustum[3],
        ...frustum[2],

        ...frustum[0],
        ...frustum[2],
        ...frustum[1],

        ...frustum[1],
        ...frustum[2],
        ...frustum[4],

        ...frustum[2],
        ...frustum[3],
        ...frustum[4],

        ...frustum[3],
        ...frustum[0],
        ...frustum[4],

        ...frustum[0],
        ...frustum[1],
        ...frustum[4]
    ];

    let models = [
        new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.GREEN.slice(0, 3))), 0, 0, 0, 0.5, 0.5, 0.5, 1, 1, -5),
        new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.RED.slice(0, 3))), 0, 0, 0, 0.5, 0.5, 0.5, 0, 0, 0),
        new Frustum(frustumVertices, flatten(Array(6*3).fill(COLORS.BLUE.slice(0,3))), 0, Math.PI*2.8, Math.PI*1.5, 0.5, 0.5, 0.5, 0, 0, 2),
        //new Line([0, 1, 0], [0, 0, 1], COLORS.BLUE.slice(0,3))
    ]

    for(let model of models) {
        scene.add(model)
    }

	tick()
}

