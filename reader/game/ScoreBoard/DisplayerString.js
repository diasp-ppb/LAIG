function DisplayerString(scene, string) {
    CGFobject.call(this, scene);

    this.scene = scene;



    this.displayer = new DisplayerChar(scene,string[0]);

    this.length = string.length;
    this.string = string;
}



DisplayerString.prototype = Object.create(CGFobject.prototype);
DisplayerString.prototype.constructor = DisplayerString;


DisplayerString.prototype.display = function() {
    this.scene.pushMatrix();
    var width = 0.2;
    for (var i = 0; i < this.length; i++) {

      this.scene.translate(width,0,0);
      this.displayer.value = this.string[i];
      this.displayer.display();
    }
    this.scene.popMatrix();
}

DisplayerString.prototype.updateString = function(string){
  this.string = string;
  this.length = string.length;
}
