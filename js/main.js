
		// Create our 'main' state that will contain the game
var mainState = { preload: function() { 
	// This function will be executed at the beginning     
	// That's where we load the images and sounds
	
	 game.load.image('bird', 'game/bird.png'); 
	 game.load.image('pipe', 'game/pipe.png');
	 this.pipes = game.add.group(); 

},

create: function() {
	// This function is called after the preload function   
	// Here we set up the game, display sprites, etc.
	 game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
     game.scale.pageAlignHorizontally = true;
     game.scale.pageAlignVertically = true;
	 
	 game.stage.backgroundColor = '#71c5cf'; 
	 game.physics.startSystem(Phaser.Physics.ARCADE);
	 
	 // Display the bird at the position x=100 and y=245 
	 this.bird = game.add.sprite(100, 245, 'bird'); 
	 
	 // Add physics to the bird 
	 // Needed for: movements, gravity, collisions, etc. 
	 game.physics.arcade.enable(this.bird); 
	 
	 // Add gravity to the bird to make it fall 
	 this.bird.body.gravity.y = 1000; 
	 
	 // Call the 'jump' function when the spacekey is hit 
	 var spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR); 
	 spaceKey.onDown.add(this.jump, this);
	 
	}, 
	
	
update: function() { 

	// This function is called 60 times per second 
	// It contains the game's logic  
	
	 if (this.bird.y < 0 || this.bird.y > 490)
		 this.restartGame();
	},
}; 

// Make the bird jump 
jump: function() { 
	// Add a vertical velocity to the bird 
	this.bird.body.velocity.y = -350; 
}

// Restart the game 
restartGame: function() { 
	// Start the 'main' state, which restarts the game
	game.state.start('main'); 
}

		
		
		
		
