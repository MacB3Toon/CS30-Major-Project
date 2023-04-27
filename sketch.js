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
    this.x = random(0, windowWidth);
    this.startX = this.x;
    this.y = random(windowHeight, windowHeight + random(100, 400));
    this.fruitWidth = random(30, 70);
    this.fruitHeight = random(50, 100);
    this.type = random(fruits);
    this.topHeight = random(0, windowHeight - windowHeight/3);
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
    // else if (this.type === "banana"){
    //   image(banana, this.x, this.y, this.fruitWidth, this.fruitHeight); THESE TWO COMMENTED OUT BECAUSE THEY CANT BE SQUARE BUT SQUARE IS EASY TO DETECT COLLISION
    // }
    // else if (this.type === "pineapple"){
    //   image(pineapple, this.x, this.y, this.fruitWidth, this.fruitHeight);
    // }
  }

  gravity(){
    //make the fruit fall back down after a certain point
    if (this.y > this.topHeight){
      this.y -= 1;
      this.x += random();
    }
    else {
      this.y += 1;
      this.x += random();
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

}

// function spawnFruit(){
//   let theFruit = new Fruit();
//   fruitArray.push(theFruit);
//   theFruit.sliced();
//   theFruit.gravity();
//   theFruit.display();

//   //remove if needed
//   if (theFruit.isDead()){
//     fruitArray.splice(theFruit, 1);
//   }
// }

function mousePressed(){
  let theFruit = new Fruit();
  fruitArray.push(theFruit);
  for (let i = 0; i < 100; i++){
    theFruit.sliced();
    theFruit.gravity();
    theFruit.display();
  }
}