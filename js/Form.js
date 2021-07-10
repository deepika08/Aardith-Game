class Form {

  constructor() {
    this.input = createInput("").attribute("placeholder", "Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
    this.choice = createInput("").attribute("placeholder", "Enter No. for Color");
    this.question = createElement("h4");
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.choice.hide();
    this.question.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(windowWidth/2 - 50, 0);
    this.input.size = 200
    this.input.position(windowWidth/2 - 40 , windowHeight/2 - 80);
    this.button.position(windowWidth/2 + 30, windowHeight/2 +30);
    this.reset.position(windowWidth-100,20);
    this.question.html("Color Of Your Choice:- 1.Red, 2.Pink, 3.Green, 4.Yellow");
    this.question.position(windowWidth/2 -150,  windowHeight/2 -50);
    this.choice.position(windowWidth/2 -40, windowHeight/2 );
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.choice.hide();
      this.question.hide();

      player.name = this.input.value();
      player.choice = parseInt(this.choice.value());
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      
      this.greeting.html("Hello " + player.name)
      this.greeting.position(windowWidth/2 - 70, windowHeight/4);
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
    });

  }
}
