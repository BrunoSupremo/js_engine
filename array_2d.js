class Array2D{
	constructor(width, height){
		this.width = width;
		this.height = height;
	}

	print(){
		let printing = "";
		for (let y=0; y < this.height; y++) {
			for (let x=0; x < this.width; x++) {
				printing += " " +this.get(x,y);
			}
			console.log(printing);
			printing = "";
		}
	}

	get(x,y){
		return this[this.get_offset(x,y)];
	}

	set(x,y,value){
		this[this.get_offset(x,y)] = value;
	}

	get_offset(x, y){
		return y*this.width + x;
	}

	get_dimension(){
		return {
			width: this.width,
			height: this.height
		}
	}

	is_boundary(x,y){
		return x == 0 || y == 0 || x == this.width-1 || y == this.height-1;
	}

	in_bounds(x,y){
		return x>=0 && x<this.width && y>=0 && y<this.height;
	}

	bound(x,y){
		if(x<0){
			x=0;
		}else{
			if(x>=this.width){
				x = this.width-1;
			}
		}
		if(y<0){
			y=0;
		}else{
			if(y>=this.height){
				y = this.height-1;
			}
		}
		return {x,y}
	}

	bound_block(x, y, width, height){
		({x,y} = this.bound(x,y));
		let x_end, y_end;
		({x:x_end,y:y_end} = this.bound(x+width -1, y+height -1));
		return {x:x, y:y, width:x_end -x+1, height:y_end -y+1}
	}

	block_in_bounds(x, y, width, height){
		if(!this.in_bounds(x,y)){
			return false;
		}
		return this.in_bounds(x +width-1, y +height-1);
	}

	adjacent_to(value, x, y){
		let offset = this.get_offset(x,y);
		if (x > 0){
			if (value == this[offset-1]){
				return true;
			}
		}

		if (y > 0){
			if (value == this[offset-this.width]){
				return true;
			}
		}

		if (x < this.width -1){
			if (value == this[offset+1]){
				return true;
			}
		}

		if (y < this.height -1){
			if (value == this[offset+this.width]){
				return true;
			}
		}
		return false;
	}

	get_random(){
		return this[Math.floor(Math.random()*this.width*this.height)]
	}

	get_random_within(x,y,range){
		x = (x -range) + Math.floor(Math.random()*range*2 +1);
		y = (y -range) + Math.floor(Math.random()*range*2 +1);

		console.log("x: "+x+" y:"+y);
		if(!this.in_bounds(x,y)){
			return null;
		}
		return this.get(x,y);
	}

	clone(){
		let dst = new Array2D(this.width, this.height);
		let size = this.width * this.height;

		for (var i = 0; i < size; i++) {
			if(this[i]){
				dst[i] = this[i];
			}
		}
		return dst;
	}

	fill(fn){
		let offset = 0;
		for (let y=0; y < this.height; y++) {
			for (let x=0; x < this.width; x++) {
				this[offset] = fn(x, y);
				offset++;
			}
		}
	}

	clear(value){
		let size = this.width * this.height;
		for (var i = 0; i < size; i++) {
			this[i] = value;
		}
	}

	set_block(x, y, width, height, value){
		let index = 0;
		let offset = this.get_offset(x, y);
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				index = offset+x;
				this[index] = value;
			}
			offset = offset + this.width;
		}
	}

	each(fn){
		let size = this.width * this.height;
		for (var i = 0; i < size; i++) {
			fn(this[i]);
		}
	}

	each_neighbor(x, y, include_diagonal, fn){
		if(!this.is_boundary(x,y)){
			return false;
		}
		let width = this.width;
		let offset = this.get_offset(x, y);
		let neighbors = [];

		let count = 4
		neighbors[0] = this[offset-1]
		neighbors[1] = this[offset+1]
		neighbors[2] = this[offset-width]
		neighbors[3] = this[offset+width]

		if (include_diagonal) {
			count = 8
			neighbors[4] = this[offset-1-width]
			neighbors[5] = this[offset+1-width]
			neighbors[6] = this[offset-1+width]
			neighbors[7] = this[offset+1+width]
		}
		for (var i = 0; i < count; i++) {
			let stop = fn(neighbors[i])
			if (stop) {
				return false;
			}
		}
	}

}