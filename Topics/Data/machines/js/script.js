/**
 * Machines
 * Pippin Barr
 * 
 * A starting point for a project that displays different machines
 * on the canvas. Eventually I'd like to be able to drag and drop
 * items onto the machines and have them act in different ways.
 * For now I'm happy to just show that they're distinct.
 */

"use strict";
const machines = [{
        type: "incinerator",
        x: 0,
        y: 100,
        width: 100,
        height: 100,
        fill:"#ff4400",
        draggable: true,
        functionality: 100
    },
    
    {
        type: "freezer",
        x: 150,
        y: 100,
        width: 100,
        height: 100,
        fill: "#bbbbff",
        draggable: false,
        functionality: 87
    
    },
    
    {
        type: "crusher",
        x: 300,
        y: 100,
        width: 100,
        height: 100,
        fill: "#777777",
        draggable: true,
        functionality: 45
    },
    

]




/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 200);
}

/**
 * Display the three machines
 */
function draw() {
    background(0);
    for (let machine of machines) {
        drawMachine(machine);
    }
   
}


function drawMachine(machine){
    push();
    noStroke();
    fill(machine.fill);
    rect(machine.x, machine.y,machine.width, machine.height);
    pop();

}