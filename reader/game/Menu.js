function Menu(scene,id){

  this.scene = scene;

  this.ids = [id,id+1,id+2,id+3];

  this.display = new DisplayerString(scene,"F");

  this.hh = "H VS H";
  this.bb = "B VS B";
  this.hb = "H VS B";

};


Menu.prototype.display= function(){



};
