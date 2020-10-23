

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
game.state.add('bootState', bootState); 
game.state.add('preState', preState); 
game.state.add('menuState', menuState); 
game.state.add('gameState', gameState); 

game.state.start('bootState');
