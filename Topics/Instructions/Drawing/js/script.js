/**
 * Green Vinyl
 * Olivia Axiuk
 * 
 * Displays an image of a mysterious green vinyl...
 */

"use strict";

/**
 * Creates square canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Grey background
*/
function draw() {
    background(150);

    // The main part of ther ecord

    push();
    fill(96, 245, 121)
    stroke(255, 255, 255)
    ellipse(320, 320, 480);
    pop();

    // record label
    push();
    fill('white');
    noStroke();
    ellipse(320, 320, 140, 140)
    pop();

    // label hole
    push();
    fill("#000000");
    ellipse(320, 320, 20,)
    pop();
}