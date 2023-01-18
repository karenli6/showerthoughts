# TODOs

- choose method of summarizing controller frame data; the 'gestures' interface is inconsistent
    - just track the "center of mass" of the tracked hand? might make zooming in/out weird
    - are the positions of the fingers important for anything? maybe just zooming in/out?
- identification of "actions"
    - cursor movement (move hand around; might be able to allow for some awkwardness)
    - zooming in/out (fingers pinching)
    - rotation (hand swipes perpendicular(?) to controller surface)
    - selection (hand holds cursor(?) over one location/object for a sustained period of time)
- make framework(?) for handling user actions to affect the graph render; interface should be
    modular(?) enough so that KB/M and Leap Motion controls are handled the same at a high level
- connect Leap Motions controls with the above framework