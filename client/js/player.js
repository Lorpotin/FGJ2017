Player = function (game, x, y) {

    Phaser.Graphics.call(this, game, x, y);

    cursors = game.input.keyboard.createCursorKeys();

     this.prevYCoordinates = [];
    for(var i = 0; i < 50; i++){
        this.prevYCoordinates.push(100);
    }
    this.y_move = 0;
    this.prevSpotY = 0;
    this.startedGame = false;
    this.gameNumber = 0;
};

Player.prototype = Object.create(Phaser.Graphics.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 **/


Player.prototype.update = function() {

    this.clear();
    this.moveTo(0, this.prevYCoordinates[0]);
    this.lineStyle(10, 0xFF0000);


    for(var y = 0; y < this.prevYCoordinates.length; y++){
        if(this.prevYCoordinates[y+5]){
            this.prevYCoordinates[y+4] = this.prevYCoordinates[y+5];
        } 
        if(this.prevYCoordinates[y+4]){
            this.prevYCoordinates[y+3] = this.prevYCoordinates[y+4];
        
        } 
        if(this.prevYCoordinates[y+3]){
            this.prevYCoordinates[y+2] = this.prevYCoordinates[y+3];
        } 
        if(this.prevYCoordinates[y+2]){
            this.prevYCoordinates[y+1] = this.prevYCoordinates[y+2];
        } 
        if(this.prevYCoordinates[y+1]){
            this.prevYCoordinates[y] = this.prevYCoordinates[y+1];
        }
        else {
            if(this.startedGame === true){
                this.prevYCoordinates[y] += this.y_move;
            } else if (this.startedGame === false && y === this.prevYCoordinates.length-1) {
                var y_pos = (50 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((y/49 + (updateTicker-45)))/60)))*isCurveVar);
                this.prevYCoordinates[y] = y_pos;
            }
          
        }
    }

    for(var x = 1; x < 50; x++){
        this.lineTo(x*4, this.prevYCoordinates[x]);
    }
 

    if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        //  Move down
        console.log("alas"); 
        if (this.startedGame == false) {
            startGame();
        }
        this.y_move += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
        if(this.y_move < -10){
            this.y_move = -10;
        }
    }
    else if (cursors.up.isDown)
    {
        if (this.startedGame == false) {
        	startGame();
            
        }
        if(this.y_move > -10){
            this.y_move -= 1;
        }
    }
    else if (cursors.down.isDown)
    {
        if (this.startedGame == false) {
			startGame();
        }
        if(this.y_move < 10){
            this.y_move += 1;
        }
    }
    else if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
        //  Move up
        console.log("ylös"); 
        if (this.startedGame == false) {
            startGame();
        }
         this.y_move += pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
         if(this.y_move > 10){
            this.y_move = 10;
        }
    }

    var comparisionY = this.prevYCoordinates[this.prevYCoordinates.length-1] + this.y;
    if( comparisionY < upperLevelYCoord ||
        comparisionY > lowerLevelYCoord){
    	endGame();
        
    }
};

function startGame() {
	player.startedGame = true;
    player.gameNumber++;
	startgameText.setText("");
    extraScore = 0;
	starttime = Date.now();
}

function endGame() {
	for (y=0;y<player.prevYCoordinates.length;y++) {
		y_pos = (50 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((y/49 + (updateTicker-45)))/60)))*isCurveVar);
		player.prevYCoordinates[y] = y_pos;
	}
	player.startedGame = false;
	startgameText.setText("Move up or down to start the game");
	starttime = null;
	score = 0;
	player.y_move = 0;
}