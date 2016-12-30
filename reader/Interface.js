/**
* Interface
* @constructor
*/

function Interface() {
  //call CGFinterface constructor
  CGFinterface.call(this);
  this.demo = false;
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
      //this.scene.nextMaterial();
      var filename;
      if (this.demo === true) {
        filename = getUrlVars().file || "teste.xml";
        this.demo = false;
      } else {
        filename = getUrlVars().file || "demo.xml";
        this.demo = true;
      }

      // create and load graph, and associate it to scene.
      // Check console for loading errors
      this.scene.graph = new MySceneGraph(filename, this.scene);

    }
    break;

    case 81: { // Q
      new RequestServerQuit();
    }
    break;

    case 87: { // W
      console.log("Play movie!");
      this.scene.game.playMovie();
    }
    break;

    case 90: { // ctrl+z
      if (event.ctrlKey) {
        console.log("Ctrl+Z pressed!");

        // pop play
        this.scene.game.popPlay();
      }
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
