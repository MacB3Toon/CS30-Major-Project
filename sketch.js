// Fruity ninja
// Macayla Buckmaster
// Date

//create a ball that is affected by gravity
//create a ball that rotates while in the air
//create a ball that explodes when your mouse hits it
//create a blade effect for the mouse
//create a fruit that gets thrown in the air, then exploded by the mouse blade,  then falls back down
//create background
//create fruit splatter
//

//can you call random a global variable from inside a class -> constructor?

class Fruit{
  constructor() {
    //needs x, y, direction, size, image
    this.x = random(0, windowWidth);
    this.y = random(windowHeight, windowHeight + random(100, 400));
    this.dx = sdfsdf;
    this.dy = asdhgdfg;
    this.size = sadgsdg;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 50, 50);
}
