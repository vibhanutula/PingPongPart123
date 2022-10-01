function preload() {
    // Empty for now I guess //
}


function setup() {
    canvas = createCanvas(600,400);
    canvas.parent('canva');

    video = createCapture(VIDEO);
    video.hide();
    video.size(600,400);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

rwX = "";
rwY = "";
rwScore = "";

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        rwX = results[0].pose.rightwrist.x;
        rwY = results[0].pose.rightwrist.y;
        rwScore = results[0].pose.rightwrist.score;
    }
}

function draw() {
    if(rwScore > 0.2) {
        fill('#00fcff');
        stroke('#004546');
        circle(rwX, rwY, 20);
    }
    image(video, 0, 0, 600, 400);
}

