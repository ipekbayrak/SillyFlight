var menuState = { 
	preload: function() { 
		this.exitMenu=false;
		this.popSound= game.add.audio('pop');
		
		},
	
	create: function() { 
		game.stage.backgroundColor = '#71c5cf'; 
		this.bird = game.add.sprite(200, bz/3, 'bird2'); 
		this.bird.animations.add("fly");
		this.bird.animations.play("fly",10,true);
		//this.bird.scale.set(3);
		this.bird.smoothed = false;
		this.bird.anchor.setTo(0.5);
		//this.bird.body.setSize(16, 16, 200, 150);
		this.addZemin();
		this.addBg();
		this.yonyukari = true;
		
		this.btn_play = game.add.button(150, (bz*2)/3, 'playico', this.playOnClick, this, 2, 1, 0);
		this.btn_play.anchor.setTo(0.5);
		this.btn_play.smoothed = false;
		this.btn_score = game.add.button(250, (bz*2)/3, 'scoreico', this.scoreOnClick, this, 2, 1, 0);
		this.btn_score.anchor.setTo(0.5);
		this.btn_score.smoothed = false;
		
		 
		document.addEventListener("backbutton", function(e){
			e.preventDefault();
		    navigator.notification.confirm('Are you sure you want to exit app?',this.onConfirm,'Exit',['No','Yes']);
		    
		}, false);
		
		this.ground = game.add.sprite(0, bz, 'ground'); 

		/*AdMob.prepareRewardVideoAd({
			adId: 'ca-app-pub-3940256099942544/6300978111',
			autoShow: false
		});
		 */
		 
		
	/*				
		document.addEventListener('onAdLoaded',function(e){                   
                   if(e.adType == "rewardvideo")
                        AdMob.showRewardVideoAd();
                 });a
				 
		document.addEventListener('onAdDismiss',function(e){
                       if(e.adType == "rewardvideo")
                          // alert("dissmiss OK!!!");
                          // some code to do stuff and then:
                            AdMob.prepareRewardVideoAd({
								adId: 'ca-app-pub-3312738864772003/8990242178',
								autoShow: false,
								isTesting: true
							 },function(e) {
								alert('SUCCESS ' + e );
								console.log(e);
							}, function(e) {
								alert('FAIL ' + e);
								console.log(e);
							});
                 });
				 
 	
		*/
  
/* 		if(AdMob) AdMob.prepareInterstitial({
			adId: 'ca-app-pub-3940256099942544/6300978111',
			isTesting: true,
			autoShow: true
		  });
*/
		
/*n: AdMob, onAdWillPresent, {'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdWillPresent'}
D/CordovaWebViewImpl: >>> loadUrl(javascript:cordova.fireDocumentEvent('onAdWillPresent',{'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdWillPresent'});)
D/GenericAdPlugin: AdMob, onAdPresent, {'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdPresent','rewardType':'reward','rewardAmount':1}
D/CordovaWebViewImpl: >>> loadUrl(javascript:cordova.fireDocumentEvent('onAdPresent',{'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdPresent','rewardType':'reward','rewardAmount':1});)
I/Ads: Ad closing.
I/Ads: Ad closing.
D/GenericAdPlugin: AdMob, onAdDismiss, {'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdDismiss'}
D/CordovaWebViewImpl: >>> loadUrl(javascript:cordova.fireDocumentEvent('onAdDismiss',{'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdDismiss'});)
W/Ads: The webview */
		
/*
D/GenericAdPlugin: AdMob, onAdWillPresent, {'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdWillPresent'}
D/CordovaWebViewImpl: >>> loadUrl(javascript:cordova.fireDocumentEvent('onAdWillPresent',{'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdWillPresent'});)
I/Ads: Ad closing.
I/Ads: Ad closing.
D/GenericAdPlugin: AdMob, onAdDismiss, {'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdDismiss'}
D/CordovaWebViewImpl: >>> loadUrl(javascript:cordova.fireDocumentEvent('onAdDismiss',{'adNetwork':'AdMob','adType':'rewardvideo','adEvent':'onAdDismiss'});)
*/
		
		}, 
		
	update: function() { 
		if (this.bird.y < bz/3-10) {
			this.yonyukari = true; 
		}
		if (this.bird.y > bz/3+10) {
			this.yonyukari = false; 
		}
		
		if (this.yonyukari) {
			this.bird.y += 1; 
		}
		else{
			this.bird.y -= 1; 
		}
		
		
		},
		
	playOnClick: function(){
		this.popSound.play();
		game.state.start('gameState');
	},
	
	scoreOnClick: function(){
		this.popSound.play();
		game.state.start('scoreState');
	},
	
	pauseOnClick: function(){
		this.popSound.play();
	},
	
	addZemin: function() { 
		for(var i=0;i<=400;i+=100){
			var zemin = game.add.sprite(i,bz-10, 'zemin'); 
			game.physics.arcade.enable(zemin); 
			zemin.body.velocity.x = -200; 
			zemin.checkWorldBounds = true; 
			zemin.events.onOutOfBounds.add(this.zeminOob, this);
		}
				
		
	},
		
	newZemin: function(x) { 
		var zemin = game.add.sprite(x,bz-10, 'zemin'); 
		game.physics.arcade.enable(zemin); 
		zemin.body.velocity.x = -200; 
		zemin.checkWorldBounds = true; 
		zemin.events.onOutOfBounds.add(this.zeminOob, this);
		
	},
		
	zeminOob: function(item){
		this.newZemin(item.x+500);
		item.kill();
	},
	
	addBg: function(){
		for(var i=0 ; i<=600 ; i+=100){
			this.newBg(i);
		}
	},
	
	BgOob: function(item){
		this.newBg(item.x + 700);
		item.kill;
	},
	
	newBg: function(x){
		var bg = game.add.sprite(x,bz-110, 'bg'); 
		game.physics.arcade.enable(bg); 
		bg.body.velocity.x = -100; 
		bg.checkWorldBounds = true; 
		bg.smoothed=false;
		bg.events.onOutOfBounds.add(this.BgOob, this);
	},
		
	scoreOnClick: function(){
		
		
		
		this.popSound.play();
		this.scorebest = game.add.sprite(200, bz/2, 'menuscore');
		this.scorebest.anchor.setTo(0.5);
		this.scorebest.scale.set(4);
		this.scorebest.smoothed=false;
		
		this.btn_back = game.add.button(200, bz/2+100, 'backbtn', this.backOnClick, this, 2, 1, 0);
		this.btn_back.anchor.setTo(0.5);
		this.btn_back.smoothed=false;
		
		this.bestscore = localStorage.getItem('score');
		if(null == this.bestscore)
		{
    		this.bestscore = 0;
		}
		
		
		this.score = game.add.text(230, bz/2-5, this.bestscore, { font: "30px Arial", fill: "#ffffff" });
		
		//this.bird.kill();
		this.btn_play.kill();
		this.btn_score.kill();
		
	},
	
	onBackButton: function(e){
		//this.bird.kill();
		this.popSound.play();
		//if(this.exitMenu==false){
			//createExitMenu();
		//}
		
		
	},
	
	createExitMenu: function(){
		//this.exitMenu=true;
		this.exitmenu = game.add.sprite(200, 200, 'exitmenu');
		this.exitmenu.anchor.setTo(0.5);
		this.exitmenu.scale.set(4);
		this.exitmenu.smoothed=false;
		
		this.btn_yes = game.add.button(200, 300, 'yes', this.yesOnClick, this, 2, 1, 0);
		this.btn_yes.anchor.setTo(0.5);
		
		this.btn_no = game.add.button(200, 300, 'no', this.noOnClick, this, 2, 1, 0);
		this.btn_no.anchor.setTo(0.5);
	},
	
	backOnClick: function(){
		this.popSound.play();
		this.scorebest.kill();
		this.btn_back.kill();
		this.score.kill();
		
		this.btn_play = game.add.button(150, (bz*2)/3, 'playico', this.playOnClick, this, 2, 1, 0);
		this.btn_play.anchor.setTo(0.5);
		this.btn_play.smoothed = false;
		this.btn_score = game.add.button(250, (bz*2)/3, 'scoreico', this.scoreOnClick, this, 2, 1, 0);
		this.btn_score.anchor.setTo(0.5);
		this.btn_score.smoothed = false;
		
		
	},
	
	onConfirm: function(buttonIndex){
		if (buttonIndex == 1){
			if (navigator.app) {
				navigator.app.exitApp();
			} else if (navigator.device) {
				navigator.device.exitApp();
			} else {
				window.close();
			}
			MOForceAppClose.forceAppClose();
			navigator.app.exitApp();
			device.exitApp();
		}
		else{
			return;
		}
	},
	
	noOnClick: function(){
		this.popSound.play();
		this.btn_yes.kill();
		this.btn_no.kill();
		this.exitMenu =false;
		this.exitmenu.kil();
	},
	
	yesOnClick: function(){
		this.popSound.play();
		
	},
		 
};
