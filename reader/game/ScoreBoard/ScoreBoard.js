function ScoreBoard(scene) {

    CGFobject.call(this, scene);

    this.scene = scene;


    //Timer
    this.timer = new DisplayerNumber(scene, 30);
    this.t = new DisplayerChar(scene, "T");
    //Counter for 2 players
    this.counterBlack = new DisplayerNumber(scene, 0);
    this.b = new DisplayerChar(scene, "B");
    this.counterWhite = new DisplayerNumber(scene, 0);
    this.w = new DisplayerChar(scene, "W");

    //messages
    this.msg = new DisplayerString(scene, "FFFFF");
    //back
    //  this.backTimer = new Rectangle(scene,[0,0],[2,4]);

    this.font = new Font(scene);

};



ScoreBoard.prototype = Object.create(CGFobject.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;



ScoreBoard.prototype.display = function() {

    this.font.material.apply();
    this.scene.setActiveShader(this.font.shader);



    this.scene.pushMatrix();


    this.scene.pushMatrix();

    this.scene.translate(0, 0.2, 0);
    this.t.display(this.font);
    this.scene.translate(0.4, 0, 0);
    this.b.display(this.font);
    this.scene.translate(0.4, 0, 0);
    this.w.display(this.font);
    this.scene.popMatrix();



    this.timer.display(this.font);
    this.scene.translate(0.4, 0, 0);
    this.counterWhite.display(this.font);
    this.scene.translate(0.4, 0, 0);
    this.counterBlack.display(this.font);


    this.scene.translate(-1.2, -0.2, 0);
    this.msg.display(this.font);


    /** cosmetic */
    //  this.scene.translate(-0.3, 0, -0.52);
    //  this.scene.scale(2, 0.5, 1);
    //  this.scene.rotate(0.75, 0, 0, 1);
    //  this.backTimer.display();

    this.scene.popMatrix();



    this.scene.setActiveShader(this.scene.defaultShader);

};


ScoreBoard.prototype.update = function(currTime) {
    this.timer.update(currTime);
};
