class TileMap{
	constructor(width, height, tile_size){
		this.tile_size = tile_size;
		this.tiles = new Array2D(width, height);
		/*
		this.tiles = {
			image: "image.png",
		}
		*/
		this.tiles.clear();
	}

	get_tile(x,y){
		return this.tiles.get(x,y);
	}

	get_neighbors(x,y){
		let neighbors = [];
		if(this.in_bounds(x, y-1)){
			neighbors.push(x, y-1);
		}
		if(this.in_bounds(x, y+1)){
			neighbors.push(x, y+1);
		}
		if(this.in_bounds(x-1, y)){
			neighbors.push(x-1, y);
		}
		if(this.in_bounds(x+1, y)){
			neighbors.push(x+1, y);
		}
		return neighbors;
	}

	get_random_tile(){
		return this.tiles.get_random();
	}
	get_random_tile_within(x,y,range){
		return this.tiles.get_random_within();
	}

	in_bounds(x,y){
		return this.tiles.in_bounds(x,y);
	}

	update(){
		// let size = this.tiles.get_dimension();
		// size = size[0]*size[1];
		// for (var i = 0; i < size; i++) {
		// 	this.tiles.needs_redraw = true;
		// }
	}

	draw(ctx){		
		let {width, height} = this.tiles.get_dimension();
		
		for (let y=0; y < height; y++) {
			for (let x=0; x < width; x++) {
				ctx.drawImage(
					this.get_tile(x,y).image,
					x * this.tile_size,
					y * this.tile_size
					);
			}
		}
	}
}