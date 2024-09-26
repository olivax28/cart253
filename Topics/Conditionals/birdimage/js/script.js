/**
 * bird
 * Olivia Axiuk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// We need a variable to store our image in so we can use it later
// "undefined" here means that there's nothing useful in the variable YET.
let bird = {
    // Position of the bird (where we will place the image)
    x: 100,
    y: 50,
    // The bird is going to move so it has velocity
    velocity: {
        x: 2,
        y: 1
    },
    // The image of the bird, which we will load in preload()
    image: undefined
};

/**
 * Load our bird image
 */
function preload() {
    // This is how you load an image!
    // Note that loadImage() needs the PATH to your image inside your project
    // Note that the path is CASE SENSITIVE
    // Note that the filename is CASE SENSITIVE
    // Note the QUOTE MARKS around the path
    birdImage = loadImage("assets/images/bird.png");
}

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(0);

    // This is how you display an image!
    // The image will be drawn from its TOP LEFT CORNER like a rectangle
    // The arguments here are:
    // - birdImage <- The variable with the image in it
    // - 100 <- the x coordinate for the top left corner
    // - 50 <- the y coordinate for the top left corner
    // So the TOP LEFT CORNER of the bird image will be at (100, 50)
    push();
    imageMode(CENTER);
    // Now the CENTER of the bird image will be at (100, 50)
    image(birdImage, 100, 50);
    pop();
}