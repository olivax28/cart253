/**
 * The Blank Page
 * Olivia Axiuk
 * 
 * An exploration of existential angst of a novelist
 * who must sit down ar their pink desk and confront the abyss of the plank page
 * 
 * Program is not interactive.
 */

"use strict";

/**
 * Creates a canvas for our piece
 */
function setup() {
    // Create the canvas at a standard resolution
    createCanvas(640, 480);
}

/**
 * Draws the Writer's desktop and the blank piece of paper
 */
function draw() {
    // The pink desktop
    background(255, 100, 100);
    // The blank piece of paper
    rect(200, 80, 240, 320);
}