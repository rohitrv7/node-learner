const express = require('express')
const NodeWebcam = require( "node-webcam" );
const app = express()

const port = 5000


//Creates webcam instance

var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    // callbackReturn: "base64",
    verbose: true
};
var Webcam = NodeWebcam.create( opts );

Webcam.capture( "test_picture", function( err, data ) {
    if(err) return console.log("webcam error: ", err);
    console.log(data);
} );

// NodeWebcam.capture( "test_picture", opts, function( err, data ) {    

// });

// NodeWebcam.capture( "test_picture", opts, function( err, data ) {});

//Will automatically append location output type

Webcam.capture( "test_picture", function( err, data ) {} );


app.listen(port, ()=>{
    console.log(`app is runnung port: ${port}`);
})