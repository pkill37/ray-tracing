const fragmentShaderSource = `
    precision mediump float;
	varying vec4 fColor;

    void main(void) {
		// Using the passed vertex color
		gl_FragColor = fColor;
	}
`;

