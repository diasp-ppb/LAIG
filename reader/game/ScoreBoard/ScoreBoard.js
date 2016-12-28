function ScoreBoard(scene) {

    CGFobject.call(this, scene);

    this.scene = scene;


    //Timer
    this.timer = new DisplayerNumber(scene,30);
    this.t = new DisplayerChar(scene,"T");
    //Counter for 2 players
    this.counterBlack = new DisplayerNumber(scene,0);
    this.b = new DisplayerChar(scene,"B");
    this.counterWhite = new DisplayerNumber(scene,0);
    this.w = new DisplayerChar(scene,"W");
    //back

    this.backTimer = new Cylinder(scene, 4, 3, 0.85, 0.85, 0.5);

}



ScoreBoard.prototype = Object.create(CGFobject.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;



ScoreBoard.prototype.display = function() {
    this.scene.pushMatrix();

    this.scene.translate(0,0,0.5);

    this.scene.pushMatrix();
    this.scene.translate(0,0.2,0);
    this.t.display();
    this.scene.popMatrix();

    this.timer.display();



    this.scene.translate(0.4,0,0);
    this.scene.pushMatrix();
    this.scene.translate(0,0.2,0);
    this.b.display();
    this.scene.popMatrix();
    this.counterWhite.display();


    this.scene.translate(0.4,0,0);
    this.scene.pushMatrix();
    this.scene.translate(0,0.2,0);
    this.w.display();
    this.scene.popMatrix();
    this.counterBlack.display();

    /** cosmetic */




    this.scene.translate(-0.3,0,-0.52);
    this.scene.scale(1,0.5,1);
    this.scene.rotate(0.75,0,0,1);
    this.backTimer.display();

    this.scene.popMatrix();

}


ScoreBoard.prototype.update = function(currTime) {
  this.timer.update(currTime);
}
