class Entity{
	constructor(){
		this.position = {
			x: 0,
			y: 0
		}
		this.sprite = null;
	}

	set_sprite_image(src){
		this.sprite.source = new Image();
		this.sprite.source.src = src;
	}
	update(){
		this.sprite.position = this.position;
	}

	draw(ctx){
		this.sprite.draw(ctx);
	}
}