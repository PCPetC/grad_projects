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

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

  lineColor = color(random(255),random(255),random(255));

  //balls setup
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {

  background(0);


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
  //
  // calcWave();
  // renderWave();


  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

  period = map(mouseX,0,windowWidth,500,1);
  fill(0,255,0);
  text("balls period: " + period,1,windowHeight*3/4);
  text("balls amplitude: " + amplitude,1,windowHeight*3/4 + 20);

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
  theta += 0.02;

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

function drawLines() {


}
