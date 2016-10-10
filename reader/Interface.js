/**
 * Interface
 * @constructor
 */

function Interface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
    this.lights;
};

Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;


Interface.prototype.init = function(application) {
    // call CGFinterface init
  CGFinterface.prototype.init.call(this, application);
    // init GUI
  this.gui = new dat.GUI();


  this.lights = this.gui.addFolder("Lights");



return true;
};

//Process KeyDown
Interface.prototype.processKeyDown = function(event) {

  if(event.keyCode == 86 || event.keyCode == 118){ // V or v
    this.scene.setNextCamera();
  }
}

Interface.prototype.addLights = function (ligthID,i){

console.log(ligthID);
  this.lights.add(this.scene.lightsStatus,i).name(ligthID);

}
