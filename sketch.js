// Fruity ninja
// Macayla Buckmaster
// Date

//get fruit to appear in time with game settings
//create fruit splatter

//create a secondary array for the splatter where it can be displayed and updated and deleted from an array once its opacity is less than 0.
//4 blade isn't showing on screen, mouse dragged is executing but not showing up.

//global variables
let fruitDroppedArray = [];
let fruitSliced = false;
let playingGame = false;
let timerforFruit = 1500;
let fruitType;
let slashY;
let slashX;
let opacity = 255;
let bladeWidth = 100;
let bladeHeight = 300;

//images
let fruits;
let watermelon;
let bomb; 
let orange;
let apple;
let mango;
let banana; 
let pineapple;
let fruitTimer;
let newgameScreen;
let gameoverScreen;
let woodbackground;
let blade;
let applesplatter;
let bananasplatter;
let mangosplatter;
let orangesplatter;
let pineapplesplatter;
let watermelonsplatter;

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

//sounds
let bombExplosion;
let openingMusic;
let playingMusic;
let slashSound;

function preload(){ //preloads images and sounds
  //sounds
  soundFormats("wav", "ogg");
  bombExplosion = loadSound("sounds/bombexplosion.wav");
  openingMusic = loadSound("sounds/openmusic.wav");
  playingMusic = loadSound("sounds/playingmusic.ogg");
  slashSound = loadSound("sounds/slashsound.wav");

  //regular things to slice 
  watermelon = loadImage("wholefruit/watermelon.png");
  bomb = loadImage("wholefruit/bomb.png");
  orange = loadImage("wholefruit/orange.png");
  apple = loadImage("wholefruit/apple.png");
  mango = loadImage("wholefruit/mago.png");
  banana = loadImage("wholefruit/banana.png");
  pineapple = loadImage("wholefruit/pineapple.png");

  //sliced fruit
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

  //extra game images
  newgameScreen = loadImage("woodbackhomescreen.jpg");
  gameoverScreen = loadImage("woodbackgameover.jpg");
  woodbackground = loadImage("woodbackgroundsimple.jpg");
  blade = loadImage("slashes/classicSlashes/Classic_20.png");
  applesplatter = loadImage("fruitsplatter/applesplatter.jpg");
  bananasplatter = loadImage("fruitsplatter/bananasplatter.jpg");
  mangosplatter = loadImage("fruitsplatter/mangosplatter.jpg");
  orangesplatter = loadImage("fruitsplatter/orangesplatter.jpg");
  pineapplesplatter = loadImage("fruitsplatter/pineapplesplatter.jpg");
  watermelonsplatter = loadImage("fruitsplatter/watermelonsplatter.jpg");
}

function setup() { //setting up the basics of the game
  createCanvas(windowWidth, windowHeight);
  fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
  imageMode(CENTER); 
  angleMode(DEGREES);
  fruitTimer = new Timer(timerforFruit);
  fruitTimer.start();
}

class Fruit{ 
  //all of the functions and variables for each single fruit
  constructor() { //variables required for each fruit
    this.y = Math.floor(random(windowHeight, windowHeight + random(210, 250)));
    this.fruitWidth = Math.floor(random(150, 200));
    this.type = random(fruits);
    fruitType = this.type;
    this.x = Math.floor(random(this.fruitWidth, windowWidth));
    this.topHeight = Math.floor(windowHeight/2 - random(25, 300));
    this.dy = -22;
    this.dx = 1;
    this.possibleSlice = false;
    this.startX = this.x;
    this.time = 10;
    this.directionSliced;
    this.reachedtopY = false;
  }

  display(){
    //check what fruit, if sliced then display it, change if sliced
    imageMode(CENTER); 
    noTint();
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
          bombExplosion.play();
          if (this.fruitWidth >= 750){
            pop();
            deathScreeen();
          }
        }
      }
      else{
        image(bomb, 0, 0, this.fruitWidth + 50, this.fruitWidth + 50);
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
    if (this.y > windowHeight && this.x !== this.startX && this.reachedtopY === true && (this.x > windowWidth || this.x < 0) && this.type !== "bomb"){ 
      //the fruit is off the screen and was
      return true;
    }
    return false;

  }

  sliced(){
    if (mouseIsPressed === true){
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom right corner 
        this.directionSliced = "bottomRight";
        this.possibleSlice = true;
        fruitSliced = true;
      }
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom left corner 
        this.directionSliced = "bottomLeft";
        this.possibleSlice = true;
        fruitSliced = true;
      }
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topRight";
        this.possibleSlice = true;
        fruitSliced = true;
      }
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topLeft";
        this.possibleSlice = true;
        fruitSliced = true;
      }
    }
  }
}

class Splatter{
  //all the functions for each individual fruit splatter
  constructor(){
    this.splatterY = slashX;
    this.splatterX = slashY;
    this.opacity = 255;
    this.splatterWidth = 250;
    this.splatterHeight = 250;
  }

  display(){
    tint(255, this.opacity);
    if(fruitType === "apple"){
      image(applesplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
    if(fruitType === "banana"){
      image(bananasplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
    if(fruitType === "mango"){
      image(mangosplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
    if(fruitType === "orange"){
      image(orangesplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
    if(fruitType === "pineapple"){
      image(pineapplesplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
    if(fruitType === "watermelon"){
      image(watermelonsplatter, this.splatterX, this.splatterY, this.splatterWidth, this.splatterHeight);
    }
  }

  update(){
    this.opacity -= 1;
    this.splatterY += 0.2;
  }
}

let fruitArray = [];
let splatterArray = [];

function draw() {
  imageMode(CENTER);
  image(woodbackground, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  if (fruitDroppedArray.length === 3){
    deathScreeen();
  }
  if (fruitTimer.expired()){
    spawnFruit();
    fruitTimer.start();
  }
  if(fruitSliced){
    slashSound.play();
    fruitSliced = false;
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
  console.log(fruitArray);
}

function spawnFruit(){
  let theFruit = new Fruit();
  fruitArray.push(theFruit);
}

// function mouseDragged(){
//   //display blade here
//   imageMode(CORNER); 
//   image(blade, mouseX, mouseY, bladeWidth, bladeHeight);
// }

function startScreen(){
  //start screen
}

function deathScreeen(){
  //too many fruit dropped before it was sliced, game over
  //or bomb was hit
  noLoop();
  imageMode(CENTER);
  image(gameoverScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
}

function fruitSplatter(slashX, slashY){
  if (fruitSliced){
    tint(255, opacity);
    if(fruitType === "apple"){
      image(applesplatter, slashX, slashY, 100, 100);
    }
    if(fruitType === "banana"){
      image(bananasplatter, slashX, slashY, 100, 100);
    }
    if(fruitType === "mango"){
      image(mangosplatter, slashX, slashY, 100, 100);
    }
    if(fruitType === "orange"){
      image(orangesplatter, slashX, slashY, 100, 100);
    }
    if(fruitType === "pineapple"){
      image(pineapplesplatter, slashX, slashY, 100, 100);
    }
    if(fruitType === "watermelon"){
      image(watermelonsplatter, slashX, slashY, 100, 100);
    }
    if(opacity > 0){
      opacity -= 1;
    }
  }
  opacity = 255;
}