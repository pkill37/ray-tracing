function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;

    return result;
}

// Column-major 1D representation

function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}

//  Vector Constructor

function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

// 4 x 4 matrix - Constructor

function mat4()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    
    switch ( v.length ) {
        
        case 0:
            v[0] = 1;
            
        case 1:
            m = [
                    vec4( v[0], 0.0,  0.0,   0.0 ),
                    vec4( 0.0,  v[0], 0.0,   0.0 ),
                    vec4( 0.0,  0.0,  v[0],  0.0 ),
                    vec4( 0.0,  0.0,  0.0,  v[0] )
                ];
        break;

        default:
            m.push( vec4(v) );  v.splice( 0, 4 );
            m.push( vec4(v) );  v.splice( 0, 4 );
            m.push( vec4(v) );  v.splice( 0, 4 );
            m.push( vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

// Matrix Multiplication 

function mult( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( [] );

            for ( var j = 0; j < v.length; ++j ) {
                var sum = 0.0;
                for ( var k = 0; k < u.length; ++k ) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push( sum );
            }
        }

        result.matrix = true;

        return result;
    }
    else {
        if ( u.length != v.length ) {
            throw "mult(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] * v[i] );
        }

        return result;
    }
}

//  Constructing the 4 x 4 transformation matrices

function rotationXXMatrix( degrees )
{
    m = mat4();

    m[1][1] = Math.cos(degrees);
    m[1][2] = -Math.sin(degrees);
    m[2][1] = Math.sin(degrees);
    m[2][2] = Math.cos(degrees);

    return m;
}

function rotationYYMatrix( degrees )
{
    m = mat4();

    m[0][0] = Math.cos(degrees);
    m[0][2] = Math.sin(degrees);
    m[2][0] = -Math.sin(degrees);
    m[2][2] = Math.cos(degrees);

    return m;
}

function rotationZZMatrix( degrees )
{
    m = mat4();

    m[0][0] = Math.cos(degrees);
    m[0][1] = Math.sin(-degrees);
    m[1][0] = Math.sin(degrees);
    m[1][1] = Math.cos(degrees);

    return m;
}

function scalingMatrix( sx, sy, sz )
{
    m = mat4();

    m[0][0] = sx;
	m[1][1] = sy;
	m[2][2] = sz;

    return m;
}

function translationMatrix( tx, ty, tz )
{
    m = mat4();

    m[0][3] = tx;
    m[1][3] = ty;
    m[2][3] = tz;

    return m;
}
