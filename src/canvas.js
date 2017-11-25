var gl = null;
var shaderProgram = null;

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        gl = this.initWebGL()
        shaderProgram = this.initShaders();
        this.scene = new Scene();
        this.mouseDown = false;
		this.lastMouseX = null;
		this.lastMouseY = null;
		this.setEventListeners();
    }

    initWebGL() {
        try { gl = this.canvas.getContext("webgl2");
            gl.clearColor(...COLORS.SKY_BLUE);
            gl.cullFace(gl.BACK);
            gl.enable(gl.DEPTH_TEST);
        } catch (e) {
            console.log("Could not initialise WebGL", e);
        }
        return gl
    }

    initShaders() {
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
        let checkered_floor = getCheckeredFloor(100, 1)
        let models = [
            new Frustum(COLORS.BLUE, null, [0, 0, 2], [0, Math.PI*2.8, Math.PI*1.5]),

            new Sphere(COLORS.GREEN, null, [1, 1, -5]),
            new Sphere(COLORS.RED, null, [0, 0, 0]),

            new Line([-1, 0, 1], [1, 0, 1], COLORS.BLACK, [1, 1, -5]),

            new Line([0, 0, 0], [1000, 0, 0], COLORS.RED),
            new Line([0, 0, 0], [0, 1000, 0], COLORS.GREEN),
            new Line([0, 0, 0], [0, 0, 1000], COLORS.BLUE),

            new Floor(checkered_floor['vertices'], checkered_floor['colors'], null, [0, -2, -10])
        ]

        for(let model of models) {
            this.scene.add(model)
        }

        this.tick()
    }

    setEventListeners(){
		let self = this

	    this.canvas.onmousedown = function handleMouseDown(event) {
		    self.mouseDown = true;
		    self.lastMouseX = event.clientX;
		    self.lastMouseY = event.clientY;
		}

		this.canvas.onscroll = function handleScroll(event){
			console.log(event)
		}

	    document.onmouseup = function handleMouseUp(event) {
	    	self.mouseDown = false;
		}

	    document.onmousemove = function handleMouseMove(event) {
		    if (!self.mouseDown) return;

		    // Rotation angles proportional to cursor displacement
		    var newX = event.clientX;
		    var newY = event.clientY;
		    var deltaX = newX - self.lastMouseX;
		    var deltaY = newY - self.lastMouseY;

		    self.scene.globalRotation[1] += radians( 20 * deltaX  )
		    self.scene.globalRotation[0] += radians( 20 * deltaY  )

		    self.lastMouseX = newX;
		    self.lastMouseY = newY;
  		}
	}

    tick() {
        requestAnimationFrame(() => this.tick())
        resizeCanvasToDisplaySize(gl.canvas)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        this.scene.draw()
    }
}

