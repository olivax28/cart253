/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225,
        maxR: 255,
        minG: 0,
        minB: 0
    }
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(160, 180, 200);

    // makes mr furious turn red gradually
    mrFurious.fill.g = mrFurious.fill.g - 1;
    mrFurious.fill.b = mrFurious.fill.b - 1;

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();
}