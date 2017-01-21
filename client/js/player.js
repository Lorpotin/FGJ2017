Player = function (game, x, y) {

    Phaser.Graphics.call(this, game, x, y);

    cursors = game.input.keyboard.createCursorKeys();

     this.prevYCoordinates = [];
    for(var i = 0; i < 50; i++){
        this.prevYCoordinates.push(100);
    }
    this.y_move = 0;
    this.prevSpotY = 0;

};

Player.prototype = Object.create(Phaser.Graphics.prototype);
Player.prototype.constructor = Player;


/**
 * Automatically called by World.update
 **/

var movementSpeed = 500;

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
            this.prevYCoordinates[y] += this.y_move;
        }
    }

    for(var x = 1; x < 50; x++){
        this.lineTo(x*4, this.prevYCoordinates[x]);
    }
 

    if (cursors.up.isDown)
    {
        //  Move down
        this.y_move -= 0.75;
        if(this.y_move < -10){
            this.y_move = -10;
        }
    }
    else if (cursors.left.isDown)
    {
        //  Move up
    }
    else if (cursors.right.isDown)
    {
        //  Move up
    }
    else if (cursors.down.isDown)
    {
        //  Move up
         this.y_move += 0.75;
         if(this.y_move > 10){
            this.y_move = 10;
        }
    }
};