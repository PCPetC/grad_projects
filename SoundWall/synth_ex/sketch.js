// dummy variables
let q1, q2, q3;

let osc, playing, freq, amp;
let lineColor;

//balls int
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


//drum kit
let drum_k,drum_s;

//single point writer
// let writer;

//json data
// let json = {}; // new  JSON Object
//
// json.id = 0;
// json.cowz = 'stuff';
// json.name = 'stuff2';



//the temporary storage method
const inputs1 = [];
const inputsy = [];
const inputsx = [];
const inputst = [];
let time1;

//the second Oscillator or sequencer
let osc2, playing2, freq2, amp2;
let sequenceTime1, lengthTime1;
let freqinput, ampinput;
let lastTime;
let delay1;
let counter1, timer1;


//bool states
let up_pressed = false;
let down_pressed = false;
let left_pressed = false;
let right_pressed = false;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  lineColor = color(random(255),random(255),random(255));

  //balls setup
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  // drum kit setup
  drum_k = loadSound('sounds/RCK K.wav');
  drum_s = loadSound('sounds/RCK S.wav');

  //writer setup
   // writer = createWriter('data1.txt');

   time1 = 0;
   counter1 = 0;
   timer1 = 0;
   delay = 0;
}

function draw() {

  background(0);
  time1 = millis();

  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  fill(250);
  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  // lineColor = color(random(255),random(255),random(255));
  stroke(lineColor);
  line(0,windowHeight/2,width,windowHeight/2,1,1);
  fill(lineColor);
  beginShape();
  vertex(0, windowHeight/2 - 4);
  vertex(0, windowHeight/2 + 4);
  vertex(windowWidth, windowHeight/2 + 4);
  vertex(windowWidth, windowHeight/2 - 4);
  endShape(CLOSE);


  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }




  //balls draw

  calcWave();
  renderWave();


  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  period = map(mouseX,0,windowWidth,4000,1);
  amplitude = map(mouseY,0,windowHeight,windowHeight/2,1);
  fill(0,255,0);
  text("balls period: " + period,1,windowHeight*3/4);
  text("balls amplitude: " + amplitude,1,windowHeight*3/4 + 20);

  replayWave();

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}


//balls functions

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
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}

function keyPressed() {

  //keyCode finder
  // text(`${key} ${keyCode}`, 10, 40);
  // print(key, ' ', keyCode);
  //a 65
  //s 83
  //r 82
  //p 80





  // if (drum_k.isPlaying()) {
  //   // .isPlaying() returns a boolean
  //   drum_k.stop();
  //   // background(255, 0, 0);
  // } else {
  //   drum_k.play();
  //   // background(0, 255, 0);
  // }

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


  // if (keyCode === 82){
  //   writer.write([mouseX,mouseY,1]);
  // } else {writer.close();}


    // if (keyCode === 82){
    //    saveJSON(json, 'moo.json');
    // } else {}


    //the ram method
    if (keyCode === 82){

       // append(inputs1,'cok','koc2');
       //
       // inputs1.push('asd','asdfghj');
       // inputs1.push('kalm);
       // inputsx.push('mouseX: ' + mouseX, 'time: ' + time1);
       // inputsy.push('mouseY: ' + mouseY, 'time: ' + time1);
       inputsx.push(mouseX);
       inputsy.push(mouseY);
       inputst.push(time1);
    } else {print(inputsx);print(inputsy);print(inputst);}
//end of
} //mousepressed


function replayWave(){

  if (keyCode === 80){
  osc2.start();
  playing2 = true;


  }
  if (keyCode === 79){


  // osc.amp(0, 0.5);

  osc2.stop();
  playing2 = false;


  }
  else {}

  if (keyCode === UP_ARROW && up_pressed === false){
  // for(let i = 0; i < inputs.length; i++){
  // print('time array lenght is ' + inputst[i]);
  // }


  lastTime = inputst.length - 1;
  sequenceTime1 = millis();
  lengthTime1 = millis() + inputst[lastTime];
  up_pressed = true;




  // while (sequenceTime1 < lengthTime1){
  //   freqinput = inputsx[0];
  //   ampinput = inputsy[0];
  //   freq2 = constrain(map(freqinput, 0, width, 100, 500), 100, 500);
  //   amp2 = constrain(map(ampinput, height, 0, 0, 1), 0, 1);
  // }
  // for(i=0; i < inputsx.length; i++){
  //   freq2 = inputsx[i];
  //   amp2 = inputsy[i];
  //   // delay1 = 0;
  //   tittyfucker = inputst[i]-sequenceTime1 / 1000;
  //   // setInterval(delay);
  //   osc2.delay(tittyfucker);
  //
  // }
  // osc2.delay(3);



  // freq2 = inputsx[0];
  // amp2 = inputsy[0];


  print('the ending time at this very momement for the sequence is ' + lengthTime1);

} else {}

  // lastTime = inputst.length - 1;
  // sequenceTime1 = millis();
  // lengthTime1 = millis() + inputst[lastTime];
  //
  // while (sequenceTime1 < lengthTime1){
  //   freqinput = inputsx[0];
  //   ampinput = inputsy[0];
  //   freq2 = constrain(map(freqinput, 0, width, 100, 500), 100, 500);
  //   amp2 = constrain(map(ampinput, height, 0, 0, 1), 0, 1);
  // }

  //is this playing2?
  if (playing2) {
    // smooth the transitions by 0.1 seconds
    osc2.freq(freq2, 0.2);
    osc2.amp(amp2, 0.2);

    if(millis() < timer1){
    q2=0;
    freq2 = inputsx[q2];
    amp2 = inputsy[q2];
    timer1 = inputst[q2];
    if(q2 < inputst.length && timer1 === millis()){

      q2++;

    }}

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
