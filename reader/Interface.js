/**
* Interface
* @constructor
*/

function Interface() {
  //call CGFinterface constructor
  CGFinterface.call(this);
}

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

    case 77: { // M
      this.scene.nextMaterial();
    }
    break;

    case 81: { // Q
      new RequestServerQuit();
    }
    break;

    default:
    break;

  }
};

Interface.prototype.addLights = function (ligthID,i){

  //console.log(ligthID);
  this.lights.add(this.scene.lightsStatus,i).name(ligthID);

};
