Player = function (game, x, y) {

    Phaser.Graphics.call(this, game, x, y);

    cursors = game.input.keyboard.createCursorKeys();
    this.prevYCoordinates = [];
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
    this.lineStyle(10, 0xFF0000, 0.2);
 
    for(var x = 0; x < 100; x++){
        this.lineTo(x,100 + (200 * (this.y_move * (x/100)) ));
    }

    if (cursors.up.isDown)
    {
        //  Move down
        this.y_move -= 0.1;
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
        this.y_move += 0.1;
    }
};