var app = {
	
    initialize: function() {
        this.bindEvents();
    },
	
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
		if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		} else {
			app.receivedEvent('deviceready');
		}
		
    },
	
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    receivedEvent: function(id) {
		
		game.state.start('bootState');
		
    }
};
var y = window.innerHeight;
var x = window.innerWidth;

var r = y/x;
var a = 400;
var b = a*r;


var toplam = 0;
for(toplam = 0; toplam < b; toplam += 50)
	
var aratoplam = b - toplam +50;
var bz = b-aratoplam;


var game = new Phaser.Game(a,b,  Phaser.WEBGL, 'game_div');
gap_init = 3;

function createBanner(){
if(AdMob) AdMob.createBanner({
			adId: 'ca-app-pub-3312738864772003/9844369190',
			position: AdMob.AD_POSITION.TOP_CENTER,
			isTesting: false,
			overlap: true, 
			offsetTopBar: false, 
			bgColor: 'black',
			autoShow: false
			});
}

function showBanner(){
	if(AdMob) AdMob.showBanner();
}

function createRewarded(){
	AdMob.prepareRewardVideoAd({
		adId: 'ca-app-pub-3312738864772003/8990242178',
		autoShow: false,
		isTesting: true
	},function(e) {
		//alert('SUCCESS ' + e );
		console.log(e);
	}, function(e) {
		//alert('FAIL ' + e);
		console.log(e);
	});
}

game.state.add('bootState', bootState); 
game.state.add('preState', preState); 
game.state.add('menuState', menuState); 
game.state.add('gameState', gameState); 


app.initialize();


