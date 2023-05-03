// Fruity ninja
// Macayla Buckmaster
// Date

//make the fruit appear not when mouse clicked but at certain times to develop slicing
//create a ball that explodes when your mouse hits it
//create a blade effect for the mouse
//create a fruit that gets thrown in the air, then exploded by the mouse blade,  then falls back down
//create background
//create fruit splatter

//in game the gravity doesn't change as it gets closer to the bottom, only as your score gets higher

let fruits;
let watermelon;
let bomb; 
let orange;
let apple;
let mango;
let banana; 
let pineapple;

function preload(){
  watermelon = loadImage("watermelon.png");
  bomb = loadImage("bomb.png");
  orange = loadImage("orange.png");
  apple = loadImage("apple.png");
  mango = loadImage("mago.png");
  banana = loadImage("banana.png");
  pineapple = loadImage("pineapple.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fruits = ["watermelon", "bomb", "orange", "apple", "mango", "banana", "pineapple"];
  imageMode(CENTER);
}

class Fruit{
  constructor() {
    this.y = Math.floor(random(windowHeight, windowHeight + random(210, 250)));
    this.fruitWidth = Math.floor(random(150, 200));
    this.fruitHeight = Math.floor(random(160, 210));
    this.type = random(fruits);
    this.x = Math.floor(random(this.fruitWidth, windowWidth));
    this.topHeight = Math.floor(windowHeight/2 - random(25, 300));
    this.dy = -22;
    this.dx = 1;
    this.startX = this.x;
  }

  display(){
    //check what fruit then display it
    if (this.type === "watermelon"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(watermelon, 0, 0, this.fruitWidth, this.fruitHeight + 50);
      pop();
    }
    else if (this.type === "orange"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(orange, 0, 0, this.fruitWidth, this.fruitWidth);
      pop();
    }
    else if (this.type === "bomb"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(bomb, 0, 0, this.fruitWidth + 50, this.fruitWidth);
      pop();
    }
    else if (this.type === "apple"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(apple, 0, 0, this.fruitWidth, this.fruitWidth);
      pop();
    }
    else if (this.type === "mango"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(mango, 0, 0, this.fruitWidth, this.fruitWidth);
      pop();
    }
    else if (this.type === "banana"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(banana, 0, 0, this.fruitWidth + 100, this.fruitHeight); 
      pop();
    }
    else if (this.type === "pineapple"){
      push();
      translate(this.x, this.y);
      rotate(frameCount/25);
      image(pineapple, 0, 0, this.fruitWidth, this.fruitHeight);
      pop();
    }
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
    //check if the mouse has hit it, if so, cut in half?
    if (mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2){ //cut from bottom right corner 

    }
  }
}

let fruitArray = [];

function draw() {
  background("white");
  for (let i = fruitArray.length - 1; i >= 0; i--){
    //fruitArray[i].sliced();
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
  //fruitArray.pop();
}

function mousePressed(){
  spawnFruit();
}