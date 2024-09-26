/**
 * Gluttonous Goldfish
 * Olivia Axiuk
 * 
 * A goldfish that really, really, really loves food, so much it gets bigger 
 * and bigger until it dies....
 */

"use strict";

// Descriptors of the goldfish
let goldfish = {
        color: {
            r:255,
            g:165,
            b:0
        },
    shape: {
        x: undefined,
        y: undefined,
        size: 30
    },
    
}
// descriptors of the fish food
let fishFood = {
    color: "#A52A2A",
    shape: {
    x: 320,
    y: 200,
    size: 30
    },
}

/**
 * 
*/
function setup() {
    createCanvas(640,400);
    noCursor();

}



/**
 * draws the pale water of the aquarium and the fish
*/
function draw() {
    background(173,216,230);
    moveGoldfish();
    drawGoldfish();
    drawfishFood();
}

function moveGoldfish() {
    goldfish.shape.x = mouseX;
    goldfish.shape.y = mouseY;
}

// draws the goldfish which follows the mouse
function drawGoldfish() {
    push();
    fill(goldfish.color.r, goldfish.color.g, goldfish.color.b);
    noStroke();
    ellipse(goldfish.shape.x, goldfish.shape.y,goldfish.shape.size);
    pop();
    ellipse(goldfish.shape.x + goldfish.shape.size/3, goldfish.shape.y, goldfish.shape.size/10)
}

// draws the fish food
function drawfishFood() {
    push();
    fill(fishFood.color);
    noStroke();
    square(fishFood.shape.x, fishFood.shape.y, fishFood.shape.size);
    pop();
    console.log(fishFood.shape.x, fishFood.shape.y, fishFood.shape.size);
}

