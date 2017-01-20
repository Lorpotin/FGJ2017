Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'player');

    anim = this.animations.add('drive',[0,1,2,3],25);
    anim.play(25,true);
    //this.body.gravity.y = 500;
    //this.body.checkCollision.up = false;
    //this.body.checkCollision.left = false;
    //this.body.checkCollision.right = false;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.02;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 **/

Player.prototype.update = function() {

    if(
        game.input.activePointer.isDown 
        && (this.y + this.height <= GAME_HEIGHT + 1)
        && (this.y + this.height >= GAME_HEIGHT - 1)
        ){
            this.body.velocity.y = -100;
    }
};
