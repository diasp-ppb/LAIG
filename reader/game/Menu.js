function Menu(scene,id){

  this.scene = scene;

  this.ids = [id,id+1,id+2,id+3];

  this.display = new DisplayerString(scene,"F");

  this.hh = "H VS H";
  this.bb = "B VS B";
  this.hb = "H VS B";

};

//regist for pick
//
Menu.prototype.display= function(){


DisplayerString.updateString(this.hh);
DisplayerString.display();

DisplayerString.updateString(this.bb);
DisplayerString.display();

DisplayerString.updateString(this.hb);
DisplayerString.display();


};
