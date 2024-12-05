/**
 * Astral Projectiles
 * Olivia Axiuk
 * Play Game first! 
 * A relatively normal experience. Control the ship with left and right arrow keys, spacebar to shoot
 *  until the the timer ends and the "cutscene" plays, cycle through the dialogue with mouse click until the player is brought back to the title screen
 * Story Mode!
 * doesn't let the player actually play for very long, it interrupts the player mutliple times with dialogue
 * same controls as play game. The longer you take to read the more UFOs there will be
 * Send player back to title screen.
 * Defend!
 * Control the ship with right, left AND up and down keys.
 * Try to find the secret messages (top and bottom left), the bottom left will be harder to read.
 * NOTE During cutscenes click WITHIN the textbox to avoid accidentally getting send over to the next version.
 */

"use strict";


// the player ship has starting x and Y coordinates and appears at the bottom of the screen
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

//the background image for the cutscenes
let cutsceneBG = undefined;

//The titlescreen image
let titleScreenIMG = undefined;

const cutsceneText = [
    "Pilot: Uh. Oh no.",
    "Pilot: Commander, are you in?",
    "Pilot: My engine's gone, I need someone to come in and get me outta here. Over",
    "Pilot: Commander, are you there? Over.",
    "...",
    "Pilot: Is anyone out there?",
    "The vast expanse of Space extended before him, empty and cold.",
    "If only he knew the STORY."
]

//loads inthe JSON file for the stroy dialogue
let storyDialogue = undefined;
// goes through the scenes of the JSON file for the story mode dialogue
let sceneIndex = 0;
// goes through the array for the Play Game mode and Story dialogue
let dialogueIndex = 0;
let showDialogueBox = false;

//handles the enemyShip timer (inspired by Bug Squasher by Pippin Bar)
const minimumEnemyDelay = 0.5 * 1000;
const maximumEnemyDelay = 2 * 1000;
let enemyShipDelay = maximumEnemyDelay;

//sets the initial state
let state = "title"

// the red healthbar
let healthBar = {
    x: 400,
    y: 10,
    healthlvlWidth: 300,
    maxWidth: 300,
    h: 30,
    color: "#ff1b1b"
}

// the current score, the score is never calculated in the game for actual points, so there is no reset
let score = 0;

// timer to call the play game cutscene
let playCutsceneTimer = {
    counter: 10,
};

// loads in the timer based on the JSON file
let storyTimer = {
    counter: undefined
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

const textBoxCutscene = {
    body: {
        x: 300,
        y: 200,
        w: 500,
        h: 200,
        fill: "#000000",
    },

    border: {
        x: 295,
        y: 190,
        w: 510,
        h: 220,
        fill: "#FFFFFF",

    }

}

//strings of text for defender mode that will be displayed under the ship

const defenderString01 = "Pilot: There's no one left";

const defenderString02 = "Pilot: There's nowhere to go.";

//the inifnity symbol which replaced the healthabr in defender mode
const infinitySymbol = {
    body: {
        x: 540,
        y: 70,
        sprite: undefined,
    }

}

//sound FX
let shootSound = undefined


//load in all sprites
function preload() {
    //load story mode dialogue data
    storyDialogue = loadJSON("assets/data/dialogue.JSON")
    playerShip.body.sprite = loadImage("assets/images/playerShip.png")
    enemySprite = loadImage("assets/images/enemyShip.png")
    cutsceneBG = loadImage("assets/images/cutsceneBG.PNG")
    infinitySymbol.body.sprite = loadImage("assets/images/infinity.png")
    titleScreenIMG = loadImage("assets/images/titleScreen.png")
    soundFormats("mp3");
    shootSound = loadSound("assets/sounds/8bit_shoot.mp3");
}


/**
 * creates the canvas
*/
function setup() {
    createCanvas(1080, 720);
    setTimeout(addEnemyShip, enemyShipDelay);
    // links the storyTimer object to the JSON file, then directs it to the Delay part of each scene (calls each after the designated delay time)
    storyTimer.counter = storyDialogue.Scenes[sceneIndex].Delay;
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


// Generates the enemy ships (UFOs) at the top of the screen on a random x coordinate
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
    if (state === "storyCutscene") {
        storyCutscene();
    }
}

// The title screen menu with three game modes, Play Game, Story and Defend
function title() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(LEFT, LEFT)
    background("#000000");
    push();
    imageMode(CENTER);
    image(titleScreenIMG, width / 2, height / 2);
    pop();
    //"title Boxes" act as hit boxes to detect which one the player wants to choose
    gamePick(titleBoxPlay);
    gamePick(titleBoxDefender);
    gamePick(titleBoxStory);
}


// detects the overlap of the mouse over the title box 
function gamePick(titleBox) {
    if (state === "title") {
        const mouseGameModeOverlap = mouseX > titleBox.x &&
            mouseX < titleBox.x + titleBox.w &&
            mouseY > titleBox.y &&
            mouseY < titleBox.y + titleBox.h;

        if (mouseGameModeOverlap && mouseIsPressed) {
            state = titleBox.state
        }
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
    for (let enemyShip of enemyShips) {
        moveEnemyShip(enemyShip);
        drawSpriteElements(enemyShip);
    }
    checkBulletEnemyOverlap();
    checkPlayerEnemyOverlap();
    drawScore(score);
    drawHealthBar();
    countDown(playCutsceneTimer);
    playScene(playCutsceneTimer, "playGameCutscene");

}

//the Cutscene which interrupts the "playGame" mode
function playGameCutscene() {
    push();
    imageMode(CENTER);
    image(cutsceneBG, width / 2, height / 2);
    pop();
    checkDialogueTimer("playGameCutscene", cutsceneText);
}

//Story Mode of the Game

function storyMode() {
    background("#1c022b");
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
    drawScore(score);
    drawHealthBar();
    countDown(storyTimer);
    playScene(storyTimer, "storyCutscene");
}


//the Cutscene which interrupts the "playGame" mode
function storyCutscene() {
    push();
    imageMode(CENTER);
    image(cutsceneBG, width / 2, height / 2);
    pop();
    // defines dialogArray as being within the JSON file, indiactes which scene and which line to display
    const dialogArray = storyDialogue.Scenes[sceneIndex].Dialogue;
    checkDialogueTimer("storyCutscene", dialogArray);

}

// The last game mode, the player is alone and a "secret message" can be uncovered by moving the ship up and down and sideways
function defenderMode() {
    background("black");
    for (let bullet of bullets) {
        moveBullet(bullet);
        drawBullet(bullet);
    }
    drawSpriteElements(infinitySymbol);
    drawDefenderText(playerShip.body.x, defenderString02);
    drawDefenderText(playerShip.body.y, defenderString01);
    drawSpriteElements(playerShip);
    destroyBullet();
    movePlayerDefender();
    // displays an error instead of the score
    drawScore("Err");
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


// moves the player ship in the defender version, moved using up and down arrow keys on x and y axis
function movePlayerDefender() {
    if (keyIsDown(LEFT_ARROW)) {
        playerShip.body.x -= playerShip.body.velocity;
    } else if (keyIsDown(RIGHT_ARROW)) {
        playerShip.body.x += playerShip.body.velocity;
    }
    playerShip.body.x = constrain(playerShip.body.x, 0, width);
    if (keyIsDown(UP_ARROW)) {
        playerShip.body.y -= playerShip.body.velocity;
    } else if (keyIsDown(DOWN_ARROW)) {
        playerShip.body.y += playerShip.body.velocity;
    }
    playerShip.body.y = constrain(playerShip.body.y, 0, height);
}


//the text that is hidden under the ship in defender mode, mapped to the x and Y placement of the ship, Wasn't originally going to keep them overlapping, but I kind of like that "there's nowhere to go" is harder to decipher
//messagesa are revealed at top of the canvas and at bottom left
function drawDefenderText(shipCoord, string) {
    let defenderfill = map(shipCoord, 500, 0, 0, 255);
    push();
    fill(defenderfill);
    textFont('Courier New');
    text(string, playerShip.body.x - 240, playerShip.body.y + 200);
    pop();

}

//Moves the bullet
function moveBullet(bullet) {
    bullet.y -= bullet.velocity;

}

//countdown until playGame displays the end "cutscene"
function countDown(timer) {
    timer.counter -= 0.01;

}

//determines when the timer end, displays the cutscene dsignated scene
function playScene(timer, scene) {
    if (floor(timer.counter) === 0) {
        state = scene;
    }
}

/**
 * Handles the  overlapping the player and enemy elements
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
                //makes the enemy ship disappear
                const index = enemyShips.indexOf(enemyShip);
                enemyShips.splice(index, 1);
            }
        }
    }


}

// calculates if the enemy overlaps the player and the player takes damage
function checkPlayerEnemyOverlap() {
    for (let enemyShip of enemyShips) {
        // Get distance from spray to the hit elements
        const playerD = dist(playerShip.body.x, playerShip.body.y, enemyShip.body.x, enemyShip.body.y);
        // Check if it's an overlap
        const playerHit = (playerD < enemyShip.body.size / 2 + playerShip.body.size / 2);
        if (playerHit) {
            // increase the score
            healthBar.healthlvlWidth -= 20;
            // constrains enemy ship
            healthBar.healthlvlWidth = constrain(healthBar.healthlvlWidth, 0, healthBar.healthlvlWidth);
            //removes the hit UFO from the enemy ship array
            const index = enemyShips.indexOf(enemyShip);
            enemyShips.splice(index, 1);
        }

    }


}

// move the enemy UFO
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

/// displays the score in top right 
function drawScore(scoreText) {
    push();
    textAlign(RIGHT, TOP);
    textFont('Courier New');
    textSize(100);
    fill("#37cf3c");
    text(scoreText, width, 0);
    pop();

}

// a red bar that gets shorter as the player hits the enemy ship
function drawHealthBar() {
    push();
    noStroke();
    fill(healthBar.color);
    rect(healthBar.x, healthBar.y, healthBar.healthlvlWidth, healthBar.h);
    pop();

}

// shoots bullets as player clicks the spacebar
function keyPressed() {
    if (keyCode === 32) {
        bullets.push(createBullets())
        shootSound.play();


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

//For the PlayGame cutscene texts
//Functions draws the text boxes
function drawTextBox(textBox, textArray) {
    //border
    push();
    fill(textBox.border.fill);
    rect(textBox.border.x, textBox.border.y, textBox.border.w, textBox.border.h);
    pop();
    // text box
    push();
    fill(textBox.body.fill);
    rect(textBox.body.x, textBox.body.y, textBox.body.w, textBox.body.h);
    pop();
    push();
    fill("#66ff66");
    textSize(20);
    textAlign(LEFT);
    textFont('Courier New');
    //plug in wanted text here!
    text(textArray[dialogueIndex], textBox.body.x + 5, textBox.body.y + 5, textBox.body.w, textBox.body.h)
    pop();
}


//Delays the appearance of the dialogue box
function checkDialogueTimer(scene, dialogue) {
    //dialogue appearance for the play game custscene
    if (state === scene) {
        setTimeout(showTheTextBox, 1000);
    }
    if (showDialogueBox == true) {
        drawTextBox(textBoxCutscene, dialogue);
    }
}

//handles the showing of the text box
function showTheTextBox() {
    showDialogueBox = true;
}

//Allows the player to click through the two custscene dialogues, play game and story mode
function mousePressed() {
    // for the play game version
    if (state === "playGameCutscene" && showDialogueBox === true) {
        dialogueIndex++;
        if (dialogueIndex === cutsceneText.length) {
            // returns player to the title screen at the end of the play game dialogue array
            dialogueIndex = 0;
            state = "title";
        }
    }
    // for the story mode cutscenes
    if (state === "storyCutscene" && showDialogueBox === true) {
        dialogueIndex++;
        // returns the Dialogue JSON path, selects the scene from the array, then the dialogue of that scene
        if (dialogueIndex === storyDialogue.Scenes[sceneIndex].Dialogue.length) {
            sceneIndex++;
            if (sceneIndex === storyDialogue.Scenes.length) {
                // at the end of all scenes, return to the title screen
                state = "title";
            }
            else {
                // if not at the end of the scenes, return to the game
                dialogueIndex = 0;
                storyTimer.counter = storyDialogue.Scenes[sceneIndex].Delay;
                state = "storyMode";
            }
        }
    }
}











