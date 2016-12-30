function Menu(scene,id){

  CGFobject.call(this, scene);

  this.scene = scene;

  this.ids = [id,id+1,id+2,id+3,id+4,id+5,id+6];

  this.displayer = new DisplayerString(scene,"F");

  this.hh = "H VS H";
  this.bb = "B VS B";
  this.hb = "H VS B";
  this.easy =" EASY ";
  this.hard =" HARD ";
  this.film =" FILM ";
  this.newGameString = "NEW GAME";

  this.font = new Font(scene);


  this.active = [false,false,true,true,false,false,false];
  this.totalbuttons = 7;

  this.rectangle = new  Rectangle(scene, [0, 0], [0.1, 0.2]);



    this.green = new CGFappearance(scene);
    //set emission
    this.green.setEmission(0, 0.2, 0, 1);
    //set ambient
    this.green.setAmbient(0.5, 0.9, 0.7, 1);
    //set diffuse
    this.green.setDiffuse(0.5, 0.9, 0.7, 1);
    //set specular
    this.green.setSpecular(0.2, 0.9, 0.2, 1);
    //set shininess
    this.green.setShininess(200);
}


Menu.prototype = Object.create(CGFobject.prototype);
Menu.prototype.constructor = Menu;


//regist for pick
//
Menu.prototype.display= function(){

this.scene.pushMatrix();

this.scene.translate(0,-1,-4);
this.scene.rotate(-0.5,1,0,0);

this.font.material.apply();
this.scene.setActiveShader(this.font.shader);

this.scene.registerForPick(this.ids[0], this);
this.displayer.updateString(this.hh);
this.displayer.display(this.font);


this.scene.registerForPick(this.ids[1], this);
this.scene.translate(0,0.3,0);
this.displayer.updateString(this.bb);
this.displayer.display(this.font);




this.scene.registerForPick(this.ids[2], this);
this.scene.translate(0,0.3,0);
this.displayer.updateString(this.hb);
this.displayer.display(this.font);




this.scene.registerForPick(this.ids[3], this);
this.scene.translate(1.5,-0.3,0);
this.displayer.updateString(this.easy);
this.displayer.display(this.font);




this.scene.registerForPick(this.ids[4], this);
this.scene.translate(0,0.3,0);
this.displayer.updateString(this.hard);
this.displayer.display(this.font);



this.scene.registerForPick(this.ids[5], this);
this.scene.translate(1.5,0,0);
this.displayer.updateString(this.film);
this.displayer.display(this.font);



this.scene.registerForPick(this.ids[6], this);
this.scene.translate(0,-0.6,0);
this.displayer.updateString(this.newGameString);
this.displayer.display(this.font);

this.scene.setActiveShader(this.scene.defaultShader);



//GREENS
this.green.apply();


this.scene.translate(0.2,-0.1,0);
if(this.active[6])
this.rectangle.display();


this.scene.translate(0,0.6,0);

if(this.active[5]){
this.scene.registerForPick(this.ids[5], this);
this.rectangle.display();
}

this.scene.translate(-1.5,0,0);

if(this.active[4]){
this.scene.registerForPick(this.ids[4], this);
this.rectangle.display();
}

this.scene.translate(0,-0.3,0);

if(this.active[3]){
this.scene.registerForPick(this.ids[3], this);
this.rectangle.display();
}

this.scene.translate(-1.5,-0.3,0);

if(this.active[0]){
  this.scene.registerForPick(this.ids[0], this);
  this.rectangle.display();
}

this.scene.translate(0,0.3,0);
if(this.active[1]){
  this.scene.registerForPick(this.ids[1], this);
  this.rectangle.display();
}

this.scene.translate(0,0.3,0);
if(this.active[2]){
this.scene.registerForPick(this.ids[2], this);
this.rectangle.display();
}


this.scene.popMatrix();


};

Menu.prototype.updateOptions = function (customId){

  switch (customId) {
       case 62:
       this.HvH();
      break;
       case 63:
       this.BvB();
      break;
       case 64:
       this.HvB();
      break;
       case 65:
      this.easyMode();
      break;
       case 66:
      this.hardMode();
      break;

       case 67:
      this.filmMode();
      break;
      case 68:
      this.newGame();
      break;

    default:
      break;
  }

};

//BOT BOT
Menu.prototype.BvB = function(){
  this.scene.game.botDiff = "easy";
  this.scene.game.botTurn = true;
  this.scene.game.twoBots = true;
  new RequestPlayBot(this.scene.game);
  this.active[0] = false;
  this.active[1] = true;
  this.active[2] = false;
};

//HUMAN HUMAN
Menu.prototype.HvH = function(){
  this.scene.game.botDiff = "none";
  this.scene.game.botTurn = false;
  this.scene.game.twoBots = false;
  this.active[0] = true;
  this.active[1] = false;
  this.active[2] = false;
};

//HUMAN BOT
Menu.prototype.HvB = function(){
  this.scene.game.botDiff = "easy";
  this.scene.game.botTurn = true;
  this.scene.game.twoBots = false;
  this.active[0] = false;
  this.active[1] = false;
  this.active[2] = true;
  new RequestPlayBot(this.scene.game);
};

Menu.prototype.easyMode = function(){
  this.active[3] = true;
  this.active[4] = false;
};

Menu.prototype.hardMode = function(){
   this.active[3] = false;
   this.active[4] = true;
};

Menu.prototype.filmMode = function(){
  this.scene.game.playMovie();
  this.active[5] = true;
};

Menu.prototype.newGame = function() {
  this.scene.game = new Game(this.scene);
  this.active[5] = false;
};
