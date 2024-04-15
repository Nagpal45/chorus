import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 
const THRESHOLD = 0.75; // Adjust this value for sensitivity

export const loveYouGesture = new GestureDescription('i_love_you'); 
loveYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, THRESHOLD)
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);
loveYouGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD)
loveYouGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);
loveYouGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, THRESHOLD)
loveYouGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);

for(let finger of [Finger.Middle, Finger.Ring]){
    loveYouGesture.addCurl(finger, FingerCurl.FullCurl, .75); 
    loveYouGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}


export const playGesture = new GestureDescription('play');
playGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD);
playGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, THRESHOLD);
playGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, THRESHOLD);
playGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, THRESHOLD);
playGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, THRESHOLD);

export const pauseGesture = new GestureDescription('pause');
pauseGesture.addCurl(Finger.Index, FingerCurl.FullCurl, THRESHOLD);
pauseGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, THRESHOLD);
pauseGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, THRESHOLD);
pauseGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, THRESHOLD);
pauseGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, THRESHOLD);

export const previousGesture = new GestureDescription('previous');
previousGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD);
previousGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.25)
previousGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, THRESHOLD);
previousGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, THRESHOLD);
previousGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, THRESHOLD);
previousGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, THRESHOLD);
previousGesture.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.25)


export const nextGesture = new GestureDescription('next');
nextGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD);
nextGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.25)
nextGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, THRESHOLD);
nextGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, THRESHOLD);
nextGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, THRESHOLD);
nextGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, THRESHOLD);
nextGesture.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.25)


export const volumeUpGesture = new GestureDescription('volume_up');
volumeUpGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD);
volumeUpGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25)
volumeUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, THRESHOLD);
volumeUpGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25)
volumeUpGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, THRESHOLD);
volumeUpGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, THRESHOLD);
volumeUpGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, THRESHOLD);



export const volumeDownGesture = new GestureDescription('volume_down');
volumeDownGesture.addCurl(Finger.Index, FingerCurl.NoCurl, THRESHOLD);
volumeDownGesture.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.25)
volumeDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, THRESHOLD);
volumeDownGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25)
volumeDownGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, THRESHOLD);
volumeDownGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, THRESHOLD);
volumeDownGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, THRESHOLD);
