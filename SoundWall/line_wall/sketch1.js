let osc, playing, freq, amp;
let lineColor;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

  lineColor = color(random(255),random(255),random(255));
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
