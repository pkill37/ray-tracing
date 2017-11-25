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

        console.log('You clicked the shit out of this button', x, y, z)
        this.canvas.scene.add(new Sphere(COLORS.YELLOW, null, [x, y, z]))
    }

    handleAddCamera() {
        let x = parseFloat(document.getElementById('camera-x').value)
        let y = parseFloat(document.getElementById('camera-y').value)
        let z = parseFloat(document.getElementById('camera-z').value)

        console.log('You clicked the shit out of this button', x, y, z)
        this.canvas.scene.add(new Frustum(COLORS.YELLOW, null, [x, y, z]))
    }

    start() {
        this.canvas.start()
        this.setEventListeners()
    }
}
