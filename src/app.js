function ready() {
    let app = new App()
    app.start()
}

class App {
    constructor() {
        this.canvas = new Canvas()
        this.rayTraceDepth = 0
        this.pixel = [-5, -5, -3.5]
        //this.canvas.scene.add(new Frustum(COLORS.BLACK, null, [5, 5, 5], [45, 45, 0]))
    }

    setEventListeners() {
        document.getElementById('sphere-add').addEventListener('click', () => this.handleAddSphere())
        document.getElementById('camera-set').addEventListener('click', () => this.handleSetCamera())
        document.getElementById('light-set').addEventListener('click', () => this.handleSetLight())

        document.getElementById('raytrace-0-0').addEventListener('click', () => this.handleInitialRayTrace(0, 0))
        document.getElementById('raytrace-0-1').addEventListener('click', () => this.handleInitialRayTrace(0, 1))
        document.getElementById('raytrace-0-2').addEventListener('click', () => this.handleInitialRayTrace(0, 2))
        document.getElementById('raytrace-1-0').addEventListener('click', () => this.handleInitialRayTrace(1, 0))
        document.getElementById('raytrace-1-1').addEventListener('click', () => this.handleInitialRayTrace(1, 1))
        document.getElementById('raytrace-1-2').addEventListener('click', () => this.handleInitialRayTrace(1, 2))
        document.getElementById('raytrace-2-0').addEventListener('click', () => this.handleInitialRayTrace(2, 0))
        document.getElementById('raytrace-2-1').addEventListener('click', () => this.handleInitialRayTrace(2, 1))
        document.getElementById('raytrace-2-2').addEventListener('click', () => this.handleInitialRayTrace(2, 2))

        document.getElementById('raytrace-next').addEventListener('click', () => this.handleNextRayTrace())
        document.getElementById('raytrace-previous').addEventListener('click', () => this.handlePreviousRayTrace())
    }

    handleAddSphere() {
        let x = parseFloat(document.getElementById('sphere-x').value)
        let y = parseFloat(document.getElementById('sphere-y').value)
        let z = parseFloat(document.getElementById('sphere-z').value)
        let r = parseFloat(document.getElementById('sphere-r').value)
        let color = document.getElementById('sphere-color').value
        console.log('Add sphere', x, y, z, r, color)

        switch(color) {
            case 'yellow':
                color = COLORS.YELLOW
                break
            case 'red':
                color = COLORS.RED
                break
            case 'blue':
                color = COLORS.BLUE
                break
            case 'green':
                color = COLORS.GREEN
                break
            default:
                color = COLORS.BLACK
        }

        this.canvas.scene.add(new Sphere([x, y, z], r, color))
    }

    handleSetCamera() {
        let x = parseFloat(document.getElementById('camera-x').value)
        let y = parseFloat(document.getElementById('camera-y').value)
        let z = parseFloat(document.getElementById('camera-z').value)
        console.log('Set camera', x, y, z)
        
        var cameraRotation = [45, 45, 0]
        this.canvas.scene.camera = new Camera([x, y, z], cameraRotation, [1, 1, 1]);
        this.canvas.scene.primaryRays = []
    }

    handleSetLight() {
        let x = parseFloat(document.getElementById('light-x').value)
        let y = parseFloat(document.getElementById('light-y').value)
        let z = parseFloat(document.getElementById('light-z').value)
        let color = document.getElementById('light-color').value
        switch(color) {
            case 'yellow':
                color = COLORS.YELLOW
                break
            case 'red':
                color = COLORS.RED
                break
            case 'blue':
                color = COLORS.BLUE
                break
            case 'green':
                color = COLORS.GREEN
                break
            default:
                color = COLORS.BLACK
        }
        console.log('Set light', x, y, z, color)
        this.canvas.scene.lights[0] = new LightSource([x, y, z, 1], color.slice(0, 3), [0.5, 0.5, 0.5])
    }

    handleInitialRayTrace(i, j) {
        console.log('picked camera base', i, j)
        this.canvas.scene.camera.setPixelVector(i, j)
        this.rayTraceDepth = 0
    }

    handleNextRayTrace() {
        if (!this.canvas.scene.lastRayWasCast) this.rayTraceDepth++
        this.canvas.scene.castRay(normalizeRet(this.canvas.scene.camera.cameraCenter), this.rayTraceDepth)
    }

    handlePreviousRayTrace() {
        if (this.rayTraceDepth > 0) this.rayTraceDepth--
        this.canvas.scene.castRay(normalizeRet(this.canvas.scene.camera.cameraCenter), this.rayTraceDepth)
    }

    start() {
        this.canvas.start()
        this.setEventListeners()
    }
}
