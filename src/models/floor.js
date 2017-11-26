class Floor extends Model {
    constructor(vertices, colors, mvMatrix, translation, rotation, scale) {
        super(vertices, colors, mvMatrix, gl.TRIANGLES, translation, rotation, scale);
    }
}

function getCheckeredFloor(dimen,size){
	var coord_square = size/2
	//origin at center
	let base_vertices = [
		 -coord_square,  0.0,   coord_square,
		 coord_square,  0.0,   coord_square,
		 -coord_square,  0.0,   -coord_square,

		 coord_square,  0.0,  coord_square,
		 coord_square,  0.0,  -coord_square,
		 -coord_square,  0.0, -coord_square,
	];

	let base_color2= repeat(COLORS.BLACK.slice(0,3), base_vertices.length / 3);
	let base_color1 = repeat(COLORS.GREY.slice(0,3), base_vertices.length / 3)

	let vertices = []
	let colors = []
	let floor_v = -dimen*size / 2;

	for(var i = 0; i < dimen; i++) {
		for(var j = 0; j < dimen; j++) {
	 		vertices.push(squareAt(base_vertices,[floor_v+j*size,0,floor_v+i*size]))
	 		colors.push((j+i)%2 == 0 ? base_color1 : base_color2);
	 	}
	}

	vertices = flatten(vertices)
	colors = flatten(colors)

	return {
		"vertices": vertices,
		"colors": colors,
	}
}

