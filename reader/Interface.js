/**
 * Interface
 * @constructor
 */

function Interface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};

Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;


Interface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);
    // init GUI
    this.gui = new dat.GUI();


    // TEMPORARIO PARA TESTE
     var lightsGroup=this.gui.addFolder("Lights");

  //  lightsGroup.add(this.scene, 'light1');

return true;
};

//Process KeyDown
Interface.prototype.processKeyDown = function(event) {

  if(event.keyCode == 86 || event.keyCode == 118){ // V or v
    this.scene.setNextCamera();
  }
}

Interface.prototype.addLightsGroup = function (ligthID){
  	lightsGroup.open();
    lightsGroup.add(this.scene, lifghtID);
    lightsGroup.close();
}
