// do whatever

const leapjs = require('leapjs');
const plugins = require('leapjs-plugins');

leapjs.loop(function(frame) {
    if (frame.hands.length > 0) {
        // [ASSUME] only 1 hand is detected
        hand = frame.hands[0];
        console.log(hand.screenPosition());
    }
    else {
        console.log("Hand not detected.");
    }
}).use('screenPosition');