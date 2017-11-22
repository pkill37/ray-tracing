// Ambient coef.
var kAmbi = [ 0.2, 0.2, 0.2 ];

// Difuse coef.
var kDiff = [ 0.7, 0.7, 0.7 ];

// Specular coef.
var kSpec = [ 0.7, 0.7, 0.7 ];

// Phong coef.
var nPhong = 100;

// Phong Illumination Model
// Computing the illumination and rendering the model

function computeIllumination(mvMatrix) {
	// Clearing the colors array
	for(var i = 0; i < colors.length; i++) {
		colors[i] = 0.0;
	}
	
    // SMOOTH-SHADING 
    // Compute the illumination for every vertex
    // Iterate through the vertices
    for(var vertIndex = 0; vertIndex < vertices.length; vertIndex += 3) {	
		// For every vertex
		// GET COORDINATES AND NORMAL VECTOR
		var auxP = vertices.slice( vertIndex, vertIndex + 3 );
		var auxN = normals.slice( vertIndex, vertIndex + 3 );

        // CONVERT TO HOMOGENEOUS COORDINATES
		auxP.push( 1.0 );
		auxN.push( 0.0 );
		
        // APPLY CURRENT TRANSFORMATION
        var pointP = multiplyPointByMatrix( mvMatrix, auxP );
        var vectorN = multiplyVectorByMatrix( mvMatrix, auxN );
        
        normalize( vectorN );

		// VIEWER POSITION
		var vectorV = vec3();
		
		if (projectionType == 0) {
			// Orthogonal 
			vectorV[2] = 1.0;
		} else {
		    // Perspective
		    // Viewer at ( 0, 0 , 0 )
			vectorV = symmetric( pointP );
		}
		
        normalize(vectorV);

	    // Compute the 3 components: AMBIENT, DIFFUSE and SPECULAR
	    // FOR EACH LIGHT SOURCE
	    
	    for(var l = 0; l < lightSources.length; l++ ) {
			if(lightSources[l].isOff()) {
				continue;
			}
			
	        // INITIALIZE EACH COMPONENT, with the constant terms
		    var ambientTerm = vec3();
		    var diffuseTerm = vec3();
		    var specularTerm = vec3();
		
		    // For the current light source
		    ambient_Illumination = lightSources[l].getAmbIntensity();
		    int_Light_Source = lightSources[l].getIntensity();
		    pos_Light_Source = lightSources[l].getPosition();
		    
		    // Animating the light source, if defined
		    var lightSourceMatrix = mat4();
		    
		    // COMPLETE THE CODE FOR THE OTHER ROTATION AXES
		    
		    if( lightSources[l].isRotYYOn() ) {
				lightSourceMatrix = mult( 
						lightSourceMatrix, 
						rotationYYMatrix( lightSources[l].getRotAngleYY() ) );
			}
			
	        for( var i = 0; i < 3; i++ ) {
			    // AMBIENT ILLUMINATION --- Constant for every vertex
			    ambientTerm[i] = ambient_Illumination[i] * kAmbi[i];
	            diffuseTerm[i] = int_Light_Source[i] * kDiff[i];
	            specularTerm[i] = int_Light_Source[i] * kSpec[i];
	        }
	    
	        // DIFFUSE ILLUMINATION
	        var vectorL = vec4();
	
	        if (pos_Light_Source[3] == 0.0) {
	            // DIRECTIONAL Light Source
	            vectorL = multiplyVectorByMatrix(lightSourceMatrix, pos_Light_Source);
	        } else {
	            // POINT Light Source
	            // TODO : apply the global transformation to the light source?
	            vectorL = multiplyPointByMatrix(lightSourceMatrix, pos_Light_Source);
	
				for(var i = 0; i < 3; i++) {
	                vectorL[i] -= pointP[i];
	            }
	        }

			// Back to Euclidean coordinates
			vectorL = vectorL.slice(0, 3);
	        normalize(vectorL);

	        var cosNL = dotProduct(vectorN, vectorL);

            // No direct illumination !!
	        if(cosNL < 0.0) cosNL = 0.0;

	        // SEPCULAR ILLUMINATION 

	        var vectorH = add(vectorL, vectorV);
	        normalize(vectorH);
	        var cosNH = dotProduct(vectorN, vectorH);

			// No direct illumination or viewer not in the right direction
	        if((cosNH < 0.0) || (cosNL <= 0.0)) cosNH = 0.0;
	
	        // Compute the color values and store in the colors array
	        var tempR = ambientTerm[0] + diffuseTerm[0] * cosNL + specularTerm[0] * Math.pow(cosNH, nPhong);
	        var tempG = ambientTerm[1] + diffuseTerm[1] * cosNL + specularTerm[1] * Math.pow(cosNH, nPhong);
	        var tempB = ambientTerm[2] + diffuseTerm[2] * cosNL + specularTerm[2] * Math.pow(cosNH, nPhong);
	        
			colors[vertIndex] += tempR;
			colors[vertIndex] = Math.min(colors[vertIndex], 1.0);
	        
			colors[vertIndex + 1] += tempG;
			colors[vertIndex + 1] = Math.min(colors[vertIndex + 1], 1.0);
			
			colors[vertIndex + 2] += tempB;
			colors[vertIndex + 2] = Math.min(colors[vertIndex + 2], 1.0);
	    }
	}
}

