var trex_running
var trex_sprite
var ground2, ground2_sprite
var iground
var cloud, cloud_spirte
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var obstacle_sprite
var gstate
var ogroup
var cgroup
var gameo
var restart
var gameo_sprite
var restart_sprite
var tcollide
var score 
var checkPoint
var die
var jump

score = 0
gstate = "play"

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground2=
loadImage("ground2.png")
  cloud=
loadImage("cloud.png")
  obstacle1 = 
loadImage("obstacle1.png")
  obstacle2 = 
loadImage("obstacle2.png")
    obstacle3 = 
loadImage("obstacle3.png")
    obstacle4 = 
loadImage("obstacle4.png")
    obstacle5 = 
loadImage("obstacle5.png")
    obstacle6 = 
loadImage("obstacle6.png")
  gameo = 
loadImage("gameOver.png")
  restart = 
loadImage("restart.png")
  tcollide = 
loadAnimation("trex_collided.png")
  
  checkPoint =
loadSound("checkPoint.mp3")
  die =
loadSound("die.mp3")
  jump =
loadSound("jump.mp3")
}


function setup() {
  createCanvas(600,200)
  trex_sprite=createSprite(50,150,10,10)
trex_sprite.addAnimation("trex_walking",trex_running)
  trex_sprite.addAnimation("collided",tcollide)
  trex_sprite.scale = 0.5
  ground2_sprite=createSprite(300,177,600,10)
  ground2_sprite.addImage("ground2.png",ground2)
  iground = createSprite(300,185,600,5)
  iground.visible = false
  
  ogroup = createGroup ();
  cgroup = createGroup ();
  
  gameo_sprite=createSprite(300,100,100,100)
  gameo_sprite.addImage("gmaeOver.png",gameo)
  
  restart_sprite=createSprite(300,150,100,100)
  restart_sprite.addImage("restart.png",restart)
  
  restart_sprite.scale = 0.5
  gameo_sprite.scale = 0.7

}


function draw() {
  
  background("white")
  
  text("Score = "+ score, 500, 50)
  drawSprites()
  
  
  if (gstate == "play"){
        if (keyDown("space")&&(trex_sprite.y > 150 )) {
        trex_sprite.velocityY = -15
        jump.play()
        }
      trex_sprite.velocityY = trex_sprite.velocityY + 1
      ground2_sprite.velocityX = -10
        if (ground2_sprite.x  <0){
        ground2_sprite.x = 300
        }
    
      fcloud()
      fobstacle()
        
        if (trex_sprite.isTouching(ogroup)){
          die.play()
          gstate = "end"    
        }
    
    trex_sprite.changeAnimation("trex_walking",trex_running)
    gameo_sprite.visible = false
    restart_sprite.visible = false
    
    score = score + 1 
    
    if (score%200 == 0){
      checkPoint.play()
    }
  }
 
  if (gstate == "end"){
    ground2_sprite.velocityX = 0
    
    ogroup.setVelocityXEach(0);
    cgroup.setVelocityXEach(0);
  
    ogroup.setLifetimeEach(-1);
    cgroup.setLifetimeEach(-1);
    
    gameo_sprite.visible = true
    restart_sprite.visible = true
      
    if(mousePressedOver(restart_sprite)){
        fgamer()
        }   
      trex_sprite.changeAnimation("collided",tcollide)
  }
  
  trex_sprite.collide(iground)
  
}

  function fcloud(){
    if (frameCount%40 == 0){
      cloud_sprite=createSprite(600,40,20,20)
      cloud_sprite.addImage("cloud",cloud)
      cloud_sprite.velocityX=-10
      cloud_sprite.y = random(1,70)
      cloud_sprite.lifetime = 60
      cgroup.add(cloud_sprite)
    }
  }


  function fobstacle(){
    if(frameCount%40 == 0){
      obstacle_sprite = createSprite(500,170,30,30)
      obstacle_sprite.velocityX= -9
      var a = Math.round(random(1,6))
      switch(a){
        case 1:       
obstacle_sprite.addImage("obstacle",obstacle1)
          break
          
          case 2:
obstacle_sprite.addImage("obstacle",obstacle2)
          break
          
          case 3:
obstacle_sprite.addImage("obstacle",obstacle3)
          break
          
          case 4:
obstacle_sprite.addImage("obstacle",obstacle4)
          break
          
          case 5:
obstacle_sprite. addImage("obstacle",obstacle5)
          break
          
          case 6:
obstacle_sprite.addImage("obstacle",obstacle6)
          break          
      }
          
      obstacle_sprite.lifetime = 60
      obstacle_sprite.scale = 0.5
        
      ogroup.add(obstacle_sprite)
          
      console.log (a)
    }
  }
    
    
  function fgamer (){
    gstate = "play"
    ogroup.destroyEach()
    cgroup.destroyEach()
    score = 0
  }
