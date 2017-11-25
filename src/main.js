var gl = null;
var shaderProgram = null;

class Application {
    constructor() {
        this.canvas = document.getElementById("canvas");
        gl = this.initWebGL()
        shaderProgram = initShaders(gl);
        this.scene = new Scene()
    }

    initWebGL() {
        try {
            gl = this.canvas.getContext("webgl2");
            gl.clearColor(...COLORS.SKY_BLUE);
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.enable(gl.DEPTH_TEST);
        } catch (e) {
            console.log("Could not initialise WebGL", e);
        }
        return gl
    }

    initShaders(gl) {
        var fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
        var vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        var shaderProgram = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(shaderProgram);

        // Coordinates
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        // Colors
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        // Normals
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        return shaderProgram;
    }

    start() {
        let checkered_floor = getCheckeredFloor(30, 1)
        let models = [
            new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.GREEN.slice(0, 3))), [0, 0, 0], [0.5, 0.5, 0.5], [1, 1, -5]),
            new Sphere(sphereVertices, flatten(Array(36864).fill(COLORS.RED.slice(0, 3))), [0, 0, 0], [0.5, 0.5, 0.5], [0, 0, 0]),
            new Frustum(frustumVertices, flatten(Array(6*3).fill(COLORS.BLUE.slice(0,3))), [0, Math.PI*2.8, Math.PI*1.5], [0.5, 0.5, 0.5], [0, 0, 2]),
            new Line([-1, 0, 1], [1, 0, 1], COLORS.BLUE.slice(0,3)),
            new Floor(checkered_floor['vertices'], checkered_floor['colors'], [0,0,0], [1,1,1], [0,-2,-10])
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
    let app = new Application()
    app.start()
}
