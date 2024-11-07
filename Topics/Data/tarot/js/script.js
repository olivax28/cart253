/**
 * Tarot
 * Pippin Barr
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";

// tarot data

let tarot = undefined;

let fortune = "click to show a fortune"
function preload(){
    tarot = loadJSON("assets/data/tarot_interpretations.json");
}


/**
 * tbd.
*/
function setup() {
    createCanvas(800,400);
}


/**
 * tbd.
*/
function draw() {
    background(0);
push();
textSize(16);
fill("yellow");
textAlign(CENTER,CENTER);
text(fortune, width / 2, height / 2);
pop();
}


function mousePressed(){
    const card = random(tarot.tarot_interpretations);
     fortune = random(card.fortune_telling);
}