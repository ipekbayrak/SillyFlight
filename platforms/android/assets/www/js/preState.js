var preState = { 
	preload: function() { 
		game.stage.backgroundColor = '#ffffff';
		this.loadb = game.add.sprite(game.world.centerX, y-90, 'loadb');
		this.loadb.anchor.setTo(0.5);
		
		
		this.loadf = game.add.sprite(game.world.centerX-160, y-90, 'load');
		//this.loadf.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.loadf);
		
		this.logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		this.logo.anchor.setTo(0.5);
		this.logo.width = game.world.centerX*2;
		this.logo.height = game.world.centerY*2;
		//this.logo.fixedToCamera = true;
		 
		
		
		game.load.image('bird', 'game/bird.png'); 
		game.load.spritesheet('bird2', 'game/birds.png',50,40,4); 
		game.load.image('pipe', 'game/pipe.png');
		game.load.image('zemin', 'game/zemin2.png');
		game.load.audio('jump', 'game/jump.wav'); 
		game.load.audio('yuf', 'game/yuf.wav'); 
		game.load.audio('disk', 'game/disk.wav'); 
		game.load.audio('pop', 'game/poo.mp3'); 
		game.load.audio('coin', 'game/coin.wav'); 
		
		game.load.image('play', 'game/play.png'); 
		game.load.image('playa', 'game/playa.png'); 
		game.load.image('score', 'game/score.png'); 
		game.load.image('menuscore', 'game/menuscore.png'); 
		
		game.load.image('bg', 'game/bg.png');
		
		game.load.image('pipeb', 'game/pipe1.png');
		game.load.image('pipeu', 'game/pipe2.png');
		game.load.image('piped', 'game/pipe3.png');
		
		game.load.image('birdk', 'game/bx.png');
		game.load.image('click', 'game/click.png');
		game.load.image('tap', 'game/tap.png');
		
		game.load.image('pause', 'game/pause.png');
		game.load.image('scorebest', 'game/scorebest.png');
		game.load.image('gameover', 'game/gameover.png');
		
		game.load.image('scoreico', 'game/scoreico.png');
		game.load.image('share', 'game/share.png');
		game.load.image('playagain', 'game/playagain.png');
		game.load.image('start', 'game/start.png');
		
		game.load.image('backbtn', 'game/backbtn.png');
		game.load.image('playico', 'game/playico.png');
		game.load.image('start', 'game/start.png');
		game.load.image('no', 'game/no.png');
		game.load.image('yes', 'game/yes.png');
		game.load.image('invisible', 'game/invisible.png');
		game.load.image('ground', 'game/ground.png');
		game.load.image('adsico', 'game/adsico.png');
		this.admobid = {};
 
		if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
			this.admobid = {
			  banner: 'ca-app-pub-3312738864772003/7824586808', // or DFP format "/6253334/dfp_example_ad"
			  interstitial: 'ca-app-pub-3940256099942544/6300978111'
			};
		} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
			this.admobid = {
			  banner: 'ca-app-pub-3312738864772003/7824586808', // or DFP format "/6253334/dfp_example_ad"
			  interstitial: 'ca-app-pub-3940256099942544/6300978111'
			};
		} else { // for windows phone
			this.admobid = {
			  banner: 'ca-app-pub-3312738864772003/7824586808', // or DFP format "/6253334/dfp_example_ad"
			  interstitial: 'ca-app-pub-3940256099942544/6300978111'
			};
		  }
		  
		createBanner();
		
		createRewarded();
		
		this.isPass = false;
		this.timer = game.time.create(false);
		this.timer.loop(1500, this.passSplashScreen, this);
		this.timer.start();
		
		},
	
	create: function() { 
	
		
		
		}, 
		
	update: function() { 
	
			if(this.isPass == true)
			{
				game.state.start('menuState');
			}
							
		},
		
	passSplashScreen: function() { 
			this.isPass = true;
		},
		
	
};
