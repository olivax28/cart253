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
        size: 25
    },
    
}

// const food = {}


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640,400);
    noCursor();

}

function moveGoldfish() {
    goldfish.shape.x = mouseX;
    goldfish.shape.y = mouseY;
}

/**
 * draws the pale water of the aquarium
*/
function draw() {
    background(173,216,230);
    moveGoldfish();
    drawGoldfish();
}
// draws the goldfish which follows the mouse
function drawGoldfish() {
    push();
    fill(goldfish.color.r, goldfish.color.g, goldfish.color.b);
    noStroke();
    ellipse(goldfish.shape.x, goldfish.shape.y,goldfish.shape.size);
    pop();
}