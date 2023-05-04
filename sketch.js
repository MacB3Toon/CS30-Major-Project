// Fruity ninja
// Macayla Buckmaster
// Date

//fix at what speed the fruit rotates 
//create sliced display within clas fruit
//create a blade effect for the mouse
//create a fruit that gets thrown in the air, then exploded by the mouse blade,  then falls back down
//create background
//create fruit splatter

let fruits;
let watermelon;
let bomb; 
let orange;
let apple;
let mango;
let banana; 
let pineapple;
let fruitTimer;

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
  }

  display(){
    //check what fruit then display it
    push();
    translate(this.x, this.y);
    rotate(frameCount * 2);//use some variable within the class that updates regularly instead of frame count because frame count is too slow. 
    if (this.type === "watermelon"){
      image(watermelon, 0, 0, this.fruitWidth, this.fruitWidth + 100);
    }
    else if (this.type === "orange"){
      image(orange, 0, 0, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "bomb"){
      image(bomb, 0, 0, this.fruitWidth + 50, this.fruitWidth);
    }
    else if (this.type === "apple"){
      image(apple, 0, 0, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "mango"){
      image(mango, 0, 0, this.fruitWidth, this.fruitWidth);
    }
    else if (this.type === "banana"){
      image(banana, 0, 0, this.fruitWidth + 100, this.fruitWidth); 
    }
    else if (this.type === "pineapple"){
      image(pineapple, 0, 0, this.fruitWidth, this.fruitWidth + 50);
    }
    pop();
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
    if (mouseX > this.x + this.fruitWidth/2 && mouseY > this.y + this.fruitWidth/2){ //cut from bottom right corner 

    }
  }
}

let fruitArray = [];

function draw() {
  background("white");
  if (fruitTimer.expired()){
    spawnFruit();
    fruitTimer.start();
  }
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
}

function mouseDragged(){
  //display blade here
}

function mousePressed(){
  spawnFruit();
}