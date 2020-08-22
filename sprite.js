class Sprite{
	constructor(source, size, position){
		this.source = source;
		this.size = {
			width: size.width,
			height: size.height
		}
		this.position = {
			x: position.x,
			y: position.y
		}
		this.position_offset = {
			x: 0,
			y: 0
		}
		this.flip = {
			horizontal: false,
			vertical: false
		}
	}

	update(){
		
	}

	flip(axis, flip){
		this.flip[axis] = flip
	}

	draw(ctx){
		let offset_h = 0;
		let offset_v = 0;
		let flip_h = 1;
		let flip_v = 1;
		if(this.flip.horizontal){
			offset_h = this.size.width;
			flip_h = -1;
		}
		if(this.flip.vertical){
			offset_v = this.size.height;
			flip_v = -1;
		}
		ctx.drawImage(
			this.source,
			0, 0,
			this.size.width, this.size.height,
			this.position.x + offset_h, this.position.y + offset_v,
			this.size.width * flip_h, this.size.height * flip_v
			);
	}
}