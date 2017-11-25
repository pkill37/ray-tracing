class LightSource {
    constructor(position, intensity, ambientIntensity) {
        // A new light source is always on
        this.isOn = true;

        // And is directional
        this.position = position;

        // White light
        this.intensity = intensity;

        // Ambient component
        this.ambientIntensity = ambientIntensity;

        // Animation controls
        this.rotXXOn = false;
        this.rotYYOn = false;
        this.rotZZOn = false;

        // Rotation angles
        this.rotAngleXX = 0.0;
        this.rotAngleYY = 0.0;
        this.rotAngleZZ = 0.0;

        // NEW --- Rotation speed factor - Allow different speeds
        this.rotationSpeed = 1.0;
    }
}

