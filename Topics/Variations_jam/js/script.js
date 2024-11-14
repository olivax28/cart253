/**
 * Astral Projectiles
 * Olivia Axiuk
 * 
 *(GAME DESCRIPTION HERE)
 */

"use strict";

let playerShip = {
    body: {
        x: 320,
        y: 420,
        sprite: undefined,

    },
    // The gun's spray has a position, size, speed, and state
    bullet: {
        x: undefined,
        y: 480,
        size: 10,
        speed: 30,
        // Determines how the spray moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },



}




// The targets, hit to gain points
// Has a position, size, and speed of horizontal movement as well as two levels of fill (red)
const spaceInvader = {
    x: 100, // will be random
    y: 0,
    size: 50,
    speed: 2
};

// the red healthbar
let healthBar = {
    x: 20,
    y: 5,
    HealthlvlWidth: 100,
    maxWidth: 100,
    h: 30,
    color: "#7eff1b"
}


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(1080, 720);


}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0, 0, 0);

}