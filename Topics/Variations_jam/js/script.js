/**
 * Astral Projectiles
 * Olivia Axiuk
 * 
 *(GAME DESCRIPTION HERE)
 */

"use strict";

let playerShip = {
    body: {
        x: 540,
        y: 700,
        sprite: undefined,
        size: 30,
        velocity: 6,

    },
    // The bullet has a position, size, speed, and state
    bullet: {
        x: undefined,
        y: 480,
        size: 10,
        speed: 30,
        // Determines how the spray moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },



}

let state = "playGame"

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

function preload() {
    playerShip.body.sprite = loadImage("assets/images/playerShip.PNG")
}


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(1080, 720);
    


}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
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


function playGame(){
 drawPlayerShip();
 movePlayer();
}

function movePlayer(){
    if (keyIsDown(LEFT_ARROW)){
        playerShip.body.x -= playerShip.body.velocity;
    } else if (keyIsDown(RIGHT_ARROW)) {
        playerShip.body.x += playerShip.body.velocity;
    }
}

function drawPlayerShip(){
    push();
    imageMode(CENTER);
    image(playerShip.body.sprite, playerShip.body.x, playerShip.body.y);
    pop();
}




