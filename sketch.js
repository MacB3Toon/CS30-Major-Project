// Fruity ninja
// Macayla Buckmaster
// Monday July 19th, 2023

//only issue - when game over, new game will not start.

//global variables
let fruitDropped = 0;
let fruitSliced = false;
let playingGame = false;
let timerforFruit = 1500;
let fruitType;
let opacity = 255;
let gameOver = false;
let startingScreen = true;
let circleFruits = ["watermelon", "orange", "apple", "mango"];
let circleFruit;
let edgecircleFruit;
let volumeSlider;
let otherOptionsScreen = false;
let threeSecTimer;
let volumeChange;
let fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];

//images
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
let nofruitDropped;
let onefruitDropped;
let twofruitDropped;
let threefruitDropped;

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
  nofruitDropped = loadImage("fruitDroppedX/noFruitDropped.png");
  onefruitDropped = loadImage("fruitDroppedX/oneFruitDropped.png");
  twofruitDropped = loadImage("fruitDroppedX/twoFruitDropped.png");
  threefruitDropped = loadImage("fruitDroppedX/threeFruitDropped.png");
}

function setup() { //setting up the basics of the game
  createCanvas(windowWidth, windowHeight);

  circleFruit = random(circleFruits);
  edgecircleFruit = random(circleFruits);
  volumeSlider = createSlider(0, 1, 0.5, 0.1);

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
      if (this.possibleSlice){
        //if it has been hit, it should explode
        if (this.directionSliced === "bottomRight" || this.directionSliced === "topLeft" || this.directionSliced === "bottomLeft" || this.directionSliced === "topRight"){
          push();
          translate(this.x, this.y);
          rotate(this.time); 
          this.fruitWidth += 25;
          image(bombExploding, 0, 0, this.fruitWidth, this.fruitWidth);
          bombExplosion.setVolume(1, 3);
          bombExplosion.play();
          pop();
          if (this.fruitWidth >= 750){
            deathScreeen();
          }
        }
      }
      push();
      translate(this.x, this.y);
      rotate(this.time); 
      if(this.type === "bomb" && !this.possibleSlice){
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
    if (this.y <= windowHeight/3 * 2){
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
      }

      //sliced from the bottom left
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from bottom left corner 
        this.directionSliced = "bottomLeft";
        this.possibleSlice = true;
        fruitSliced = true;
      }

      //sliced from the top right
      if ((mouseX > this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2) && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topRight";
        this.possibleSlice = true;
        fruitSliced = true;
      }

      //sliced from the top left
      if ((mouseX < this.x + this.fruitWidth/2 && mouseY < this.y + this.fruitWidth/2)  && ((mouseY <= this.y + this.fruitWidth/2 && mouseY >= this.y - this.fruitWidth/2) && (mouseX <= this.x + this.fruitWidth/2 && mouseX >= this.x - this.fruitWidth/2))){ //cut from top right corner 
        this.directionSliced = "topLeft";
        this.possibleSlice = true;
        fruitSliced = true;
      }
    }
  }
}


let fruitArray = [];

function draw() {
  imageMode(CENTER);

  //sets the volume based on what was chosen in other options screen
  outputVolume(volumeChange);

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

function gamingScreeen(){
  //when you are playing the actual game
  gameOver = false;
  startingScreen = false;
  image(woodbackground, windowWidth/2, windowHeight/2, windowWidth, windowHeight);

  //the X's on the top right corner
  if (fruitDropped === 0){
    image(nofruitDropped, windowWidth/5 * 3.75, windowHeight/6);
  }
  if (fruitDropped === 1){
    image(onefruitDropped, windowWidth/5 * 3.75, windowHeight/6);
  }
  if (fruitDropped === 2){
    image(twofruitDropped, windowWidth/5 * 3.75, windowHeight/6);
  }
  if (fruitDropped === 3){
    image(threefruitDropped, windowWidth/5 * 3.75, windowHeight/6);
  }
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
}

function startScreen(){
  //start screen
  noTint();
  openingMusic.stop();
  clear();
  imageMode(CENTER);
  volumeSlider.position(windowWidth + 500, windowHeight + 500);
  image(newgameScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  fruitInCircles();
}

function deathScreeen(){
  //too many fruit dropped before it was sliced or a bomb was hit, game over
  imageMode(CENTER);
  noTint();
  clear();
  playingGame = false;
  gameOver = true;
  volumeSlider.position(windowWidth + 500, windowHeight + 500);
  playingMusic.stop();
  if(!openingMusic.isPlaying()){
    openingMusic.play();
    openingMusic.setLoop(true);
  }
  image(gameoverScreen, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  fruitInCircles();
  bombExploding.pause();
}

function gameOptionsScreeen(){
  //other options have been selected from the start screen
  noTint();
  clear();
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
      if(threeSecTimer.expired()){
        playingGame = true;
        startingScreen = false;
        otherOptionsScreen = false;
        gameOver = false;
      }
      threeSecTimer.start();
    }
    
    //other options have been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && startingScreen){ 
      if(threeSecTimer.expired()){
        otherOptionsScreen = true;
        startingScreen = false;
        playingGame = false;
        gameOver = false;
      }
      threeSecTimer.start();
    }

    //fruit on game over screen
    //retry game has been selected
    if((dist(windowWidth/20 * 10, windowHeight/16.5 * 10, mouseX, mouseY) <  windowHeight/16) && gameOver){
      if(threeSecTimer.expired()){
        playingGame = true;
        startingScreen = false;
        otherOptionsScreen = false;
        gameOver = false;
      }
      threeSecTimer.start();
    }

    //home screen has been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && gameOver){
      threeSecTimer.start();
      otherOptionsScreen = false;
      playingGame = false;
      startingScreen = true;
      gameOver = false;
    }

    //fruit on other options screen
    //back to home screen has been selected
    if((dist(windowWidth/12.8 * 10, windowHeight/13.8 * 10, mouseX, mouseY) < windowHeight/16) && otherOptionsScreen){
      if(threeSecTimer.expired()){
        otherOptionsScreen = false;
        playingGame = false;
        startingScreen = true;
        gameOver = false;
      }
      threeSecTimer.start();
    }
  }
}