function ready() {
    let app = new App()
    app.start()
}

class App {
    constructor() {
        this.canvas = new Canvas()
        this.rayTraceDepth = 0
        this.pixel = [-5, -5, -3.5]
    }

    setEventListeners() {
        document.getElementById('sphere-add').addEventListener('click', () => this.handleAddSphere())
        document.getElementById('camera-add').addEventListener('click', () => this.handleAddCamera())
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

    handleAddCamera() {
        let x = parseFloat(document.getElementById('camera-x').value)
        let y = parseFloat(document.getElementById('camera-y').value)
        let z = parseFloat(document.getElementById('camera-z').value)

        console.log('Add camera', x, y, z)
        this.canvas.scene.add(new Frustum(COLORS.BLACK, null, [x, y, z-frustumHeight], [90, 0, 0]))
    }


    handleNextRayTrace() {
        if (!this.canvas.scene.lastRayWasCast) this.rayTraceDepth++
        this.canvas.scene.drawRay(normalizeRet(this.pixel), this.rayTraceDepth)
    }

    handlePreviousRayTrace() {
        this.rayTraceDepth--
        this.canvas.scene.drawRay(normalizeRet(this.pixel), this.rayTraceDepth)
    }

    start() {
        this.canvas.start()
        this.setEventListeners()
    }
}
