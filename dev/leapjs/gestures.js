const leapjs = require('leapjs');

/* 'gestures' are deprecated? 
 * (https://developer-archive.leapmotion.com/documentation/javascript/api/Leap.Controller.html#Controller.Event.gesture) */

let options = {
    frameEventName : 'deviceFrame',
    enableGestures : true,
};
let controller = new leapjs.Controller(options);

controller.on('frame', function(frame) {
    for (let i = 0; i < frame.data.gestures.length; i++) {
        var gesture = frame.data.gestures[i];
        var type = gesture.type;
        console.log(type);
    }
});

controller.connect();