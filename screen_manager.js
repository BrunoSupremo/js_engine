class ScreenManager{
	constructor(){
		this.screen_list = {}
		this.screen_id = 0
		this.active_screen = 0
		this.canvas_reference = null
	}

	add(screen){
		this.screen_list[this.screen_id++] = screen;
	}

	set_active(id){
		this.active_screen = id;
	}

	show_screen(id){
		
	}

	start_screen(id){
		this.screen_list[id].start();
	}

	change_screen(id){
		
	}
}