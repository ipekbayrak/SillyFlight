var bootState = { 
	
	init: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     	game.scale.pageAlignHorizontally = true;
     	game.scale.pageAlignVertically = true;
		
	},
	
	preload: function() { 
		game.load.image('loadb', 'game/loadb.png'); 
		game.load.image('load', 'game/load.png'); 
		game.load.image('logo', 'game/logo.png'); 
		
	},
	
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE); 
		game.state.start("preState");
		
	}, 
		
	update: function() { 
			
	},
			
 	onTap: function (pointer, doubleTap){
    		
	}, 
		
};
	
	
