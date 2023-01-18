// it just prints

const leapjs = require('leapjs');

leapjs.loop(function(frame) {
    console.log("You have " + frame.fingers.length + " fingers.");
});