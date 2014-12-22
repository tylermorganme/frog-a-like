
var colWidth = 101;
var rowHeight = 83;
var score = 0;

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

// Enemies our player must avoid
var Enemy = function() {
    this.y = Math.floor(Math.random()*2.999);
    this.x = -2;
    this.speed = 0.5*(1+score/50) + Math.random()*(1+score/50);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 6){
        this.x = -2; 
        this.speed = 0.5*(1+score/50) + Math.random()*(1+score/50);
        this.y = Math.floor(Math.random()*2.999);
    } else {
        this.x += this.speed * dt; 
    }
    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * colWidth , rowHeight/2 + this.y * rowHeight);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 2;
    this.y = 4;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * colWidth , rowHeight/2 + this.y * rowHeight);
}

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        if (this.x > 0) {
            this.x -= 1;
        }
    } else if (keyCode === 'right') {
        if (this.x < 4) {
            this.x += 1;
        }
    } else if (keyCode === 'down') {
        if (this.y < 4) {
            this.y += 1;   
        }
    } else {
        if (this.y > 0) {
         this.y -= 1;   
        }
    }
}

var Treasure = function(){
    this.type = treasureTypes[Math.floor(Math.random()*treasureTypes.length)];
    this.x = Math.floor(Math.random()*4.9999);
    this.y = 0 + Math.floor(Math.random()*2.9999);
    this.sprite = this.type["sprite"];
    this.createdAt = Date.now();
}

Treasure.prototype.update = function() {
    if ((Date.now() - this.createdAt)/1000 >= this.type["duration"]) {
        treasure = new Treasure();
        if (score -this.type["penalty"] <= 0 ) {
            score = 0;
        } else {
            score -= this.type["penalty"];
        }
    }
    if (this.x === player.x && this.y === player.y) {
        score += this.type["value"];
        treasure = new Treasure();
        console.log(score);
    }
}

Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * colWidth , rowHeight/2 + this.y * rowHeight);
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    //TODO: Add all enemies
];

for (var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
}


var player = new Player();
var treasure = new Treasure();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
