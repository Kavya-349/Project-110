var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    })
}

console.log("ml5 version:", ml5.version);

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1Y5mcyoiq/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is " + prediction_1;
    speak_data2 = "and the second prediction is " + prediction_2;
    var utterthis = speak_data1 + speak_data2;
    synth.speak(utterthis);
}