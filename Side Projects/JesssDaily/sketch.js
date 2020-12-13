let myTasks = ["sing & make music", "apply to jobs", "play games", "do some cooking", "calligraphy","go back to sleep", "work on my mental health", "talk to pp", "watch amoongus videos"];
let myTaskToday;
let bgColor1;
let myFont, myFont1, myFont2;
let textColor1;
let strokeColor1, strokeColor2, strokeColor3;

let heartColor1;
let heartStrokeColor1;
let s = 200;

let theMinute, theHour, theSecond;

function preload() {
  // myFont = loadFont('assets/inconsolata.otf');
  // myFont1 = loadFont('Corben');

}


function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  myTaskToday = random(myTasks);
  // bgColor1 = color(214, 239, 246, 100);
  bgColor1 = color(237, 247, 249);
  textColor1 = color(248, 215, 232);
  // strokeColor1 = color(243, 177, 205, 220);
  strokeColor1 = color(255,50,50,200);
  strokeColor2 = color(227, 167, 192, 100);
  strokeColor3 = color(227, 167, 192, 10);


   background(bgColor1);
  textAlign(CENTER, CENTER);

  textSize(80);
  fill(strokeColor2);
  text(myTaskToday, width/2, height/2);
  filter(BLUR, 8);




  heartColor1 = color(227, 167, 192, 50);
  heartStrokeColor1 = color(227, 167, 192, 50);

  for (x = 0; x < width*3; x += s) {
    for (y = 0; y < height*3; y += s) {
      // fill(310*x/width, 127, 255);

      heart(random(-200,width+200), random(-200,height+200), s/4);

    }
  }



  strokeWeight(4);
  stroke(strokeColor1);
  filter(BLUR, 2);

  textSize(40);
  fill(textColor1);
  text(myTaskToday, width/2, height/2);
  filter(BLUR, 1);


}//end setup



function draw() {




  theHour = hour();
  theMinute = minute();
  theSecond = second();

  dayReset();
}


function heart(x, y, size) {
  smooth();
  noStroke();
  // noLoop();
  fill(heartColor1);
  stroke(heartStrokeColor1);
  strokeWeight(10);
  beginShape();

  vertex(x, y);
  // rotate(random(0,2*PI));
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function dayReset(){


  if (theMinute%30===0){
    // clear();
      print(myTaskToday + " at "+theHour+":"+theMinute+":"+theSecond);

      //draws the thing
      myTaskToday = random(myTasks);
  // bgColor1 = color(214, 239, 246, 100);
  bgColor1 = color(237, 247, 249);
  textColor1 = color(248, 215, 232);
  // strokeColor1 = color(243, 177, 205, 220);
  strokeColor1 = color(255,50,50,200);
  strokeColor2 = color(227, 167, 192, 100);
    strokeColor3 = color(0,200,0,1);


   background(bgColor1);
  textAlign(CENTER, CENTER);









  textSize(80);
  fill(strokeColor2);
  strokeWeight(1);
  text(myTaskToday, width/2, height/2);
  filter(BLUR, 8);

     heartColor1 = color(227, 167, 192, 50);
  heartStrokeColor1 = color(227, 167, 192, 50);

  for (x = 0; x < width*3; x += s) {
    for (y = 0; y < height*3; y += s) {
      // fill(310*x/width, 127, 255);

      heart(random(-200,width+200), random(-200,height+200), s/4);

    }
  }


  strokeWeight(4);
  stroke(strokeColor1);
  filter(BLUR, 2);

  textSize(40);
  fill(textColor1);
  text(myTaskToday, width/2, height/2);
  filter(BLUR, 1);
    //end draw thing




  }

}
