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
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error)
        console.error(error);
    else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#128077";
        } else if(results[0].label == "Nice") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        } else if(results[0].label == "Left") {
            document.getElementById("update_emoji").innerHTML = "&#128073;";
        } else {
            document.getElementById("update_emoji").innerHTML = "&#128072;";
        } 

        if(results[1].label == "Best") {
            document.getElementById("update_emoji2").innerHTML = "&#128077";
        } else if(results[1].label == "Nice") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        } else if(results[1].label == "Left") {
            document.getElementById("update_emoji2").innerHTML = "&#128073;";
        } else {
            document.getElementById("update_emoji2").innerHTML = "&#128072;";
        } 
    }
}