// Fruity ninja
// Macayla Buckmaster
// Date

//change mouse is pressed to a function outside of class mouseDragged
//create a blade effect for the mouse
//create background
//create fruit splatter
//create pause button
//create home screen and death screens
//add sounds

let fruits;
let watermelon;
let bomb; 
let orange;
let apple;
let mango;
let banana; 
let pineapple;
let fruitTimer;

//sliced fruit images
let appleBottomLeft;
let appleBottomRight;
let bananaBottomLeft;
let bananaBottomRight;
let bombExploding;
let mangoBottomRight;
let mangoBottomLeft;
let orangeBottomRight;
let orangeBottomLeft;
let pineappleBottomRight;
let pineappleBottomLeft;
let watermelonBottomRight;
let watermelonBottomLeft;

function preload(){
  watermelon = loadImage("wholefruit/watermelon.png");
  bomb = loadImage("wholefruit/bomb.png");
  orange = loadImage("wholefruit/orange.png");
  apple = loadImage("wholefruit/apple.png");
  mango = loadImage("wholefruit/mago.png");
  banana = loadImage("wholefruit/banana.png");
  pineapple = loadImage("wholefruit/pineapple.png");
  appleBottomLeft = loadImage("slicedfruit/applecutinhalf-bottomleft.png");
  appleBottomRight = loadImage("slicedfruit/applecutinhalf-bottomright.png");
  bananaBottomLeft = loadImage("slicedfruit/bananacutinhalf-bottomleft.png");
  bananaBottomRight = loadImage("slicedfruit/bananacutinhalf-bottomright.png");
  bombExploding = loadImage("slicedfruit/bombexploding.png");
  mangoBottomRight = loadImage("slicedfruit/mangocutinhalf-bottomright.png");
  mangoBottomLeft = loadImage("slicedfruit/mangocutinhalf-bottomleft.png");
  orangeBottomRight = loadImage("slicedfruit/orangecutinhalf-bottomright.png");
  orangeBottomLeft = loadImage("slicedfruit/orangecutinhalf-bottomleft.png");
  pineappleBottomRight = loadImage("slicedfruit/pineapplecutinhalf-bottomright.png");
  pineappleBottomLeft = loadImage("slicedfruit/pineapplecutinhalf-bottomleft.png");
  watermelonBottomRight = loadImage("slicedfruit/watermeloncutinhalf-bottomright.png");
  watermelonBottomLeft = loadImage("slicedfruit/watermeloncutinhalf-bottomleft.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
  imageMode(CENTER); 
  fruitTimer = new Timer(3000);
  fruitTimer.start();
}

class Fruit{
  constructor() {
    this.y = Math.floor(random(windowHeight, windowHeight + random(210, 250)));
    this.fruitWidth = Math.floor(random(150, 200));
    this.type = random(fruits);
    this.x = Math.floor(random(this.fruitWidth, windowWidth));
    this.topHeight = Math.floor(windowHeight/2 - random(25, 300));
    this.dy = -22;
    this.dx = 1;
    this.startX = this.x;
    this.time = 100;
    this.directionSliced;
    this.possibleSlice = false;
  }

  display(){
    //check what fruit, if sliced then display it
    push();
    translate(this.x, this.y);
    rotate(this.time); 
    if (this.type === "watermelon"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(watermelonBottomRight, 0, 0, this.fruitWidth, this.fruitWidth + 100);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(watermelonBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth + 100);
        }
      }
      else{
        image(watermelon, 0, 0, this.fruitWidth, this.fruitWidth + 100);
      }
    }
    else if (this.type === "orange"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(orangeBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(orangeBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        image(orange, 0, 0, this.fruitWidth, this.fruitWidth);
      }
    }
    else if (this.type === "bomb"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft" || this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(bombExploding, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        image(bomb, 0, 0, this.fruitWidth, this.fruitWidth);
      }
    }
    else if (this.type === "apple"){
      console.log(this.fruitWidth);
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(appleBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(appleBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        image(apple, 0, 0, this.fruitWidth, this.fruitWidth);
      }
    }
    else if (this.type === "mango"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(mangoBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(mangoBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        image(mango, 0, 0, this.fruitWidth, this.fruitWidth);
      }
    }
    else if (this.type === "banana"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(bananaBottomRight, 0, 0, this.fruitWidth + 100, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(bananaBottomLeft, 0, 0, this.fruitWidth + 100, this.fruitWidth);
        }
      }
      else{
        image(banana, 0, 0, this.fruitWidth + 100, this.fruitWidth);
      }
    }
    else if (this.type === "pineapple"){
      if (this.possibleSlice){
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(pineappleBottomRight, 0, 0, this.fruitWidth, this.fruitWidth + 200);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(pineappleBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth + 200);
        }
      }
      else{
        image(pineapple, 0, 0, this.fruitWidth, this.fruitWidth + 200);
      }
    }
    pop();
    this.time += 5;
  }

  gravity(){
    if (this.startX < windowWidth/2){
      this.y += this.dy;
      this.x += this.dx;
  
      this.dy += 0.4; 
      this.dx += 0.2;
    }
    else if (this.startX > windowWidth/2){
      this.y += this.dy;
      this.x += this.dx;
  
      this.dy += 0.4; 
      this.dx -= 0.2;
    }
  }

  isDead(){
    return this.y > windowHeight && this.x > this.startX;
  }

  sliced(){
    if (mouseIsPressed === true){
      if (mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2){ //cut from bottom right corner 
        this.directionSliced = "bottomRight";
        this.possibleSlice = true;
      }
      if (mouseX < this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2){ //cut from bottom left corner 
        this.directionSliced = "bottomLeft";
        this.possibleSlice = true;
      }
      if (mouseX > this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2){ //cut from top right corner 
        this.directionSliced = "topRight";
        this.possibleSlice = true;
      }
      if (mouseX < this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2){ //cut from top right corner 
        this.directionSliced = "topLeft";
        this.possibleSlice = true;
      }
    }
  }
}

let fruitArray = [];

function draw() {
  background("grey");
  if (fruitTimer.expired()){
    spawnFruit();
    fruitTimer.start();
  }
  for (let i = fruitArray.length - 1; i >= 0; i--){
    fruitArray[i].sliced();
    fruitArray[i].gravity();
    fruitArray[i].display();

    //remove if needed
    // if (fruitArray[i].isDead()){
    //   fruitArray.splice(i, 1);
    // }
  }
}

function spawnFruit(){
  let theFruit = new Fruit();
  fruitArray.push(theFruit);
}

function mouseDragged(){
  //display blade here
}
