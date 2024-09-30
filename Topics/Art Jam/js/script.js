/**
 * Gluttonous Goldfish
 * Olivia Axiuk
 * 
 * A goldfish that really, really, really loves food, so much it gets bigger 
 * and redder until it dies....
 * Fish gets bigger if the user does an "eating" motion (shakes the mouse) over the food pellet
 */

"use strict";

// Descriptors of the goldfish
let goldfish = {
    color: {
        r: 255,
        g: 165,
        b: 0,
        minG: 0,
        maxG: 255,
        // color on death
        deadFill: {
            r: 200,
            g: 200,
            b: 200
        }
    },
    shape: {
        x: undefined,
        y: undefined,
        size: 30
    },
    // is the fish alive?
    alive: true,
    // tracks how much food it eats and the threshgold at which is dies by eating too much
    weight: 0,
    weightThreshold: 300
}

// descriptors of the fish food
let fishFood = {
    color: "#A52A2A",
    shape: {
        x: 400,
        y: 5,
        size: 25
    },
    velocity: {
        x: 0,
        y: 1
    }
};



// sets up the canvas and makes user's cursor not show when controlling the fish
function setup() {
    createCanvas(640, 400);
    noCursor();

};

// draws the pale water of the aquarium and the fish

function draw() {
    background(173, 216, 230);
    moveGoldfish();
    checkEatingFood();
    drawOrnaments();
    drawFishFood();
    drawGoldfish();
    MapBgColor();
};





// Goldfish follows the mouse
function moveGoldfish() {
    // checks fi creature is dead and stops ability for user to move it
    if (!goldfish.alive) {
        return;
    }
    goldfish.shape.x = mouseX;
    goldfish.shape.y = mouseY;
};
// checks to see if the fish is eating the food
function checkEatingFood() {
    if (!goldfish.alive) {
        return;
    }
    //distance between mouse which fish follows and food
    const distance = dist(goldfish.shape.x, goldfish.shape.y, fishFood.shape.x, fishFood.shape.y);
    // if mouse overlaps the food
    const fishandFoodOverlapping = (distance < fishFood.shape.size / 2);
    // checks if mouse is moving so fish eats
    const mouseIsMoving = (movedX !== 0 || movedY !== 0); // example code taken from Creature Loves Massage by Pippin Barr
    // check if the mouse which controls the fish has touched the food and is eating
    if (fishandFoodOverlapping && mouseIsMoving) {
        goldfish.color.g -= 1.5;
        goldfish.weight += 2;
        goldfish.shape.size += 1;
    }
    if (goldfish.weight > goldfish.weightThreshold) {
        // checks if fish died
        goldfish.alive = false;
        // changes color to deadFill
        goldfish.color.r = goldfish.color.deadFill.r;
        goldfish.color.g = goldfish.color.deadFill.g;
        goldfish.color.b = goldfish.color.deadFill.b;


    }
}


// draws the  background elements
function drawOrnaments() {
    // sand
    push();
    fill("#E5B88B")
    noStroke();
    rect(0, 320, 650, 100)
    pop();
    // Green plants (fromt left to right)
    // plant 01
    push();
    fill("#1E7A33")
    noStroke();
    rect(20, 100, 25, 250)
    pop();
    // plant 02
    push();
    fill("#1E7A33")
    noStroke();
    rect(85, 120, 25, 225)
    pop();
    // plant 03
    push();
    fill("#1E7A33")
    noStroke();
    rect(500, 120, 25, 225)
    pop();


};

// draws fish food that falls from the top then stops on the ground
function drawFishFood() {
    // fish food piece one
    push();
    fill(fishFood.color);
    noStroke();
    ellipse(fishFood.shape.x, fishFood.shape.y, fishFood.shape.size);
    pop();
    // moves fish food, makes it fall
    fishFood.shape.y += fishFood.velocity.y
    //fishFood.shape.y = constrain(-300)
    if (fishFood.shape.y > 325) {
        fishFood.velocity.y = 0
    }
};

// draws the goldfish which follows the mouse
function drawGoldfish() {
    // body
    push();
    fill(goldfish.color.r, goldfish.color.g, goldfish.color.b);
    noStroke();
    ellipse(goldfish.shape.x, goldfish.shape.y, goldfish.shape.size);
    pop();
    // eye
    push();
    fill("black")
    stroke("white")
    ellipse(goldfish.shape.x + goldfish.shape.size / 3, goldfish.shape.y, goldfish.shape.size / 10)
    pop();
    // tail
    push();
    fill(goldfish.color.r, goldfish.color.g, goldfish.color.b);
    triangle(goldfish.x - goldfish.size / 2, goldfish.shape.y, goldfish.shape.x - goldfish.shape.size, goldfish.shape.y - goldfish.shape.size / 2, goldfish.shape.x - goldfish.shape.size, goldfish.shape.y + goldfish.shape.size / 2);
    pop();
    goldfish.color.g = constrain(goldfish.color.g, goldfish.color.minG, goldfish.color.maxG)
};

function MapBgColor() {

}
