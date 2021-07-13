var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var xVel = 0;
var yVel = 0;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/track.jpg");
  c1= loadImage("images/Red Car.png");
  c2 = loadImage("images/Pink Car.png");
  c3 = loadImage("images/Green Car.png");
  c4 = loadImage("images/Yellow Car.png");
  ground = loadImage("images/ground.png");
  o1 = loadImage("images/o1.png");
  o2 = loadImage("images/o2.png");
  o3 = loadImage("images/o3.png");
  pain = loadImage("images/PAINNN.png");
  crash = loadSound("images/Old Car.mp3");
  defaultCar = loadImage("images/car1.png");
  bg = loadImage("images/backgroundtrack.jpg");
}

function setup(){
  canvas = createCanvas(windowWidth - 20, windowHeight-30);
  database = firebase.database();
  game = new Game();
  obstacles = createGroup();
  for(i=0;i<=5;i++){
    w = random(200,950)
    h = random(-height*4, height - 200)
    obs = createSprite(w,h)
    obs.debug = true;
    var r = Math.round(random(1,3));
    switch(r){
      case 1: obs.addImage(o1);
              break;
      case 2: obs.addImage(o2);
              break;
      case 3: obs.addImage(o3);
              break;
      default: break; 
    }
    obs.scale = 0.35
    obstacles.add(obs)
  }
  
  game.getState();
  game.start();
}


function draw(){
  
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    
  }
  if(gameState === 2){
    game.end();
  }
}