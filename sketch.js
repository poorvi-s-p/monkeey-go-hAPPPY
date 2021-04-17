var PLAY = 1;
var END = 0;
var gameState=PLAY;

var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score;
var ground,invisibeGrund;
var survivaltime=0;
var background, backgroundImage;


function preload(){
  
  
  monkey_running =loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",
"Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(450,400);
  background=createSprite(250,175,100,100);
  background.addAnimation("jungle", backgroundImage);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  invisibleGround = createSprite(400,360,900,5);
  invisibleGround.visible = false;

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  obstaclesGroup = new Group();
  foodGroup = new Group();
  
  score=0;
  
   
  

  
}


function draw() {
  
  stroke("black"); 
  textSize(20); 
  fill("black");

  //displaying score
  text("Survival Time:"+survivaltime, 300,70);
  text("Score: "+ score, 300,50);
  if(background.x < 0){
    background.x=background.width/2;
  }
  
    if(gameState === PLAY){
      
  background.velocityX = -(6+score/100);
      
  if(foodGroup.isTouching (monkey)){
    foodGroup.destroyEach();
    score=score+2;
    survivaltime=Math.ceil(frameCount/frameRate());
  }
      
    if(obstaclesGroup.isTouching (monkey)){
   gameState=END;
   obstaclesGroup.setVelocityXEach(0);      
    obstaclesGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
      background.velocityX=0;
      
    }
      
      

      
  
      
  

  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -8;
      
    }
      
      //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
      spawnObstacles();
    
    }
  else if(gameState === END){
        stroke("black");
        text("GAME OVER", 200,200);
  }
  monkey.collide(invisibleGround);
    
  
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0){
  var banana=createSprite(200,50,20,20);
  banana.addAnimation("moving", bananaImage);
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX = -10;
    banana.lifetime=400;
  foodGroup.add(banana);
  
  
    
}
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(200,325,10,10);
   obstacle.velocityX = -(4);
   
   
      
  obstacle.addImage("stone", obstacleImage);
  
              
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale =0.1;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
 }
}


   