/**
 * Introducing Variables
 * Pippin Barr
 * 
 * variables experiments
 */

"use strict";

/**
 * create canvas
*/
function setup() {
    createCanvas(480, 480);

}


/**
 * Draws a hole in cheese
*/
function draw() {

    // the cheese
    background(255, 255, 0)

    // draw hole
    push();
    fill(0);
    noStroke();
    ellipse(140, 175, 180);
    pop();


}