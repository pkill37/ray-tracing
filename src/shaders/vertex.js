const vertexShaderSource = `
    attribute vec3 vPosition;
    attribute vec3 vColor;
    attribute vec3 vNormal;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform vec4 lightPosition;
    uniform vec4 viewerPosition;
    uniform vec3 ambientProduct;
    uniform vec3 diffuseProduct;
    uniform vec3 specularProduct;
    uniform float shininess;

    varying vec4 fColor;

    void main(void) {
        // To allow seeing the points drawn
        gl_PointSize = 5.0;

        // Just converting the (x,y,z) vertices to Homogeneous Coord.
        // And multiplying by the Projection and the Model-View matrix
        gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 1.0);

        // Phong Illumination Model
        // pos is vertex position after applying the global transformation
        vec3 pos = (uMVMatrix * vec4(vPosition, 1.0)).xyz;
        vec4 lightPos = uMVMatrix * lightPosition;

        // vector from vertex position to light source
        vec3 L;

        // check for directional light
        if(lightPos.w == 0.0)
            L = normalize( lightPos.xyz );
        else
            L = normalize( lightPos.xyz - pos );

        // Vector from the vertex position to the eye
        vec3 E;

        // The viewer is at the origin or at an indefinite distance
        // on the ZZ axis
        if(viewerPosition.w == 1.0)
            // At the origin
            E = -normalize( pos );
        else
            // On the ZZ axis
            E = vec3(0,0,1);

        // Halfway vector
        vec3 H = normalize( L + E );

        // Transform vertex normal into eye coordinates
        vec4 N = normalize( uMVMatrix * vec4(vNormal, 0.0));

        // Compute terms in the illumination equation
        // Ambient component is constant
        vec4 ambient = vec4( vColor, 1.0 );

        // Diffuse component
        float dotProductLN = L[0] * N[0] + L[1] * N[1] + L[2] * N[2];
        float cosNL = max( dotProductLN, 0.0 );
        vec4  diffuse = vec4( diffuseProduct * cosNL, 1.0 );

        // Specular component
        float dotProductNH = N[0] * H[0] + N[1] * H[1] + N[2] * H[2];
        float cosNH = pow( max( dotProductNH, 0.0 ), shininess );
        vec4 specular = vec4( specularProduct * cosNH, 1.0 );

        if( dotProductLN < 0.0 ) {
            specular = vec4(0.0, 0.0, 0.0, 1.0);
        }

        // Adding the 3 components
        fColor = ambient + diffuse + specular;
    }
`;

