
//Set
/** @const {Number} Dimension for tiles height. */
var ROW_HEIGHT = 83;

/** @const {Number} Dimension for tiles width. */
var COL_WIDTH = 101;

/** @const {Number} Dimension for tiles height. */
var COL = 83;

/** @const {Number} Dimension for tiles width. */
var score = 0;

/** @type {Array} The properties for the different treasure types. */
var treasureTypes = [
    {
        sprite: 'images/Gem Blue.png',
        value: 1,
        duration: 5,
        penalty: 9
    },
    {
        sprite: 'images/Gem Green.png',
        value: 2,
        duration: 4,
        penalty: 6
    },
    {
        sprite: 'images/Gem Orange.png',
        value: 3,
        duration: 3,
        penalty: 3
    }
];

/**
 * Enemies the player must avoid.
 * @constructor
 */
var Enemy = function() {
    this.y = Math.floor(Math.random()*2.999);
    this.x = -2;
    this.speed = 0.5*(1+score/50) + Math.random()*(1+score/50);
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Updates the enemy's position.
 * @param {number} dt A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    if (this.x >= 6){
        this.x = -2;
        this.speed = 0.5*(1+score/50) + Math.random()*(1+score/50);
        this.y = Math.floor(Math.random()*2.999);
    } else {
        this.x += this.speed * dt;
    }

};

/**
 * Draws the enemy on the screen.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * COL_WIDTH , ROW_HEIGHT/2 + this.y * ROW_HEIGHT);
};

/**
 * Player avater.
 * @constructor
 */
var Player = function() {
    this.x = 2;
    this.y = 4;
    this.sprite = 'images/char-boy.png';
};

/**
 * Draws the player avatar on the screen.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * COL_WIDTH , ROW_HEIGHT/2 + this.y * ROW_HEIGHT);
};

/**
 * Reset the player to the starting positon.
 */
Player.prototype.home = function() {
    this.x = 2;
    this.y = 4;
};

/**
 * Translates direction key inputs into player movements.
 * @param  {string} keyCode. A string representing a directional keypress.
 */
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0) {
        this.x -= 1;
    } else if (keyCode === 'right' && this.x < 4) {
        this.x += 1;
    } else if (keyCode === 'down' && this.y < 4) {
        this.y += 1;
    } else if (this.y >= 0) {
         this.y -= 1;
    }
};

/**
 * Treasures that the player must collect.
 */
var Treasure = function(){
    this.type = treasureTypes[Math.floor(Math.random()*treasureTypes.length)];
    this.x = Math.floor(Math.random()*4.9999);
    this.y = 0 + Math.floor(Math.random()*2.9999);
    this.sprite = this.type.sprite;
    this.createdAt = Date.now();
};

/**
 * Makes trasures disspear after their given duration and detects collisons with player.
 */
Treasure.prototype.update = function() {
    if ((Date.now() - this.createdAt)/1000 >= this.type.duration) {
        treasure = new Treasure();
        if (score -this.type.penalty <= 0 ) {
            score = 0;
        } else {
            score -= this.type.penalty;
        }
    }
    if (this.x === player.x && this.y === player.y) {
        score += this.type.value;
        treasure = new Treasure();
        console.log(score);
    }
};

/**
 * Draws the treasure  on the screen.
 */
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * COL_WIDTH , ROW_HEIGHT/2 + this.y * ROW_HEIGHT);
};

/** @type {Array<Enemy>} The array that holds the enemies. */
var allEnemies = [];

for (var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
}

/** @type {Player} Initialization of the player. */
var player = new Player();
/** @type {Treasure} Initialization of the treasure. */
var treasure = new Treasure();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
