function Menu(scene,id){

  CGFobject.call(this, scene);

  this.scene = scene;

  this.ids = [id,id+1,id+2,id+3,id+4,id+5];

  this.displayer = new DisplayerString(scene,"F");

  this.hh = "H VS H";
  this.bb = "B VS B";
  this.hb = "H VS B";
  this.easy =" EASY ";
  this.hard =" HARD ";
  this.film =" FILM ";

   this.font = new Font(scene);

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


this.scene.setActiveShader(this.scene.defaultShader);
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
};

//HUMAN HUMAN
Menu.prototype.HvH = function(){
  this.scene.game.botDiff = "none";
  this.scene.game.botTurn = false;
  this.scene.game.twoBots = false;
};

//HUMAN BOT
Menu.prototype.HvB = function(){
  this.scene.game.botDiff = "easy";
  this.scene.game.botTurn = true;
  this.scene.game.twoBots = false;
  new RequestPlayBot(this.scene.game);
};

Menu.prototype.easyMode = function(){

};

Menu.prototype.hardMode = function(){

};

Menu.prototype.filmMode = function(){
  this.scene.game.playMovie();
};
