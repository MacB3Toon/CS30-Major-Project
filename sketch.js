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

//in game the gravity doesn't change as it gets closer to the bottom, only as your score gets higher

//stuck on getting the fruit to continuously display on screen 

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
    this.startX = this.x;
    this.topHeight = Math.floor(windowHeight/2 - random(25, 300));
    this.dy = -15;
  }

  display(){
    //check what fruit then display it
    if (this.type === "watermelon"){
      image(watermelon, this.x, this.y, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "orange"){
      image(orange, this.x, this.y, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "bomb"){
      image(bomb, this.x, this.y, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "apple"){
      image(apple, this.x, this.y, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "mango"){
      image(mango, this.x, this.y, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "banana"){
      image(banana, this.x, this.y, this.fruitWidth, this.fruitHeight); //THESE TWO COMMENTED OUT BECAUSE THEY CANT BE SQUARE BUT SQUARE IS EASY TO DETECT COLLISION
    }
    else if (this.type === "pineapple"){
      image(pineapple, this.x, this.y, this.fruitWidth, this.fruitHeight);
    }
  }

  gravity(){
    this.y += this.dy;

    this.dy += 0.2; //GRAVITYYYYYYY
    //make the fruit fall back down after a certain point
    // if (this.y > this.topHeight){ //go up
    //   this.y -= 1; 
    // }
    // if (this.y === this.topHeight - 1){ //go down
    //   while (this.y <= this.topHeight && this.y < windowHeight + 300){
    //     this.y += 1;
    //   }
    // }
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