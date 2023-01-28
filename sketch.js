const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];

constructor (x, y, width, height){
  var options = {
  isStatic: true
  };
  this.body = Bodies.rectangles(x, y, width, height, options); 
  this.width = width; 
  this.height = height; 
  this. image = loadlmage( " ./assets/board.png") ; 
  World.add(world,  this.body);
}

display() {
  var pos = this . body. position; 
  push(); 
  imageMode(CENTER) ; 
  image(this.image, pos . x, pos. y, this .width, this . height) ; 
  pop();
}

board1 = new Board (width - 300, 330, 50, 200) 
board2 = new Board (width - 550, height - 300, 50, 200)
board1.display()
board2.display()

for (var i = 0; i < playerArrows.length; i++) {
  if (playerArrows[i] !== undefined) { 
  playerArrows [i].display(); 
  
  var board1CoIIision = Matter.SAT.coIIides( 
  Board1.body, 
  playerArrows [i] . body
  );
  var board2Collision = Matter.SAT.collides( 
    board2. body , 
    playerArrows[i] . body
    );

  if (board1Collision.collided || board2Collision. collided) { 
      console. log ( "Collided" ) ; 
      }

      remove (index) { 
        this.isRemoved = true; 
        Matter.World. remove(world, this . body); 
        delete playerArrows[index] ; 
        }
  
    
  }};




function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
