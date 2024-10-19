/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const bigFly = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 1.5
};




// the current score
let score = 0;

// Text to Display during states
let titleString = "The Carnaval"

//the current state
let state = "title";

function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
    resetBigFly();
}



function draw() {
    //Check the state
    if (state === "title") {
        title();
    }
    if (state === "game") {
        game();

    }
}

/**
 * Title page, waits for user to click the mouse
 */
function title() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(CENTER, CENTER)
    background("#bb1a1a");

    push();
    fill("#");
    text(titleString, width / 2, height / 2)
    pop();

    if (mouseIsPressed) {
        state = "game";
    }
}

// The Game begins! GAME DESCRIPTION HERE


function game() {
    background("#87ceeb");
    moveFly();
    drawFly();
    drawBigFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawScore();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
    //Move the Big fly
    bigFly.x += bigFly.speed;
    // Handle the fly going off the canvas
    if (bigFly.x > width) {
        resetBigFly();
    }
}

/**
 * Draws the flies as a black circles
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function drawBigFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(bigFly.x, bigFly.y, bigFly.size);
    pop();
}

// displays the score in top right 
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    textSize(128);
    fill("pink");
    text(score, width, 0);
    pop();


}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

// Resets big fly position
function resetBigFly() {
    bigFly.x = 0;
    bigFly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the flies
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const flyD = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const flyEaten = (flyD < frog.tongue.size / 2 + fly.size / 2);
    //Check Distance from tongue to Big fly
    const bigFlyD = dist(frog.tongue.x, frog.tongue.y, bigFly.x, bigFly.y);
    //Checks if tongue overlaps bigFly
    const bigFlyEaten = (bigFlyD < frog.tongue.size / 2 + bigFly.size / 2);
    if (flyEaten) {
        // increase the score
        score = score + 1;
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
    if (bigFlyEaten) {
        // increase the score
        score = score + 2;
        // Reset the fly
        resetBigFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

