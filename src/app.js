function ready() {
    let app = new App()
    app.start()
}

class App {
    constructor() {
        this.canvas = new Canvas()
    }

    setEventListeners() {
        document.getElementById('sphere-add').addEventListener('click', () => this.handleAddSphere())
        document.getElementById('camera-add').addEventListener('click', () => this.handleAddCamera())
    }

    handleAddSphere() {
        let x = parseFloat(document.getElementById('sphere-x').value)
        let y = parseFloat(document.getElementById('sphere-y').value)
        let z = parseFloat(document.getElementById('sphere-z').value)
        let color = document.getElementById('sphere-color').value
        console.log('Add sphere', x, y, z, color)
        
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

        this.canvas.scene.add(new Sphere(color, null, [x, y, z]))
    }

    handleAddCamera() {
        let x = parseFloat(document.getElementById('camera-x').value)
        let y = parseFloat(document.getElementById('camera-y').value)
        let z = parseFloat(document.getElementById('camera-z').value)

        console.log('Add camera', x, y, z)
        this.canvas.scene.add(new Frustum(COLORS.BLACK, null, [x, y, z-frustumHeight], [90, 0, 0]))
    }

    start() {
        this.canvas.start()
        this.setEventListeners()
    }
}
