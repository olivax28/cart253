/**
 * Astral Projectiles
 * Olivia Axiuk
 * 
 *(GAME DESCRIPTION HERE)
 notes:
 have timer in main game that leads to a screen (before health bar is dead)
 alien character dialogu, brings back to menu - cannot enter PLAy version of te game again (do not reset the timer)
 other two versions:
 story mode (interrupting story)
 Defender Mode (play as an alien)
 */

"use strict";

let playerShip = {
    body: {
        x: 540,
        y: 630,
        sprite: undefined,
        size: 30,
        velocity: 6,

    },
}


// The bullet array
let bullets = []


let state = "title"

// Has a position, size, and speed of horizontal movement as well as two levels of fill (red)
const spaceInvader = {
    x: 100, // will be random
    y: 0,
    size: 50,
    speed: 2
};

// the red healthbar
let healthBar = {
    x: 20,
    y: 5,
    HealthlvlWidth: 100,
    maxWidth: 100,
    h: 30,
    color: "#7eff1b"
}

//load in all sprites
function preload() {
    playerShip.body.sprite = loadImage("assets/images/playerShip.PNG")
}


/**
 * creates the canvas
*/
function setup() {
    createCanvas(1080, 720);



}

//creates the bullet elements that appear at the player's location
function createBullets() {
    let bullet = {
        x: playerShip.body.x,
        y: playerShip.body.y,
        velocity: 20,
        size: 20,
        fill: "#ffffff"
    }
    return bullet
}


/**
 * drawws black background and sets the states
*/
function draw() {
    background(0, 0, 0);

    if (state === "title") {
        title();
    }
    if (state === "playGame") {
        playGame();
    }
}


function title() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(CENTER, CENTER)
    background("#000000");

    push();
    fill("#");
    text("Astral Projectiles", width / 2, height / 2)
    pop();

    push();
    fill("#");
    text("Click to Begin", width / 2, 300)
    pop();

    if (mouseIsPressed) {
        state = "playGame";
    }
}

//The main game mode
function playGame() {
    // bullet for loop
    for (let bullet of bullets) {
        moveBullet(bullet);
        drawBullet(bullet);
    }
    drawSpriteElements(playerShip);
    movePlayer();
    destroyBullet();


}

// moves the player ship
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        playerShip.body.x -= playerShip.body.velocity;
    } else if (keyIsDown(RIGHT_ARROW)) {
        playerShip.body.x += playerShip.body.velocity;
    }
    playerShip.body.x = constrain(playerShip.body.x, 0, width);
}

// responsible for drawing all the elements that have sprites
function drawSpriteElements(spriteObject) {
    push();
    imageMode(CENTER);
    image(spriteObject.body.sprite, spriteObject.body.x, spriteObject.body.y);
    pop();
}

// shoots bullets as player clicks the spcaebar
function keyPressed() {
    if (keyCode === 32) {
        bullets.push(createBullets())

    }
}

//draws the bullet
function drawBullet(bullet) {
    push();
    fill(bullet.fill);
    ellipse(bullet.x, bullet.y, bullet.size);
    pop();
}

//Moves the bullet
function moveBullet(bullet) {
    bullet.y -= bullet.velocity;

}

//code from changing-arrays video by Pippin Barr

function destroyBullet() {
    //check all the bullet if they hit the edge of the canvas, they disappear
    for (let bullet of bullets) {
        const bulletDistance = dist(bullet.size, height)
        if (bulletDistance < bullet.size) {
            //bullet hit top
            //get index of the bullet
            const index = bullets.indexOf(bullet);
            //splice the bullet out of the bullets array
            bullets.splice(index, 1);
        }
    }
}








