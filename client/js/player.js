Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'player');

    // anim = this.animations.add('drive',[0,1,2,3],25);
    // anim.play(25,true);
    // this.body.gravity.y = 0;
    //this.body.checkCollision.up = false;
    //this.body.checkCollision.left = false;
    //this.body.checkCollision.right = false;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 0;
    this.body.x = 512;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


/**
 * Automatically called by World.update
 **/

var movementSpeed = 500;

Player.prototype.update = function() {
    player.body.velocity.y = 0;
    player.body.x = 512;
    cursors = game.input.keyboard.createCursorKeys();

    if (cursors.up.isDown)
    {
        //  Move down
        player.body.velocity.y = -1 *  movementSpeed;
    }
    else if (cursors.left.isDown)
    {
        //  Move up
        player.body.velocity.y = -1 *  movementSpeed;
    }
    else if (cursors.right.isDown)
    {
        //  Move up
        player.body.velocity.y = movementSpeed;
    }
    else if (cursors.down.isDown)
    {
        //  Move up
        player.body.velocity.y = movementSpeed;
    }
};