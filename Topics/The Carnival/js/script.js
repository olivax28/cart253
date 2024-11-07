/**
 * The Carnival Game
    * Olivia Axiuk
        * 
 * A carnival game, try to win the best prizes and try not to hit the sad clowns, game ends when health bar is low or timer ends.
 * 
 * Instructions:
 * - Move the gun with your mouse
    * - Click to launch the spray, press and hold for a longer reach
        * - Hit the targets, avoid the sad clowns, happy clowns are worth more
            * sad clowns remove - 10 health and - 5 points
                * happy clowns add health back! And add 3 points
                    * Two levels of prizes to be won, a bear or a cuddly clown. 
 * The bear wins for under 50 points(consider it a participation gift!)
    * The cuddly clown wins for over 50 points
        * Again, if the healthbar hits 0 its game over
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
        y: 420,
        //size: 150,
        sprite: undefined,

    },
    // The gun's spray has a position, size, speed, and state
    spray: {
        x: undefined,
        y: 480,
        size: 12,
        speed: 20,
        // Determines how the spray moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

};

// prixes to be won, defined later as states
const prizes = {
    clownPrizeSprite: undefined,
    bearPrizeSprite: undefined
}
// The targets, hit to gain points
// Has a position, size, and speed of horizontal movement as well as two levels of fill (red)
const target = {
    x: 0,
    y: 200, // Will be random
    size: 50,
    secondSize: 30,
    centerSize: 15,
    speed: 1.5,
    mainFill: "#cb0000",
    secondFill: "#FFFFFF"
};

// Has a position, size, and speed of horizontal movement as well as two levels of fill (blue)
const Bluetarget = {
    x: 0,
    y: 200, // Will be random
    size: 50,
    secondSize: 30,
    centerSize: 15,
    speed: 3,
    mainFill: "#002eff",
    secondFill: "#FFFFFF"
};




//draws rgw sad clown

const sadClown = {
    x: 0,
    y: 200, // Will be random
    size: 45,
    speed: 3,
    sprite: undefined
};

const happyClown = {
    x: 0,
    y: 200, // Will be random
    size: 45,
    speed: 4,
    sprite: undefined
};

// the red healthbar
let healthBar = {
    x: 20,
    y: 5,
    HealthlvlWidth: 100,
    maxWidth: 100,
    h: 30,
    color: "#ff1b1b"
}




// the current score and its minimum for resetting purposes
let score = 0;
let scoreMin = 0;
//Timer parameters
let timer = {
    counter: 30,
    max: 30,
    min: 0,

};
// Text to Display during states
let titleString = "The Carnival Game"
let gameOverString = "You Died :( Press any key to restart"

//the current state
let state = "title";

// preloads all the sprites
function preload() {
    gun.body.sprite = loadImage("assets/images/player_gun.PNG")
    happyClown.sprite = loadImage("assets/images/happyClown_sprite.PNG")
    sadClown.sprite = loadImage("assets/images/sadClown_sprite.PNG")
    prizes.clownPrizeSprite = loadImage("assets/images/prize_clown.PNG")
    prizes.bearPrizeSprite = loadImage("assets/images/prize_patchbear.PNG")
}

function setup() {
    createCanvas(640, 480);
    resetTarget(target);
    resetTarget(Bluetarget);
    resetTarget(sadClown);
    resetTarget(happyClown);
}



function draw() {
    //Check the state the game is in (title, gameplay, gameover and prizes)
    if (state === "title") {
        title();
    }
    if (state === "game") {
        game();

    }
    if (state === "gameOverScreen") {
        gameOverScreen();
    }

    if (state === "prize01Screen") {
        prize01Screen();
    }

    if (state === "prize02Screen") {
        prize02Screen();
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

    push();
    fill("#");
    text("Click to Begin", width / 2, 350)
    pop();

    if (mouseIsPressed) {
        state = "game";
    }
}

// The Game begins! GAME DESCRIPTION HERE


function game() {
    background("#45125b");
    moveHitItems();
    drawTarget(Bluetarget);
    drawTarget(target);
    drawSadClown();
    drawHappyClown();
    movegun();
    moveSpray();
    //preload();
    drawgun();
    checkSprayHitElementOverlap();
    drawScore();
    drawHealthBar();
    countDown();
    drawTimer();
    calculatePrize();

}

/**
 * Moves the target according to its speed
 * Resets the target if it gets all the way to the right
 */
function moveHitItems() {
    // Move the target
    target.x += target.speed;
    // Handle the target going off the canvas
    if (target.x > width) {
        resetTarget(target);
    }
    //Move the Blue target
    Bluetarget.x += Bluetarget.speed;
    // Handle the target going off the canvas
    if (Bluetarget.x > width) {
        resetTarget(Bluetarget);
    }
    // moves the sad clown
    sadClown.x += sadClown.speed;
    // Handle the target going off the canvas
    if (sadClown.x > width) {
        resetTarget(sadClown);

    }
    // moves the happy clown
    happyClown.x += happyClown.speed;
    // Handle the target going off the canvas
    if (happyClown.x > width) {
        resetTarget(happyClown);

    }
}

// draws the target elements
function drawTarget(target) {
    push();
    noStroke();
    fill(target.mainFill);
    ellipse(target.x, target.y, target.size);
    pop();
    push();
    noStroke();
    fill(target.secondFill);
    ellipse(target.x, target.y, target.secondSize);
    pop();
    push();
    noStroke();
    fill(target.mainFill);
    ellipse(target.x, target.y, target.centerSize);
    pop();
}

//A black and white frowning clown (sprite)
function drawSadClown() {
    // ellipse used as hitbox
    push();
    noStroke();
    fill("#000000");
    ellipse(sadClown.x, sadClown.y, sadClown.size);
    pop();
    // sprite
    push();
    imageMode(CENTER);
    image(sadClown.sprite, sadClown.x, sadClown.y);
    pop();
}

//a joyful looking clown (sprite)
function drawHappyClown() {
    // ellipse used as hitbox
    push();
    noStroke();
    fill("#000000");
    ellipse(happyClown.x, happyClown.y, happyClown.size);
    pop();
    // draws the happy clown's sprite
    push();
    imageMode(CENTER);
    image(happyClown.sprite, happyClown.x, happyClown.y);
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

// displays the timer in small numbers on the left
function drawTimer() {
    push();
    textAlign(LEFT, TOP);
    textSize(50);
    fill("#FFFBC0");
    text(floor(timer.counter), 5, 50);
    pop();


}

// a red bar that gets shorter as the player hits the sad clowns
function drawHealthBar() {
    push();
    noStroke();
    fill(healthBar.color);
    rect(healthBar.x, healthBar.y, healthBar.HealthlvlWidth, healthBar.h);
    pop();
}


// resets all taget elements (including clowns)
function resetTarget(target) {
    target.x = 0;
    target.y = random(0, 300);
}

//resets the the healthbar
function resetHealthBar() {
    healthBar.HealthlvlWidth = healthBar.maxWidth;
}

// makes the timer count down once per second

function countDown() {
    timer.counter -= 1 / (frameRate());
}
// resets the countdown
function resetCountDown() {
    timer.counter = timer.max;
}

// resets the score
function resetScore() {
    score = scoreMin;
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
    imageMode(CENTER);
    image(gun.body.sprite, gun.body.x, gun.body.y);
    pop();
}

/**
 * Handles the spray overlapping the targets
 */
function checkSprayHitElementOverlap() {
    // Get distance from spray to the hit elements
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
    const happyClownD = dist(gun.spray.x, gun.spray.y, happyClown.x, happyClown.y);
    //Checks if spray overlaps happy clown
    const happyClownHit = (happyClownD < gun.spray.size / 2 + happyClown.size / 2);
    if (targetHit) {
        // increase the score
        score = score + 1;
        // Reset the target
        resetTarget(target);
        // Bring back the spray
        gun.spray.state = "inbound";
    }
    if (BluetargetHit) {
        // increase the score
        score = score + 2;
        // Reset the target
        resetTarget(Bluetarget);
        // Bring back the spray
        gun.spray.state = "inbound";
    }
    // removes points and health bar if sad clown is hit
    if (sadClownHit) {
        // increase the score
        score = score - 5;
        // health goes down
        healthBar.HealthlvlWidth = healthBar.HealthlvlWidth - 10
        // Reset the target
        resetTarget(sadClown);
        // Bring back the spray
        gun.spray.state = "inbound";
        if (healthBar.HealthlvlWidth - 10 == 0) {
            state = "gameOverScreen";
        }
    }
    if (happyClownHit) {
        // increase the score
        score = score + 3;
        // health goes down
        healthBar.HealthlvlWidth = healthBar.HealthlvlWidth + 10;
        // Reset the target
        resetTarget(happyClown);
        // Bring back the spray
        gun.spray.state = "inbound";
    }
}

// determines the prizes, ending screen after countdown
function calculatePrize() {
    if (floor(timer.counter) == 0 && score <= 50) {
        state = "prize01Screen";
    }
    else if (floor(timer.counter) == 0 && score >= 50) {
        state = "prize02Screen";
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

// allows for spray to top once player releases mouse
function mouseReleased() {
    gun.spray.state = "inbound";
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

    // resets game and brings the player back to title
    if (keyIsPressed) {
        state = "title";
        resetHealthBar();
        resetScore();
        resetCountDown();
    }
}


function prize01Screen() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(CENTER, CENTER)
    background("#321d35");
    //draws the prize (teddybear)
    push();
    imageMode(CENTER);
    image(prizes.bearPrizeSprite, width / 2, height / 2);
    pop();
    // draws the prize text
    push();
    fill("#ffffc7");
    text("Congrats! You won the Patchwork Teddy!", width / 2, 50)
    pop();
    push();
    fill("#ffffc7");
    text("Press any key to restart", width / 2, 400)
    pop();
    // resets game and brings the player back to title
    if (keyIsPressed) {
        state = "title";
        resetHealthBar();
        resetScore();
        resetCountDown();
    }
}


function prize02Screen() {
    //sets size and alignment of the Title text 
    textSize(32);
    textAlign(CENTER, CENTER)
    background("#321d35");

    //draws the prize (clown plushie)
    push();
    imageMode(CENTER);
    image(prizes.clownPrizeSprite, width / 2, height / 2);
    pop();
    //draws the prize text
    push();
    fill("#ffffc7");
    text("Congrats! You won the Cuddly Clown!", width / 2, 50)
    pop();
    push();
    fill("#ffffc7");
    text("Press any key to restart", width / 2, 400)
    pop();
    // resets the game and brings the player back to the title screen

    if (keyIsPressed) {
        state = "title";
        resetHealthBar();
        resetScore();
        resetCountDown();
    }
}