// lets make the two waves

let time1;
let osc, playing, freq, amp;

let freqArray = [200,300,230];
let ampArray = [0.7,0.5,0.9];

// let timeArray = [3,3,3];

let step1 = 0;
let lastObjNum;

// use these later for beats
let osc2, playing2, freq2, amp2;
let freqArray2 = [201,301,231];
let ampArray2 = [0.7,0.5,0.9];

//drum initiation
let drum_k,drum_s;

//amp initiation
let ampOn = false;

/////////////////////
//balls initiation
/////////////////////
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


let xspacing2 = 16; // Distance between each horizontal location
let w2; // Width of entire wave
let theta2 = 0.0; // Start angle at 0
let amplitude2 = 75.0; // Height of wave
let period2 = 500.0; // How many pixels before the wave repeats
let dx2; // Value for incrementing x
let yvalues2; // Using an array to store height values for the wave

// i think they need a separate array bc the volume messes with it
let ballsAmp;
let ballsAmpArray = [0.7,0.5,0.9];

//colors of the balls
let ballscolor1;
let r1,g1,b1,a1;
let ballscolor2;
let r2,g2,b2,a2;

//sequence timer
let playTimer = 0;


// stupid button for user gesture
let button;


// time sequencer initiation
let timer1 = 0;
let secondsCount = 0;
let timeArray = [3,5,2];
let dummyArray = ["pew pew","cow milk", "no u"];
let sum = 0;
let playTime = 0;
let timeStep = 0;
let subtractiveTime = 0;
let secStep = 0;
let elementStep = 0;
let elementTimer = 0;
let elementEndTime = 0;
let milliseconds1 = 0;
let seconds1 = 0;
let finalArrayElement = 0;
let seconds2 = 0;

//time mouse event / they delay of press to release
let pressTime = 0;
let mouseClickedTime = 0;
let mouseReleasedTime = 0;

let mouseReleasedBool = true;

function setup() {
  // let cnv = createCanvas(width, height);
  // cnv.mousePressed(playOscillator);
  // playOscillator();
  createCanvas(windowWidth,windowHeight);
  osc = new p5.Oscillator('sine');
  // osc2 = new p5.Oscillator('sine');
  // frameRate(1000);
  time1 = 0;
   osc.start();
    // osc2.start();
  playing = true;
  millis(0);


  // for if i decide to use the center line thing
  // lineColor = color(random(255),random(255),random(255));



  /////////////////////////
  // drum kit setup
  /////////////////////////
  drum_k = loadSound('sounds/RCK K.wav');
  drum_s = loadSound('sounds/RCK S.wav');



  /////////////////////////////////
  // balls setup or it might break
  /////////////////////////////////
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  w2 = width + 16;
  dx2 = (TWO_PI / period2) * xspacing2;
  yvalues2 = new Array(floor(w2 / xspacing2));


  ////////////////////////////////
  // balls colors
  ///////////////////////////////

     time1 = 0;
     counter1 = 0;
     timer1 = 0;
     delay = 0;

     r1 = random(255);
     g1 = random(255);
     b1 = random(255);
     a1 = random(255);

     r2 = random(255);
     g2 = random(255);
     b2 = random(255);
     a2 = random(255);

     ampOn = false;

     //button for user gesture
     button = createButton('Play');
     button.position(40, 100);
     button.mousePressed(buttonPlay);


     //time sequencer setup

  secStep = 0;

  elementStep = 0;

elementEndTime = timeArray[elementStep] + seconds1;
// elementEndTime = timeArray[step1] + seconds1;


  milliseconds1 = millis();
  seconds1 = int(milliseconds1/1000);
}

function draw() {
  background(0);
  textSize(14);
  // playOscillator();
  time1 = millis();

  playTimer = 0;
  // print(time1);

  lastObjNum = timeArray.length - 1;

  // if (frameCount%300 === 0){
  //   step1++;
  // }
  // if (step1 > lastObjNum) {step1 = 0;}



    //
    // freq = freqArray[step1];
    // // amp = ampArray[step1];
    // ballsAmp = ballsAmpArray[step1];


        freq = freqArray[elementStep];
        // amp = ampArray[step1];
        ballsAmp = ballsAmpArray[elementStep];

   // freq2 = freqArray2[step1];
   //  amp2 = ampArray2[step1];

  fill(250);
  text('tap to add tones', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + ballsAmp, 20, 60);
  text('number of values ' + freqArray.length, 20, 80);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);

  }
  ballsColor();
  calcWave();
  renderWave();
  drawBalls();

  ballsColor2();
  calcWave2();
  renderWave2();
  drawBalls2();

  controlAmp();
  timeSequencer();

  addReverb();
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mousePressed(){
  if(mouseButton === LEFT){
  freqArray.push(constrain(map(mouseX, 0, width, 100, 500), 100, 500));
  // freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  // amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  ampArray.push(constrain(map(mouseY, height, 0, 0, 1), 0, 1));
  ballsAmpArray.push(constrain(map(mouseY, height, 0, 0, 1), 0, 1));
  // timeArray.push(pressTime);
  //
  // pressTime = ceiling(mouseReleasedTime - mouseClickedTime);
  // if (mouseClicked()){ mouseCLickedTime = millis()/1000}
  // if (mouseReleased()){ mouseReleasedTime = millis()/1000}


    // pressTime = ceil(mouseReleasedTime - mouseClickedTime);
    // if (mouseClicked() === true){ mouseCLickedTime = millis()/1000;}
    // if (mouseReleased() === true){ mouseReleasedTime = millis()/1000;timeArray.push(pressTime);}
mouseClickedTime = millis()/1000;
mouseReleasedBool = false;
}//end mouse left

}

function mouseReleased() {
  if (mouseButton === LEFT){
  if (mouseReleasedBool = true){


    mouseReleasedTime = millis()/1000;

    pressTime = ceil(mouseReleasedTime - mouseClickedTime);

    timeArray.push(pressTime);
  }
}



  //
  // pressTime = ceiling(mouseReleasedTime - mouseClickedTime);
  // if (mouseClicked()){ mouseCLickedTime = millis()/1000;}
  // if (mouseReleased()){ mouseReleasedTime = millis()/1000;timeArray.push(pressTime);}
  // ramp amplitude to 0 over 0.5 seconds
  // osc.amp(0, 0.5);
  // playing = false;
}
function mouseClicked(){

// mouseClicked() = false;


}

///////////////////////////////////////
//this controls the volume on or off
//////////////////////////////////////
function controlAmp(){
  if (keyCode === 80){
  ampOn = true;


  }
  if (keyCode === 79){
  ampOn = false;


  }

  if (ampOn === true){
    amp = ampArray[step1];
  }
  if (ampOn === false){
    amp = 0;
  }

}//end controlAmp

//////////////////////////
// draw balls
//////////////////////////
function drawBalls(){

  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  period = map(mouseX,0,windowWidth,4000,1);
  amplitude = map(mouseY,0,windowHeight,windowHeight/2,1);
  fill(0,255,0);
  text("balls period: " + period,1,windowHeight*3/4);
  text("balls amplitude: " + amplitude,1,windowHeight*3/4 + 20);




  fill(0,0,255);
  // textSize(5);

  text("freq is: " + freq, width-200, height-30);
  text("amp is: " + amp, width-200, height-15);
}

function ballsColor(){
    ballscolor1 = color(r1,g1,b1,a1);
    r1 = map(mouseX,width,0,0,255);
    g1 = 0;
    a1 = map(mouseY,0,height,255,20);
    b1 = map(mouseX,0,width,0,255);
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.001;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(ballscolor1);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}


//////////////////////////////////////////////
///////second wave of balls
//////////////////////////
function drawBalls2(){

  w2 = width + 16;
  dx2 = (TWO_PI / period2) * xspacing2;
  yvalues2 = new Array(floor(w2 / xspacing2));

  // print(freq);
  period2 = map(freq,0,500,4000,1);
  amplitude2 = map(ballsAmp,1,0,windowHeight/2,1);
  // fill(0,255,0);
  // text("balls period: " + period,1,windowHeight*3/4);
  // text("balls amplitude: " + amplitude,1,windowHeight*3/4 + 20);




  // fill(0,0,255);
  // textSize(5);

  // text("freq is: " + freq, width-200, height-30);
  // text("amp is: " + amp, width-200, height-15);
}

function ballsColor2(){
    ballscolor2 = color(r2,g2,b2,a2);
    r2 = map(freq,500,100,0,255);
    g2 = 0;
    a2 = map(ballsAmp,1,0,255,20);
    b2 = map(freq,100,500,0,255);
}

function calcWave2() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta2 += 0.001;

  // For every x value, calculate a y value with sine function
  let x2 = theta2;
  for (let i = 0; i < yvalues2.length; i++) {
    yvalues2[i] = sin(x2) * amplitude2;
    x2 += dx2;
  }
}

function renderWave2() {
  noStroke();
  fill(ballscolor2);
  // A simple way to draw the wave with an ellipse at each location
  for (let x2 = 0; x2 < yvalues2.length; x2++) {
    ellipse(x2 * xspacing2, height / 2 + yvalues2[x2], 16, 16);
  }
}

//////////////////////////////
// drum kit for key pressed
/////////////////////////////
function keyPressed(){

    if (keyCode === 65){

      drum_k.play();

    } else {

      drum_k.stop();
    }
    if (keyCode === 83){

      drum_s.play();

    } else {

      drum_s.stop();
    }

}
function keyReleased(){

    if (keyCode === UP_ARROW){
      up_pressed = false;
    }
    if (keyCode === RIGHT_ARROW){
      right_pressed = false;
    }
    if (keyCode === DOWN_ARROW){
      down_pressed = false;
    }
    if (keyCode === LEFT_ARROW){
      left_pressed = false;
    }

}


////////////////////////////
//button for user gesture
///////////////////////////
function buttonPlay() {
  ampOn = true;
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }


}

function gestureToStart(){


}


////////////////////////////////
///how i did the time sequencing
///////////////////////////////////
function timeSequencer(){

  text("milliseconds: " + int(millis()), 50,200);
  // text("seconds: " + secStep, 50,150);

//     if (milliseconds1%1000 === 0){secStep++;} //this does not work bc 1000 is too specific

  milliseconds1 = millis();
  seconds1 = int(milliseconds1/1000);
  seconds2 = milliseconds1/1000;

  finalArrayElement = timeArray.length - 1;



 // text(dummyArray[elementStep], 50, 200);
  text("seconds1: " + seconds1, 50, 250);
   text("elementStep: " + elementStep, 50,300);


  // elementEndTime = timeArray[elementStep] + secStep;

  text("elementEndTime: " + elementEndTime, 50,350);
  text("timeArray.length: " + timeArray.length, 50,400);
  text("finalArrayElement: " + finalArrayElement, 50,450);
  text("timeArray: " + timeArray, 50,500);
  text("mouseClickedTime: " + mouseClickedTime, 50,550);
  text("mouseReleasedTime: " + mouseReleasedTime, 50, 600);



  if (seconds2 > elementEndTime){

      elementEndTime = timeArray[elementStep] + seconds1;
    print("the end time is " + timeArray[elementStep]+" + " + seconds1 + " = " + elementEndTime);

      elementStep++;

     if (elementStep > finalArrayElement){
        elementStep = 0;

      }



  }


  textSize(30);
  text("'O' to Stop", windowWidth - 200,350);
  text("'P' to Play", windowWidth - 197,380);

}
