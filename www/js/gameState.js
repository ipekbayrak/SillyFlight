var gameState = { 
	preload: function() {
		this.bglar = this.add.group();
		this.pipes = this.add.group(); 
		this.invisiblePipes = this.add.group(); 
		this.transPipes = this.add.group(); 
		this.zeminler = this.add.group(); 

		this.bird =  game.add.sprite(0, 0, '');

		this.oyunsonuelemanlari = this.add.group();
		
		this.jumpSound = game.add.audio('jump'); 
		this.yufSound = game.add.audio('yuf'); 
		this.diskSound = game.add.audio('disk'); 
		this.popSound= game.add.audio('pop');
		this.coinSound = game.add.audio('coin'); 
		
		this.pauseState = false;
		this.pauseStateJumpEnable =true;
		this.tutorialState = true;
		
		this.btvx= 0;
		this.btvy= 0;
		
		
		this.extralifeused= false;
		this.adsComplate = false;
		
		this.exitQuestionOpened = false;
		
	},
	
	create: function() { 
		this.addZemin();
		this.addBg();
		game.stage.backgroundColor = '#71c5cf'; 
		this.ground = game.add.sprite(0, bz, 'ground'); 
		this.bird = game.add.sprite(100, bz/2, 'bird2'); 
		this.tap = game.add.sprite(170, bz/2+5, 'tap');
		this.click = game.add.sprite(130, bz/2-110, 'click');
		//this.bird.alive = false;
		this.bird.animations.add("fly");
		
		//this.bird.scale.set(2);
		this.bird.smoothed = false;
		//this.bird.z=10;
		game.physics.arcade.enable(this.bird); 
		
		//var spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR); 
		//spaceKey.onDown.add(this.jump, this); 
		var tap = game.input.onTap.add(this.onTap, this);
		this.score = 0;
		this.labelScore = game.add.text(360, 80, "0", { font: "30px Arial", fill: "#ffffff" }); 
		this.labelScore.anchor.setTo(0.5);
		
		this.bird.anchor.setTo(-0.2, 0.5); 
		
		document.addEventListener("backbutton", this.onBackButton.bind(this), false);
		
		
		this.birdhit = false;
		
		document.addEventListener('onAdPresent',this.onAdPresent.bind(this), false);

	
	}, 
	
	onAdPresent: function() { 
		this.adsComplate = true;
		console.log('onAdPresent bölümüne girildi ads complate true');
		console.log('reklam izlendi. ödül ver');
	},
	
	
		
	update: function() { 
		if(this.tutorialState){
			return;
		}
	
		if ( this.bird.y < 10){ 
			this.bird.body.velocity.y=50;
			//this.restartGame(); 
			//hitPipe();
		}
		
		
	
		
				
		if (this.bird.angle < 40 && this.pauseState==false && this.bird.alive) {
			this.bird.angle += 1 ; 
		}
			
		game.physics.arcade.overlap( this.bird, this.pipes, this.hitPipe, null, this);
		game.physics.arcade.overlap( this.bird, this.invisiblePipes, this.increaseScore, null, this);		
	
		if(this.birdhit == false){
		game.physics.arcade.overlap( this.bird, this.zeminler, this.hitGround, null, this); 
		}
	},
		
			
	onTap: function (pointer, doubleTap){
		if(this.tutorialState == true){
			this.btn_pause = game.add.button(30, 80, 'pause', this.pausebtnOnClick, this, 2, 1, 0);
			this.btn_pause.anchor.setTo(0.5);
		
			this.tap.kill();
			this.click.kill();
			this.tutorialState =false;
			
			this.bird.body.gravity.y = 1000; 
			this.timer = game.time.create(false);
			this.timer.loop(1500, this.addRowOfPipes, this);
			this.timer.start();
			
			this.bird.animations.play("fly",10,true);
			
			this.zeminler.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
	   	 	this.bglar.forEach(function(p){ 
				p.body.velocity.x = -100;
			}, this);
			
			this.invisiblePipes.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
		}
		
    	if (doubleTap){
			
		}
    	else{
			
		}
		
		if(pointer.y >60 || pointer.x >60)
				this.jump();
		
	}, 
		
	jump: function() { 
		
		if (this.bird.alive == false) 
		{
			return; 
		}
		
		this.bird.body.velocity.y = -350; 
		
		var animation = game.add.tween(this.bird);
		animation.to({angle: -20}, 100);  
		animation.start(); 
		this.jumpSound.play(); 
			
	}, 
		
	restartGame: function() { 
		game.state.start('gameState'); 
		this.bird.alive = true;
	},
		
	addOnePipe: function(x, y) { 
		var pipe = game.add.sprite(x, y, 'pipeb'); 
		game.physics.arcade.enable(pipe); 
		pipe.body.velocity.x = -200; 
		pipe.checkWorldBounds = true; 
		pipe.outOfBoundsKill = true; 
		//pipe.scale.set(4);
		pipe.kusugecti=false;
		this.pipes.add(pipe); 
		
	},
	
	addOnePipeUp: function(x, y) { 
		var pipe = game.add.sprite(x, y, 'pipeu'); 
		game.physics.arcade.enable(pipe); 
		pipe.body.velocity.x = -200; 
		pipe.checkWorldBounds = true; 
		pipe.outOfBoundsKill = true; 
		//pipe.scale.set(4);
		pipe.kusugecti=false;
		this.pipes.add(pipe); 
		
	},
	
	addOnePipeDown: function(x, y) { 
		var pipe = game.add.sprite(x, y, 'piped'); 
		game.physics.arcade.enable(pipe); 
		pipe.body.velocity.x = -200; 
		pipe.checkWorldBounds = true; 
		pipe.outOfBoundsKill = true; 
		//pipe.scale.set(4);
		pipe.kusugecti=false;
		this.pipes.add(pipe); 
		
	},
	
	
		
	addRowOfPipes: function() { 
	if(bz >= 500){
		var hole = Math.floor(Math.random() * 6) + 3; 
		for (var i = 1; i <= 10; i++) {
			if (i != hole && i != hole + 1 && i != hole -1) {
				
				
				if(i== hole+2){
					this.addOnePipeDown(400, bz -  i * 50); 
				}
				
				if(i== hole -2){
					this.addOnePipeUp(400, bz -  i * 50); 
				}
				
				if(i!= hole+2 && i!= hole-2){
					this.addOnePipe(400, bz -  i * 50); 
				}
			}
		}
		
	}
	else
	{
		var hole = Math.floor(Math.random() * 5) + 2; 
		for (var i = 1; i <= 9; i++) {
			if (i != hole && i != hole + 1 && i != hole -1) {
				
				
				if(i== hole+2){
					this.addOnePipeDown(400, bz -  i * 50); 
				}
				
				if(i== hole -2){
					this.addOnePipeUp(400, bz -  i * 50); 
				}
				
				if(i!= hole+2 && i!= hole-2){
					this.addOnePipe(400, bz -  i * 50); 
				}
			}
		}
	}
		
		for (var i = 0; i< bz-500; i+= 50)
		{
			this.addOnePipe(400, i); 
		}
		
		var invisiblePipe = game.add.sprite(500,bz/2,'invisible');
		game.physics.arcade.enable(invisiblePipe); 
		invisiblePipe.body.velocity.x = -200; 
		invisiblePipe.checkWorldBounds = true; 
		
		invisiblePipe.anchor.setTo(0.5);
		this.invisiblePipes.add(invisiblePipe); 
	},
		
	increaseScore: function() { 
		
		this.coinSound.play();
		this.score += 1; 
		this.labelScore.text = this.score; 
		
		this.invisiblePipes.forEach(function(p){ 
			if(p.x<=200){
				p.kill();
			}
		}, this);
	}, 
		
	hitPipe: function() { 
		if (this.bird.alive == false) {
			return; 
		}
		
		this.invisiblePipes.forEach(function(p){ 
				p.kill();
		}, this);
		
		this.yufSound.play();
		
		this.bird.loadTexture('birdk');
		
		this.bird.alive = false; 
		this.timer.stop();
		//game.time.events.remove(this.timer);
		this.bird.animations.stop("fly");
		
		this.pipes.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
			
		this.zeminler.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
			
	    this.bglar.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
		
		this.btn_pause.kill();
			
	}, 
	
	hitGround: function() { 
		this.invisiblePipes.forEach(function(p){ 
				p.body.velocity.x=0;
		}, this);
		
		this.bestscore = localStorage.getItem('score');
		if(null == this.bestscore)
		{
    		this.bestscore = 0;
		}
		
		this.bird.loadTexture('birdk');
		
		if(this.bestscore<this.score){
			localStorage.setItem('score', this.score);
		}
		
		this.birdhit=true;
		
		this.bird.body.velocity.x=0;
		this.bird.body.velocity.y=0;
		this.bird.body.gravity.y = 0;
		
		this.bird.alive = false; 
		this.timer.stop();
		//game.time.events.remove(this.timer);
		this.bird.animations.stop("fly");
		
		this.pipes.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
			
		this.zeminler.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
			
	    this.bglar.forEach(function(p){ 
			p.body.velocity.x = 0;
		}, this);
	
		this.diskSound.play();
				
		this.startMenu();
		
		this.btn_pause.kill();
	}, 
	
		
	addZemin: function() { 
		for(var i=0;i<=400;i+=100){
			this.newZemin(i,false);
		}
				
		
	},
		
	newZemin: function(x,move) { 
		var zemin = game.add.sprite(x, bz-10, 'zemin'); 
		game.physics.arcade.enable(zemin);
		if(move){
			zemin.body.velocity.x = -200; 
		}
		this.zeminler.add(zemin);
		zemin.checkWorldBounds = true; 
		zemin.events.onOutOfBounds.add(this.zeminOob, this);
		
	},
		
	zeminOob: function(item){
		this.newZemin(item.x+500,true);
		item.kill();
	},
	
	addBg: function(){
		for(var i=0;i<=400;i+=100){
			this.newBg(i,false);
		}
	},
	
	BgOob: function(item){
		
		this.newBg(item.x+495,true);
		item.kill();
	},
	
	newBg: function(x,move){
		var bg = game.add.sprite(x,bz-110, 'bg'); 
		game.physics.arcade.enable(bg); 
		if(move){
			bg.body.velocity.x = -100; 
		}
		bg.checkWorldBounds = true; 
		bg.events.onOutOfBounds.add(this.BgOob, this);
		bg.z=0;
		this.bglar.add(bg);
		bg.sendToBack() ;
		bg.moveDown();
	},
	
	startMenu: function(){
		showBanner();
		
		this.gameover = game.add.sprite(200, bz-400, 'gameover');
		//this.gameover.scale.set(2);
		this.gameover.anchor.setTo(0.5);
		this.gameover.smoothed=false;
		
		this.scorebest = game.add.sprite(200, bz-300, 'scorebest');
		this.scorebest.anchor.setTo(0.5);
		//this.scorebest.scale.set(4);
		this.scorebest.smoothed=false;
		
		this.btn_play = game.add.button(150, bz-150, 'playico', this.playOnClick, this, 2, 1, 0);
		this.btn_play.anchor.setTo(0.5);
		
		this.btn_back = game.add.button(250, bz-150, 'backbtn', this.backOnClick, this, 2, 1, 0);
		this.btn_back.anchor.setTo(0.5);
		this.btn_back.smoothed=false;
		/*
		if (this.extralifeused == false)
		{
			this.btn_ads = game.add.button(200, bz-50, 'adsico', this.adsOnClick, this, 2, 1, 0);
			this.btn_ads.anchor.setTo(0.5);
			this.btn_ads.smoothed=false;
		}
		*/
 
		
		this.labelbestscore = game.add.text(230, bz-320, this.bestscore, { font: "30px Arial", fill: "#ffffff" });
		this.labelcurrentscore = game.add.text(100, bz-320, this.score, { font: "30px Arial", fill: "#ffffff" });
		
		this.oyunsonuelemanlari.add(this.gameover);
		this.oyunsonuelemanlari.add(this.scorebest);
		this.oyunsonuelemanlari.add(this.btn_play);
		this.oyunsonuelemanlari.add(this.btn_back);
		//this.oyunsonuelemanlari.add(this.btn_ads);
		this.oyunsonuelemanlari.add(this.labelbestscore);
		this.oyunsonuelemanlari.add(this.labelcurrentscore);
	},
	
	playOnClick: function(){
		AdMob.hideBanner();
		this.popSound.play();
		game.state.start('gameState'); 
	},
	
 
	
	pausebtnOnClick: function(){
		this.popSound.play();
		
		if(this.pauseState == false){
			showBanner();
			
			if(this.bird.alive==false){
				return;
			}
			
			this.invisiblePipes.forEach(function(p){ 
				p.body.velocity.x = 0;
			}, this);
			
			this.btn_pause.loadTexture('play');
			
			this.popSound.play();
			this.pauseState = true;
		
			this.timer.pause();
			this.btvx= this.bird.body.velocity.x;
			this.bird.body.velocity.x =0;
			this.btvy= this.bird.body.velocity.y;
			this.bird.body.velocity.y =0;
			
			this.bird.body.gravity.y = 0;
		
			this.bird.alive = false; 
			
			this.bird.animations.stop("fly");
		
			this.pipes.forEach(function(p){ 
				p.body.velocity.x = 0;
			}, this);
			
			this.zeminler.forEach(function(p){ 
				p.body.velocity.x = 0;
			}, this);
			
	    	this.bglar.forEach(function(p){ 
				p.body.velocity.x = 0;
			}, this);
		}
		else{
			AdMob.hideBanner();
			this.invisiblePipes.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
			this.popSound.play();
			this.pauseState = false;
			
			this.timer.resume();
			
			this.btn_pause.loadTexture('pause');
			
			this.bird.body.gravity.y = 1000;
			
			this.bird.body.velocity.x = this.btvx;
			this.bird.body.velocity.y = this.btvy;
		
			this.bird.alive = true; 
			
			this.bird.animations.play("fly",10,true);
		
			var tap = game.input.onTap.add(this.onTap, this);
			
			this.pipes.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
			this.zeminler.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
	    	this.bglar.forEach(function(p){ 
				p.body.velocity.x = -100;
			}, this);
			
			this.transPipes.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
		}
	},
	
	onBackButton: function(e){
		this.popSound.play();
		
		
		
		if(this.bird.alive == true && this.pauseState == false){
			this.pausebtnOnClick();
			return;
		}
		
		if(this.pauseState == true){
			if(this.exitQuestionOpened == false){
				this.exitQuestionOpened = true;
				e.preventDefault();
				navigator.notification.confirm('Are you sure you want to exit app?',this.onConfirm,'Exit',['No','Yes']);
			}
		}
		
		
		
	}, 
	
	createExitMenu: function(){
		
		
		
		this.exitmenu = game.add.sprite(200, bz-300, 'exitmenu');
		this.exitmenu.anchor.setTo(0.5);
		this.exitmenu.scale.set(4);
		this.exitmenu.smoothed=false;
		
		this.btn_yes = game.add.button(150, bz-200, 'yes', this.yesOnClick, this, 2, 1, 0);
		this.btn_yes.anchor.setTo(0.5);
		
		this.btn_no = game.add.button(150, bz-200, 'no', this.noOnClick, this, 2, 1, 0);
		this.btn_no.anchor.setTo(0.5);
		
		
	},
	
	backOnClick: function(){
		this.popSound.play();
		AdMob.hideBanner();
		game.state.start('menuState');
	},
	
	
	adsOnClick: function(){
		this.popSound.play();
		this.extralifeused = true;
		this.btn_ads.pendingDestroy = true;
		document.addEventListener('onAdDismiss', this.gameContinue.bind(this));
		AdMob.showRewardVideoAd();
		 
	},
	
	onConfirm: function(buttonIndex){
		if (buttonIndex == 2){
			this.exitQuestionOpened = false;
			if (navigator.app) {
				navigator.app.exitApp();
			} else if (navigator.device) {
				navigator.device.exitApp();
			} else {
				window.close();
			}
			MOForceAppClose.forceAppClose();
			navigator.app.exitApp();
		}
		else{
			this.exitQuestionOpened = false;
			return;
		}
	},
	
	gameContinue: function(){
		
		console.log('kapandı. son okumalar');
		
		if (this.adsComplate == true){
			
			
			console.log('reklam izlenmiş ödülü veriliyor');
			AdMob.hideBanner();
			  
			this.oyunsonuelemanlari.forEach(function(p){ 
				p.kill();
			}, this);
			
			
			this.pauseState = false;
			this.birdhit=false;
			this.tutorialState = true;
			
			 
			
			this.bird.loadTexture('bird2');
			this.bird.x =100;
			this.bird.y =bz/2;
			 
			this.tap = game.add.sprite(170, bz/2+5, 'tap');
			
			
			this.bird.alive = true; 
			this.bird.animations.add("fly");
			this.bird.smoothed = false;	 
			game.physics.arcade.enable(this.bird); 
			

			//var tap = game.input.onTap.add(this.onTap, this);
			
			this.pipes.forEach(function(p){ 
				p.alpha = 0.2;
				this.transPipes.add(p);
				this.pipes.remove(p);
				//p.body.velocity.x = -200;
			}, this);
			
			this.zeminler.forEach(function(p){ 
				p.body.velocity.x = -200;
			}, this);
			
			this.bglar.forEach(function(p){ 
				p.body.velocity.x = -100;
			}, this);
			
			
		}
		else
		{
			
			 console.log('reklam izlenmemiş');
		}
		
		
			
	},
};
