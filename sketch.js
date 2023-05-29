// Fruity ninja
// Macayla Buckmaster
// Date

//create a blade effect for the mouse
//get fruit to appear in time with game settings
//make bomb function
//create deathscreen 
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
let fruitDroppedArray = [];
let newgameScreen;
let gameoverScreen;
let woodbackground;

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

function preload(){ //preloads images for fruit
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
  newgameScreen = loadImage("woodbackhomescreen.jpg");
  gameoverScreen = loadImage("woodbackgameover.jpg");
  woodbackground = loadImage("woodbackgroundsimple.jpg");
}

function setup() { //setting up the basics of the game
  createCanvas(windowWidth, windowHeight);
  fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
  imageMode(CENTER); 
  fruitTimer = new Timer(1500);
  fruitTimer.start();
}

class Fruit{ //all of the functions and variables for each single fruit
  constructor() { //variables required for each fruit
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
    this.reachedtopY = false;
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
          this.fruitWidth += 25;
          image(bombExploding, 0, 0, this.fruitWidth, this.fruitWidth);
          console.log(this.fruitWidth);
          if (this.fruitWidth >= 500){
            deathScreeen();
          }
        }
      }
      else{
        image(bomb, 0, 0, this.fruitWidth, this.fruitWidth);
      }
    }
    else if (this.type === "apple"){
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
    //fruit moves up then down, and to the opposite side of the screen from where its x first was
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
    if (this.y <= height/2){
      this.reachedtopY = true;
    }
  }

  isDead(){
    //the fruit is off the screen and not sliced
    if (this.possibleSlice === false && this.y > windowHeight && this.x !== this.startX && this.reachedtopY === true && (this.x > windowWidth || this.x < 0) && this.type !== "bomb"){ 
      //the fruit is off the screen and was not hit by the blade
      fruitDroppedArray.push(1);
      return true;
    }
    return false;

  }

  sliced(){
    if (mouseIsPressed === true){
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom right corner 
        this.directionSliced = "bottomRight";
        this.possibleSlice = true;
      }
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom left corner 
        this.directionSliced = "bottomLeft";
        this.possibleSlice = true;
      }
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topRight";
        this.possibleSlice = true;
      }
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topLeft";
        this.possibleSlice = true;
      }
    }
  }
}

let fruitArray = [];

function draw() {
  image(woodbackground, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  if (fruitDroppedArray.length === 3){
    deathScreeen();
  }
  if (fruitTimer.expired()){
    spawnFruit();
    fruitTimer.start();
  }
  for (let i = fruitArray.length - 1; i >= 0; i--){
    fruitArray[i].sliced();
    fruitArray[i].gravity();
    fruitArray[i].display();

    //remove if needed
    if (fruitArray[i].isDead()){
      fruitArray.splice(i, 1);
    }
  }
}

function spawnFruit(){
  let theFruit = new Fruit();
  fruitArray.push(theFruit);
}

function mouseDragged(){
  //display blade here

}

function startScreen(){
  //start screen
}

function deathScreeen(){
  //too many fruit dropped before it was sliced, game over
  //or bomb was hit
  noLoop();
  image(gameoverScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
}