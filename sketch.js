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

//can you call random a global variable from inside a class -> constructor, yes so long as the class is after the create canvas.

let widthran = [0, windowWidth];
let heightran = [0, windowHeight];
let fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
let watermelon;
let bomb; 
let orange;
let apple;
let mango;
let banana; 
let pineapple;

function preload(){
  watermelon = loadImage("watermelon.jpg");
  bomb = loadImage(""); ERROR APEAR HERE PUT IMAGE HERE
  orange = loadImage("orange.jpg");
  apple = loadImage("apple.jpg");
  mango = loadImage("mago.jpg");
  banana = loadImage("banana.jpg");
  pineapple = loadImage("pineapple.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

class Fruit{
  constructor() {
    this.x = random(0, windowWidth);
    this.y = random(windowHeight, windowHeight + random(100, 400));
    this.dx = random[widthran];
    this.dy = random[heightran];
    this.size = random[50, 100];
    this.type = random[fruits];
  }

  display(){
    //check what fruit then display it
    if (this.type === "watermelon"){
      image(watermelon, this.x, this.y, this.size)
    }
    else if (this.type === "orange"){
      image(orange, this.x, this.y, this.size)
    }
    else if (this.type === "bomb"){
      image(bomb, this.x, this.y, this.size)
    }
    else if (this.type === "apple"){
      image(apple, this.x, this.y, this.size)
    }
    else if (this.type === "mango"){
      image(mango, this.x, this.y, this.size)
    }
    else if (this.type === "banana"){
      image(banana, this.x, this.y, this.size)
    }
    else if (this.type === "pineapple"){
      image(pineapple, this.x, this.y, this.size)
    }
  }

  gravity(){
    //make the fruit fall back down after a certain point
  }

  sliced(){
    //check if the mouse has hit it, if so, cut in half?
  }
}

function draw() {
  background(220);
}
