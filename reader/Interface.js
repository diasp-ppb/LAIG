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
  switch (event.keyCode) {
    case 86: { // V
      //this.scene.setNextCamera();
      this.scene.playPerspectiveAnimation();
    }
    break;

    case 118: { // v
      //this.scene.setNextCamera();
      this.scene.playPerspectiveAnimation();
    }
    break;

    case 77: { // M
      this.scene.nextMaterial();
    }
    break;

    case 109: { // m
      this.scene.nextMaterial();
    }
    break;

    default:
    break;

  }
}

Interface.prototype.addLights = function (ligthID,i){

  //console.log(ligthID);
  this.lights.add(this.scene.lightsStatus,i).name(ligthID);

}
