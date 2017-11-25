var gl = null;
var shaderProgram = null;

class Canvas {
    constructor() {
        var canvas = document.getElementById("canvas");
        console.log(canvas)
        this.initWebGL(canvas)
        shaderProgram = initShaders(gl);
        this.scene = new Scene()
    }

    initWebGL(canvas) {
        try {
            gl = canvas.getContext("webgl2");
            gl.clearColor(...COLORS.BLACK);
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.enable(gl.DEPTH_TEST);
        } catch (e) {
            console.log("Could not initialise WebGL", e);
        }
    }

    start() {
        let models = [
            new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.GREEN.slice(0, 3))), [0, 0, 0], [0.5, 0.5, 0.5], [1, 1, -5]),
            new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.RED.slice(0, 3))), [0, 0, 0], [0.5, 0.5, 0.5], [0, 0, 0]),
            new Frustum(frustumVertices, flatten(Array(6*3).fill(COLORS.BLUE.slice(0,3))), [0, Math.PI*2.8, Math.PI*1.5], [0.5, 0.5, 0.5], [0, 0, 2]),
            new Line([-1, 0, 1], [1, 0, 1], COLORS.BLUE.slice(0,3))
        ]

        for(let model of models) {
            this.scene.add(model)
        }

        this.tick()
    }

    tick() {
        requestAnimationFrame(() => this.tick())
        resizeCanvasToDisplaySize(gl.canvas)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        this.scene.draw()
    }
}

function ready(){
    let canvas = new Canvas()
    canvas.start()
}
