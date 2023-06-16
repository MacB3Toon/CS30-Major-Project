// Fruity ninja
// Macayla Buckmaster
// Monday July 19th, 2023

//understand output volume - it works just 
//4 blade doesn't show up, almost like the draw loop is moving too quickly for it to appear because the function works with console log
//5 create fruit splatter
//6 add x's to the screen

//showing blade??????????????????????????????
//cannot use const for splatter x or y its odd. make a state for splatters.
//deathscreeen maybe isn't being called correctly?  
//game over, one fruit appearing, neither work, the image is on an angle

//global variables
let fruitDropped = 0;
let fruitSliced = false;
let playingGame = false;
let timerforFruit = 1500;
let fruitType;
let opacity = 255;
let showingBlade = false;
let bladeWidth = 100;
let bladeHeight = 300;
let gameOver = false;
let startingScreen = true;
let circleFruits = ["watermelon", "orange", "apple", "mango"];
let circleFruit;
let edgecircleFruit;
let volumeSlider;
let otherOptionsScreen = false;
let threeSecTimer;
let volumeChange;

//images
let fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
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
let optionsscreen;
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
  optionsscreen = loadImage("otheroptionsScreen.jpg");
  blade = loadImage("slashes/classicSlashes/Classic_20.png");
  applesplatter = loadImage("fruitsplatter/applesplatter.png");
  bananasplatter = loadImage("fruitsplatter/bananasplatter.png");
  mangosplatter = loadImage("fruitsplatter/mangosplatter.png");
  orangesplatter = loadImage("fruitsplatter/orangesplatter.png");
  pineapplesplatter = loadImage("fruitsplatter/pineapplesplatter.png");
  watermelonsplatter = loadImage("fruitsplatter/watermelonsplatter.png");
}

function setup() { //setting up the basics of the game
  createCanvas(windowWidth, windowHeight);

  circleFruit = random(circleFruits);
  edgecircleFruit = random(circleFruits);
  volumeSlider = createSlider(0, 100, 75, 5);

  imageMode(CENTER); 
  angleMode(DEGREES);
  fruitTimer = new Timer(timerforFruit);
  fruitTimer.start();
  threeSecTimer = new Timer(3000);
}

class Fruit{ 
  //all of the functions and variables for each single fruit
  constructor() { //variables required for each fruit
    this.y = Math.floor(random(windowHeight, windowHeight + random(210, 250)));
    this.fruitWidth = Math.floor(random(150, 200));
    this.type = random(fruits);
    fruitType = this.type;
    this.x = Math.floor(random(this.fruitWidth, windowWidth));
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

    //make the image rotate and move across the screen
    imageMode(CENTER); 
    noTint();

    if (this.type === "watermelon"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(watermelonBottomRight, 0, 0, this.fruitWidth, this.fruitWidth + 100);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(watermelonBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth + 100);
        }
      }
      else{
        //whole fruit image
        image(watermelon, 0, 0, this.fruitWidth, this.fruitWidth + 100);
      }
      pop();
    }

    else if (this.type === "orange"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(orangeBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(orangeBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        //whole fruit image
        image(orange, 0, 0, this.fruitWidth, this.fruitWidth);
      }
      pop()
    }

    else if (this.type === "bomb"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been hit, it should explode
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft" || this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          this.fruitWidth += 25;
          image(bombExploding, 0, 0, this.fruitWidth, this.fruitWidth);
          bombExplosion.setVolume(1, 3);
          bombExplosion.play();
          if (this.fruitWidth >= 750){
            deathScreeen();
          }
          pop();
        }
      }
      else{
        //whole bomb image
        image(bomb, 0, 0, this.fruitWidth + 50, this.fruitWidth + 50);
      }
      pop();
    }

    else if (this.type === "apple"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(appleBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(appleBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        //whole fruit image
        image(apple, 0, 0, this.fruitWidth, this.fruitWidth);
      }
      pop();
    }

    else if (this.type === "mango"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(mangoBottomRight, 0, 0, this.fruitWidth, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(mangoBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth);
        }
      }
      else{
        //whole fruit image
        image(mango, 0, 0, this.fruitWidth, this.fruitWidth);
      }
      pop();
    }

    else if (this.type === "banana"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(bananaBottomRight, 0, 0, this.fruitWidth + 100, this.fruitWidth);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(bananaBottomLeft, 0, 0, this.fruitWidth + 100, this.fruitWidth);
        }
      }
      else{
        //whole fruit image
        image(banana, 0, 0, this.fruitWidth + 100, this.fruitWidth);
      }
      pop();
    }

    else if (this.type === "pineapple"){
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if (this.possibleSlice){
        //if it has been sliced, display the image based on what angle it was sliced at
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft"){
          image(pineappleBottomRight, 0, 0, this.fruitWidth, this.fruitWidth + 200);
        }
        else if (this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          image(pineappleBottomLeft, 0, 0, this.fruitWidth, this.fruitWidth + 200);
        }
      }
      else{
        //whole fruit image
        image(pineapple, 0, 0, this.fruitWidth, this.fruitWidth + 200);
      }
      pop();
    }
    this.time += 5;
  }

  gravity(){
    //fruit moves up then down, and to the opposite side of the screen from where its x first was

    //if fruit starts on the left side
    if (this.startX < windowWidth/2){
      this.y += this.dy;
      this.x += this.dx;
  
      this.dy += 0.4; 
      this.dx += 0.2;
    }

    //if fruit starts on the right side
    else if (this.startX > windowWidth/2){
      this.y += this.dy;
      this.x += this.dx;
  
      this.dy += 0.4; 
      this.dx -= 0.2;
    }

    //changing a variable to be used to see if a fruit is dead or not
    if (this.y <= windowHeight/2){
      this.reachedtopY = true;
    }
  }

  isDead(){
    //if the fruit is off the screen, and whether it is sliced or not

    //the fruit is off the screen and was not hit by the blade
    if (this.possibleSlice === false && this.y > windowHeight && this.x !== this.startX && this.reachedtopY && this.type !== "bomb"){ 
      fruitDropped ++;
      return true;
    }

    //the fruit is off the screen but was hit by the blade
    if (this.y > windowHeight && this.x !== this.startX && this.reachedtopY && this.type !== "bomb"){ 
      return true;
    }
    return false;
  }

  sliced(){
    //checks to see if the fruit has been sliced by the mouse
    if (mouseIsPressed){
      //sliced from the bottom right
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom right corner 
        this.directionSliced = "bottomRight";
        this.possibleSlice = true;
        fruitSliced = true;
        let theSplatter = new Splatter(this.x, this.y);
        splatterArray.push(theSplatter);
      }

      //sliced from the bottom left
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom left corner 
        this.directionSliced = "bottomLeft";
        this.possibleSlice = true;
        fruitSliced = true;
        let theSplatter = new Splatter(this.x, this.y);
        splatterArray.push(theSplatter);
      }

      //sliced from the top right
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topRight";
        this.possibleSlice = true;
        fruitSliced = true;
        let theSplatter = new Splatter(this.x, this.y);
        splatterArray.push(theSplatter);
      }

      //sliced from the top left
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topLeft";
        this.possibleSlice = true;
        fruitSliced = true;
        let theSplatter = new Splatter(this.x, this.y);
        splatterArray.push(theSplatter);
      }
    }
  }
}

class Splatter{
  //all the functions for each individual fruit splatter
  constructor(x, y){
    this.splatterY = x;
    this.splatterX = y;
    this.opacity = 255;
    this.splatterWidth = 250;
    this.splatterHeight = 250;
  }

  splatterFruit(){
    //creates the images of splatter based on what type of fruit was hit
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
    //gradually makes the image fade away and slide down the screen
    this.opacity -= 1;
    this.splatterY += 0.2;
  }

  isOpaque(){
    //checks to see if the image is still visible or not
    if(this.opacity <= 0){
      return true;
    }
    return false;
  }
}

let fruitArray = [];
let splatterArray = [];

function draw() {
  imageMode(CENTER);

  if(showingBlade){
    imageMode(CORNER); 
    noTint();
    image(blade, mouseX, mouseY, bladeWidth, bladeHeight);
    imageMode(CENTER);
    showingBlade = false;
  }

  //the screens
  if(startingScreen){
    startScreen();
  }

  else if(otherOptionsScreen){
    gameOptionsScreeen();
  }

  else if(playingGame){
    gamingScreeen();
  }

  else if(gameOver){
    deathScreeen();
  }
}

function spawnFruit(){
  //creates new fruit on the screen
  let theFruit = new Fruit();
  fruitArray.push(theFruit);
}

function spawnSplatter(x, y){//NEED TO CALL THIS SOMEWHERE BUT STILL GET THE VARIABLES FROM INSIDE FRUIT CLASS
  //creates new splatter on the screen
  let theSplatter = new Splatter(x, y);
  splatterArray.push(theSplatter);
}

function mouseDragged(){
  if(gamingScreeen){
    showingBlade = true;
  }
}

function gamingScreeen(){
  //when you are playing the actual game
  image(woodbackground, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  openingMusic.pause();
  if(playingMusic.isPlaying() === false){
    playingMusic.play();
    playingMusic.setLoop(true);
  }

  //too many fruit dropped
  if (fruitDropped >= 3){
    gameOver = true;
    deathScreeen();
  }

  //new fruit appears
  if (fruitTimer.expired()){
    spawnFruit();
    fruitTimer.start();
  }

  //fruit was sliced
  if(fruitSliced){
    slashSound.play();
    fruitSliced = false;
  }

  //all the mechanics of the fruit
  for (let i = fruitArray.length - 1; i >= 0; i--){
    fruitArray[i].sliced();
    fruitArray[i].gravity();
    fruitArray[i].display();

    //remove if needed
    if (fruitArray[i].isDead()){
      fruitArray.splice(i, 1);
    }
  }

  //all the mechanics of the fruit splatter
  // for (let s = splatterArray.length; s >= 0; s--){
  //   splatterArray[s].splatterFruit();
  //   splatterArray[s].update();

  //   if(splatterArray[s].isOpaque()){
  //     splatterArray.splice(s, 1);
  //   }
  // }
}

function startScreen(){
  //start screen
  noTint();
  imageMode(CENTER);
  image(newgameScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  fruitInCircles();
}

function deathScreeen(){
  //too many fruit dropped before it was sliced or a bomb was hit, game over
  imageMode(CENTER);
  noTint();
  clear();
  noLoop();
  playingMusic.pause();
  if(!openingMusic.isPlaying()){
    openingMusic.play();
    openingMusic.setLoop(true);
  }
  image(gameoverScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  fruitInCircles();
  bombExploding.pause();
  loop();
}

function gameOptionsScreeen(){
  //other options have been selected from the start screen
  noTint();
  playingMusic.stop();
  imageMode(CENTER);
  volumeChange = volumeSlider.value();
  textSize(30);
  image(optionsscreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  text("Change the volume:", windowWidth/4 - 50, windowHeight/2 - 25);
  volumeSlider.position(windowWidth/4, windowHeight/2);
  fruitInCircles();
}

function fruitInCircles(){
  //places images in the circles on the screen based on window size
  noTint();
  imageMode(CENTER);

  //fruit in circle closer to middle
  if(startingScreen || gameOver){
    if(circleFruit === "watermelon"){
      image(watermelon, (windowWidth/20)* 10, (windowHeight/16.5) * 10, windowHeight/8, windowHeight/8);
    }
    if(circleFruit === "orange"){
      image(orange, (windowWidth/20)* 10, (windowHeight/16.5) * 10, windowHeight/8, windowHeight/8);
    }
    if(circleFruit === "apple"){
      image(apple, (windowWidth/20)* 10, (windowHeight/16.5) * 10, windowHeight/8, windowHeight/8);
    }
    if(circleFruit === "mango"){
      image(mango, (windowWidth/20)* 10, (windowHeight/16.5) * 10, windowHeight/8, windowHeight/8);
    }
  }

  //fruit closer to edge
  if(edgecircleFruit === "watermelon"){
    image(watermelon, (windowWidth/12.8)* 10, (windowHeight/13.8) * 10, windowHeight/8, windowHeight/8);
  }
  if(edgecircleFruit === "orange"){
    image(orange, (windowWidth/12.8)* 10, (windowHeight/13.8) * 10, windowHeight/8, windowHeight/8);
  }
  if(edgecircleFruit === "apple"){
    image(apple, (windowWidth/12.8)* 10, (windowHeight/13.8) * 10, windowHeight/8, windowHeight/8);
  }
  if(edgecircleFruit === "mango"){
    image(mango, (windowWidth/12.8)* 10, (windowHeight/13.8) * 10, windowHeight/8, windowHeight/8);
  }

  if(mouseIsPressed){
    //fruit on starting screen
    //new game has been selected
    if((dist(windowWidth/20 * 10, windowHeight/16.5 * 10, mouseX, mouseY) <  windowHeight/16) && startingScreen){
      playingGame = true;
      startingScreen = false;
      otherOptionsScreen = false;
    }
    
    //other options have been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && startingScreen){ 
      if(threeSecTimer.expired()){
        otherOptionsScreen = true;
        startingScreen = false;
        playingGame = false;
      }
      threeSecTimer.start();
    }

    //fruit on game over screen
    //retry game has been selected
    if((dist(windowWidth/20 * 10, windowHeight/16.5 * 10, mouseX, mouseY) <  windowHeight/16) && gameOver){
      playingGame = true;
      startingScreen = false;
      otherOptionsScreen = false;
    }

    //home screen has been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && gameOver){
      otherOptionsScreen = false;
      playingGame = false;
      startingScreen = true;
    }

    //fruit on other options screen
    //back to home screen has been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && otherOptionsScreen){
      if(threeSecTimer.expired()){
        otherOptionsScreen = false;
        playingGame = false;
        startingScreen = true;
      }
      threeSecTimer.start();
    }
  }
}
