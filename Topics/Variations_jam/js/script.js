/**
 * Astral Projectiles
 * Olivia Axiuk
 notes:
 have timer in main game that leads to a screen (before health bar is dead)
 alien character dialogu, brings back to menu - cannot enter PLAy version of te game again (do not reset the timer)
 other two versions:
 story mode (interrupting story)
 Defender Mode (play as an alien)
 */

"use strict";

const playerShip = {
    body: {
        x: 540,
        y: 630,
        sprite: undefined,
        size: 100,
        velocity: 6,

    },
}


// The needed arrays
let bullets = [];
let enemyShips = [];
let enemySprite = undefined;

//the background image sprite for the cutscene
let cutsceneBG = undefined;

//handles the enemyShip timer (inspired by Bug Squasher by Pippin Bar)
const minimumEnemyDelay = 0.5 * 1000;
const maximumEnemyDelay = 2 * 1000;
let enemyShipDelay = maximumEnemyDelay;

//sets the initial state
let state = "playGameCutscene"

// the red healthbar
let healthBar = {
    x: 400,
    y: 10,
    HealthlvlWidth: 300,
    maxWidth: 300,
    h: 30,
    color: "#ff1b1b"
}

// the current score and its minimum for resetting purposes
let score = 0;
let scoreMin = 0;
//Timer parameters for the playGame timer which ends this version of the game
let timer = {
    counter: 10,
    max: 10,
    min: 0,

};

const titleBoxPlay = {
    x: 300,
    y: 100,
    w: 500,
    h: 100,
    fill: "#ee2525",
    state: "playGame"

}


const titleBoxStory = {
    x: 400,
    y: 450,
    w: 250,
    h: 80,
    fill: "#ee2525",
    state: "storyMode"

}


const titleBoxDefender = {
    x: 400,
    y: 550,
    w: 250,
    h: 80,
    fill: "#ee2525",
    state: "defenderMode"
}

//load in all sprites
function preload() {
    playerShip.body.sprite = loadImage("assets/images/playerShip.PNG")
    enemySprite = loadImage("assets/images/enemyShip.PNG")
    cutsceneBG = loadImage("assets/images/cutsceneBG.PNG")
}


/**
 * creates the canvas
*/
function setup() {
    createCanvas(1080, 720);
    setTimeout(addEnemyShip, enemyShipDelay);

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

function createEnemyShips() {
    let enemyShip = {
        body: {
            x: random(0, width),
            y: 0,
            sprite: enemySprite,
            size: 30,
            velocity: 2,
            fill: "#419605"

        },
    }
    return enemyShip
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
    if (state === "storyMode") {
        storyMode();
    }
    if (state === "defenderMode") {
        defenderMode();
    }
    if (state === "playGameCutscene") {
        playGameCutscene();
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


    push();
    fill("#");
    text("Click to Begin", width / 2, 300)
    pop();

    drawTitleBoxes(titleBoxPlay);

    drawTitleBoxes(titleBoxStory);

    drawTitleBoxes(titleBoxDefender);

    gamePick(titleBoxPlay);
    gamePick(titleBoxDefender);
    gamePick(titleBoxStory);
}


function gamePick(titleBox) {
    // Get distance from spray to the hit elements
    const titleBoxArea = titleBox.width * titleBox.height;
    const playerClickD = dist(mouseX, mouseY, titleBoxArea);
    // Check if it's an overlap
    const playerChoose = (playerClickD < mouseX, mouseY + titleBoxArea);
    if (playerChoose && mouseIsPressed()) {
        state = titleBox.state
    }
}

//functions for the title Screen

function drawTitleBoxes(titleBox) {
    push();
    noStroke();
    fill(titleBox.fill);
    rect(titleBox.x, titleBox.y, titleBox.w, titleBox.h);
    pop();
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
    for (let enemyShip of enemyShips) {
        moveEnemyShip(enemyShip);
        drawSpriteElements(enemyShip);
    }
    checkBulletEnemyOverlap();
    checkPlayerEnemyOverlap();
    drawScore();
    drawHealthBar();
    countDown();
    playGameEnd();

}

//the Cutscene which interrupts the "playGame" mode
function playGameCutscene() {
    background("#214222");
    push();
    imageMode(CENTER);
    image(cutsceneBG, width / 2, height / 2);
    pop();
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

//Moves the bullet
function moveBullet(bullet) {
    bullet.y -= bullet.velocity;

}

//countdown until playGame displays the end "cutscene"

function countDown() {
    timer.counter -= 0.01;

}

//determines when the timer end, display the cutscene
function playGameEnd() {
    if (floor(timer.counter) == 0) {
        state = "playGameCutscene"
    }
}

/**
 * Handles the  overlapping the targets
 */
function checkBulletEnemyOverlap() {
    for (let enemyShip of enemyShips) {
        for (let bullet of bullets) {
            // Get distance from spray to the hit elements
            const enemyD = dist(bullet.x, bullet.y, enemyShip.body.x, enemyShip.body.y);
            // Check if it's an overlap
            const enemyHit = (enemyD < bullet.size / 2 + enemyShip.body.size / 2);
            if (enemyHit) {
                // increase the score
                score = score + 1;
                const index = enemyShips.indexOf(enemyShip);
                enemyShips.splice(index, 1);
            }
        }
    }


}

function checkPlayerEnemyOverlap() {
    for (let enemyShip of enemyShips) {
        // Get distance from spray to the hit elements
        const playerD = dist(playerShip.body.x, playerShip.body.y, enemyShip.body.x, enemyShip.body.y);
        // Check if it's an overlap
        const playerHit = (playerD < enemyShip.body.size / 2 + playerShip.body.size / 2);
        if (playerHit) {
            // increase the score
            healthBar.HealthlvlWidth -= 10;
            const index = enemyShips.indexOf(enemyShip);
            enemyShips.splice(index, 1);
        }

    }


}

// move the enemy ships
function moveEnemyShip(enemyShip) {
    enemyShip.body.y += enemyShip.body.velocity
}

// responsible for drawing all the elements that have sprites
function drawSpriteElements(spriteObject) {
    push();
    imageMode(CENTER);
    image(spriteObject.body.sprite, spriteObject.body.x, spriteObject.body.y);
    pop();
}

function drawEnemyShip(enemyShip) {
    push();
    fill(enemyShip.body.fill)
    ellipse(enemyShip.body.x, enemyShip.body.y, enemyShip.body.size);
    pop();
}
/// displays the score in top right 
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    textSize(100);
    fill("#ff9300");
    text(score, width, 0);
    pop();

}

// a red bar that gets shorter as the player hits the enemy ship
function drawHealthBar() {
    push();
    noStroke();
    fill(healthBar.color);
    rect(healthBar.x, healthBar.y, healthBar.HealthlvlWidth, healthBar.h);
    pop();

}

// shoots bullets as player clicks the spacebar
function keyPressed() {
    if (keyCode === 32) {
        bullets.push(createBullets())

    }
}

//handles the adding of the enemy ships to the array
function addEnemyShip() {
    const enemyShip = createEnemyShips();
    enemyShips.push(enemyShip);

    enemyShipDelay -= random(0, 100);
    // constrain the delay
    enemyShipDelay = constrain(enemyShipDelay, minimumEnemyDelay, maximumEnemyDelay);
    //set timeout
    setTimeout(addEnemyShip, enemyShipDelay);
}


//draws the bullet
function drawBullet(bullet) {
    push();
    fill(bullet.fill);
    ellipse(bullet.x, bullet.y, bullet.size);
    pop();
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











