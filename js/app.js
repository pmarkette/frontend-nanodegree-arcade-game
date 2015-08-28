var Char = function(x,y,url) {
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = url;
};

// Draw the character on the screen, required method for game
Char.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y,url,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Char.call(this,x,y,url);
    this.speed = speed;
};

Enemy.prototype = Object.create(Char.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + dt * this.speed;

    if (this.x >= 600) {
        this.x = -100;
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,url) {
    Char.call(this,x,y,url);
    this.key = undefined;
    this.collision = false;
};

Player.prototype = Object.create(Char.prototype);
Player.prototype.constructor = Player;

Player.prototype.left = function() {
    this.x = this.x - 100;
    if (this.x < 0) this.x = 0;
};

Player.prototype.right = function() {
    this.x = this.x + 100;
    if (this.x > 400) this.x = 400;
};

Player.prototype.up = function() {
    this.y = this.y - 80 ;
    if (this.y < 40) {
        this.y = 320;
    }
};

Player.prototype.down = function() {
    this.y = this.y + 80;
    if (this.y > 400) this.y = 400;
};

Player.prototype.handleInput = function(key) {
    this.key = key;
};

Player.prototype.update = function() {

    if (this.key !== undefined) {

        if (this.key == 'left') this.left();
        if (this.key == 'right') this.right();
        if (this.key == 'up') this.up();
        if (this.key == 'down') this.down();

        this.key = undefined;
    }
};

// Returns a random integer between min (included) and max (included)
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var lane1 = 3;
var lane2 = 1;
var lane3 = 2;
var lane4 = randomNum(1,3);
var lane5 = randomNum(1,3);
var minSpd = 50;
var maxSpd = 200;

var speed1 = randomNum(minSpd,maxSpd);
var speed2 = randomNum(minSpd,maxSpd);
var speed3 = randomNum(minSpd,maxSpd);
var speed4 = randomNum(minSpd,maxSpd);
var speed5 = randomNum(minSpd,maxSpd);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-150,rowY(lane1),'images/enemy-bug.png',speed1),
                  new Enemy(-150,rowY(lane2),'images/enemy-bug.png',speed2),
                  new Enemy(-150,rowY(lane3),'images/enemy-bug.png',speed3),
                  new Enemy(-150,rowY(lane4),'images/enemy-bug.png',speed4),
                  new Enemy(-150,rowY(lane5),'images/enemy-bug.png',speed5)];

function rowY(row) {
    return 65 + (row-1) * 80;
}

var player = new Player(200, 400,'images/char-boy.png');


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
