/**
 * The Carnival
 * Olivia Axiuk
 * 
 * A carnival game, try to win the best prizes and try not to hit the sad clowns, game ends when health bar is low or timer ends.
 * 
 * Instructions:
 * - Move the gun with your mouse
 * - Click to launch the spray
 * - Hit the targets, avoid the sad clowns, happy clownsa re worth more
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our gun
const gun = {
    // The gun's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150,

    },
    // The gun's spray has a position, size, speed, and state
    spray: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the spray moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    sprite: undefined
};

// Our target
// Has a position, size, and speed of horizontal movement
const target = {
    x: 0,
    y: 200, // Will be random
    size: 50,
    secondSize: 30,
    centerSize: 15,
    speed: 1.5
};

const Bluetarget = {
    x: 0,
    y: 200, // Will be random
    size: 50,
    secondSize: 30,
    centerSize: 15,
    speed: 3
};

//draws rgw sad clown

const sadClown = {
    x: 0,
    y: 200, // Will be random
    size: 45,
    speed: 2
};

let healthBar = {
    x: 20,
    y: 5,
    HealthlvlWidth: 100,
    h: 30,
    color: "#ff1b1b"
}




// the current score
let score = 0;

// Text to Display during states
let titleString = "The Carnival"
let gameOverString = "You Died :( Press any key to restart"

//the current state
let state = "title";

function setup() {
    createCanvas(640, 480);

    // Give the target its first random position
    resettarget();
    resetBluetarget();
    resetSadClown();
}



function draw() {
    //Check the state
    if (state === "title") {
        title();
    }
    if (state === "game") {
        game();

    }
    if (state === "gameOverScreen") {
        gameOverScreen();
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
    background("#45125b");
    moveTargets();
    drawtarget();
    drawBluetarget();
    drawSadClown();
    movegun();
    moveSpray();
    //preload();
    drawgun();
    checkSpraytargetOverlap();
    drawScore();
    drawHealthBar();

}

/**
 * Moves the target according to its speed
 * Resets the target if it gets all the way to the right
 */
function moveTargets() {
    // Move the target
    target.x += target.speed;
    // Handle the target going off the canvas
    if (target.x > width) {
        resettarget();
    }
    //Move the Blue target
    Bluetarget.x += Bluetarget.speed;
    // Handle the target going off the canvas
    if (Bluetarget.x > width) {
        resetBluetarget();
    }
    // moves the sad clown
    sadClown.x += sadClown.speed;
    // Handle the target going off the canvas
    if (sadClown.x > width) {
        resetSadClown();

    }
}

/**
 * Draws the flies 
 */

// A red and white target
function drawtarget() {
    push();
    noStroke();
    fill("#cb0000");
    ellipse(target.x, target.y, target.size);
    pop();
    push();
    noStroke();
    fill("#FFFFFF");
    ellipse(target.x, target.y, target.secondSize);
    pop();
    push();
    noStroke();
    fill("#cb0000");
    ellipse(target.x, target.y, target.centerSize);
    pop();
}

//A Blue and White target
function drawBluetarget() {
    push();
    noStroke();
    fill("#002eff");
    ellipse(Bluetarget.x, Bluetarget.y, Bluetarget.size);
    pop();
    push();
    noStroke();
    fill("#FFFFFF");
    ellipse(Bluetarget.x, Bluetarget.y, Bluetarget.secondSize);
    pop();
    push();
    noStroke();
    fill("#002eff");
    ellipse(Bluetarget.x, Bluetarget.y, Bluetarget.centerSize);
    pop();
}

//A black and white frowning clown
function drawSadClown() {
    push();
    noStroke();
    fill("#000000");
    ellipse(sadClown.x, sadClown.y, sadClown.size);
    pop();
}

// displays the score in top right 
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    textSize(100);
    fill("#ff9300");
    text(score, width, 0);
    pop();


}

function drawHealthBar() {
    push();
    noStroke();
    fill(healthBar.color);
    rect(healthBar.x, healthBar.y, healthBar.HealthlvlWidth, healthBar.h);
    pop();
}

/**
 * Resets the target to the left with a random y
 */
function resettarget() {
    target.x = 0;
    target.y = random(0, 300);
}

// Resets Blue target position
function resetBluetarget() {
    Bluetarget.x = 0;
    Bluetarget.y = random(0, 300);
}

function resetSadClown() {
    sadClown.x = 0;
    sadClown.y = random(0, 300);
}

/**
 * Moves the gun to the mouse position on x
 */
function movegun() {
    gun.body.x = mouseX;
}

/**
 * Handles moving the spray based on its state
 */
function moveSpray() {
    // spray matches the gun's x
    gun.spray.x = gun.body.x;
    // If the spray is idle, it doesn't do anything
    if (gun.spray.state === "idle") {
        // Do nothing
    }
    // If the spray is outbound, it moves up
    else if (gun.spray.state === "outbound") {
        gun.spray.y += -gun.spray.speed;
        // The spray bounces back if it hits the top
        if (gun.spray.y <= 0) {
            gun.spray.state = "inbound";
        }
    }
    // If the spray is inbound, it moves down
    else if (gun.spray.state === "inbound") {
        gun.spray.y += gun.spray.speed;
        // The spray stops if it hits the bottom
        if (gun.spray.y >= height) {
            gun.spray.state = "idle";
        }
    }
}


/**function preload() {
* gunSprite = loadImage("assets/images/player_gun.PNG")
*}
*/

/**
 * Displays the spray (tip and line connection) and the gun (body)
 */
function drawgun() {
    // Draw the spray tip
    push();
    fill("#93f2ff");
    noStroke();
    ellipse(gun.spray.x, gun.spray.y, gun.spray.size);
    pop();

    // Draw the rest of the spray
    push();
    stroke("#61b0ff");
    strokeWeight(gun.spray.size);
    line(gun.spray.x, gun.spray.y, gun.body.x, gun.body.y);
    pop();

    // Draw the gun's body
    push();
    // ImageMode(CENTER);
    //image(gunSprite, gun.body.x, gun.body.y);
    ellipse(gun.body.x, gun.body.y, gun.body.size);
    pop();
}

/**
 * Handles the spray overlapping the flies
 */
function checkSpraytargetOverlap() {
    // Get distance from spray to target
    const targetD = dist(gun.spray.x, gun.spray.y, target.x, target.y);
    // Check if it's an overlap
    const targetHit = (targetD < gun.spray.size / 2 + target.size / 2);
    //Check Distance from spray to Blue target
    const BluetargetD = dist(gun.spray.x, gun.spray.y, Bluetarget.x, Bluetarget.y);
    //Checks if spray overlaps Bluetarget
    const BluetargetHit = (BluetargetD < gun.spray.size / 2 + Bluetarget.size / 2);
    //Checks distance between spray and sad clown
    const sadClownD = dist(gun.spray.x, gun.spray.y, sadClown.x, sadClown.y);
    //Checks if spray overlaps sad clown
    const sadClownHit = (sadClownD < gun.spray.size / 2 + sadClown.size / 2);
    if (targetHit) {
        // increase the score
        score = score + 1;
        // Reset the target
        resettarget();
        // Bring back the spray
        gun.spray.state = "inbound";
    }
    if (BluetargetHit) {
        // increase the score
        score = score + 2;
        // Reset the target
        resetBluetarget();
        // Bring back the spray
        gun.spray.state = "inbound";
    }
    // removes points and health bar if sad clown is hit
    if (sadClownHit) {
        // increase the score
        score = score - 2;
        // health goes down
        healthBar.HealthlvlWidth = healthBar.HealthlvlWidth - 10
        // Reset the target
        resetSadClown();
        // Bring back the spray
        gun.spray.state = "inbound";
    }
    if (healthBar.HealthlvlWidth - 10 == 0) {
        state = "gameOverScreen";
    }
}

/**
 * Launch the spray on click (if it's not launched yet)
 */
function mousePressed() {
    if (gun.spray.state === "idle") {
        gun.spray.state = "outbound";
    }
}


function gameOverScreen() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(CENTER, CENTER)
    background("#321d35");

    push();
    fill("#db1c1c");
    text(gameOverString, width / 2, height / 2)
    pop();

    if (keyIsPressed) {
        state = "title";
    }
}


