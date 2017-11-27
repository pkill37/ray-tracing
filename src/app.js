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
        document.getElementById('camera-add').addEventListener('click', () => this.handleSetCamera())
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

        console.log('Add camera', x, y, z)
        
        var cameraRotation = [45,45,0]
        this.canvas.scene.camera = new Camera([x,y,z], cameraRotation, [1,1,1]);
        this.canvas.scene.primaryRays = []

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
