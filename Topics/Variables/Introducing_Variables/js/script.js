/**
 * Introducing Variables
 * Olivia Axiuk
 * 
 * variables experiments
 */

"use strict";

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;


let holeShade = 0;
let holeSize = 120;
let holeX = 140;
let holeY = 175;


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
    background(cheeseRed, cheeseGreen, cheeseBlue);

    // draw hole
    push();
    fill(holeShade);
    noStroke();
    ellipse(holeX, holeY, holeSize);
    pop();


}