/**
 * Introducing Variables
 * Pippin Barr
 * 
 * Learning what a variable is and what it does
 */

"use strict";

/**
 * create canvas
*/
function setup() {
    createCanvas(640, 480);

}


/**
 * Draw circles in the cnter of the canvas
*/
function draw() {
    background(0);

    // draw circles
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(mouseX, mouseY, 100, 100);
    pop();


}