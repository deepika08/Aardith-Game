class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    background(bg);
    car1 = createSprite(100,200);
    car1.debug = true;
    car1.setCollider("rectangle", 0, 0, car1.width, car1.height);
   
    car2 = createSprite(300,200);
    car2.debug = true;
    car2.setCollider("rectangle", 0, 0, car2.width, car2.height);
   
    car3 = createSprite(500,200);
    car3.debug = true;
    car3.setCollider("rectangle", 0, 0, car3.width, car3.height);
   
    car4 = createSprite(700,200);
    car4.debug = true;
    car4.setCollider("rectangle", 0, 0, car4.width, car4.height);
    
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + + (index * 200) + allPlayers[plr].xPos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        switch(allPlayers[plr].choice){
          case 1: cars[index-1].addImage(c1);
          cars[index-1].scale = 0.8;
          break;

          case 2: cars[index-1].addImage(c2);
          cars[index-1].scale = 0.35;
          break;

          case 3: cars[index-1].addImage(c3);
          cars[index-1].scale = 0.8;
          break;

          case 4: cars[index-1].addImage(c4);
          cars[index-1].scale = 0.35;
          break;

          default: cars[index-1].addImage(defaultCar);
          break;
          

        }
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          for(i=0; i<obstacles.length; i++){
            if(cars[index-1].isTouching(obstacles.get(i))){
              //crash.play();
              player.carState = "crashed"
              xVel = 0;
              yVel = 0;
              player.update();
      
              obstacles.get(i).destroy();
             }
          
          }
          if(player.carState==="crashed"){
            cars[index-1].addImage(pain);
              cars[index-1].scale = 0.5;
          }
          
        }
       if(keyDown("R")&&allPlayers[plr].carState === "crashed"){
         player.carState = "Fine"
         switch(allPlayers[plr].choice){
          case 1: cars[index-1].addImage(c1);
          cars[index-1].scale = 0.8;
          break;

          case 2: cars[index-1].addImage(c2);
          cars[index-1].scale = 0.35;
          break;

          case 3: cars[index-1].addImage(c3);
          cars[index-1].scale = 0.8;
          break;

          case 4: cars[index-1].addImage(c4);
          cars[index-1].scale = 0.35;
          break;

          default: cars[index-1].addImage(defaultCar);
          break;
          

        }
        
       }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.distance <3760){
      if(keyIsDown(UP_ARROW) && player.index !== null && player.carState ==="Fine"){
          yVel+= 0.9;
        if(keyDown("LEFT")){
          xVel-= 0.2;
        }
        if(keyDown("RIGHT")){
          xVel+= 0.2;
        }
      }
      else if(keyIsDown(UP_ARROW) && player.index !== null && player.carState ==="Fine" && yVel>0){
        yVel -= 0.1;
        xVel*=0.9;
      }else {
        yVel*0.9;
        xVel*0.9;
      }
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
    }
   player.distance += yVel
   yVel*=0.9;
   player.xPos+= xVel
   xVel*0.9
   player.update();
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
