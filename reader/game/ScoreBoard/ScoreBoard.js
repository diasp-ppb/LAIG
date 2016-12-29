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
    this.winmsg = new DisplayerString(scene, "WINNER ");
    //To activate msg
    this.winBlack = false;
    this.winner = false;


    this.invalidmsg = new DisplayerString(scene, "INVALID")
    this.invalid = true;

    //back
    this.backTimer = new Cylinder(scene, 4, 3, 0.85, 0.85, 0.5);

};



ScoreBoard.prototype = Object.create(CGFobject.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.resetMsg = function() {
    this.winBlack = true;
    this.winner = false;
    this.invalid = false;
};

//false -> win white
//true -> win black
ScoreBoard.winDisplay = function(bool) {
    this.winBlack = bool;
    this.winner = true;
};

ScoreBoard.invalidDisplay = function() {
    this.invalidmsg = true;
};

ScoreBoard.prototype.display = function() {
    this.scene.pushMatrix();

    this.scene.translate(0, 0, 0.5);

    if (this.winner) {
        this.scene.pushMatrix();
        this.scene.translate(-0.6, -0.2, 0);
        this.winmsg.display();

        this.scene.translate(1.6, 0, 0);
        if (this.winBlack)
            this.b.display();
        else
            this.w.display();
        this.scene.popMatrix();
    }

    if(this.invalid)
    {
      this.scene.pushMatrix();
      this.scene.translate(-0.6, -0.2, 0);
      this.invalidmsg.display();
      this.scene.popMatrix();
    }


    this.scene.pushMatrix();
    this.scene.translate(0, 0.2, 0);
    this.t.display();
    this.scene.translate(0.4, 0, 0);
    this.b.display();
    this.scene.translate(0.4, 0, 0);
    this.w.display();
    this.scene.popMatrix();

    this.timer.display();
    this.scene.translate(0.4, 0, 0);
    this.counterWhite.display();
    this.scene.translate(0.4, 0, 0);
    this.counterBlack.display();

    /** cosmetic */
    this.scene.translate(-0.3, 0, -0.52);
    this.scene.scale(2, 0.5, 1);
    this.scene.rotate(0.75, 0, 0, 1);
    this.backTimer.display();

    this.scene.popMatrix();

};


ScoreBoard.prototype.update = function(currTime) {
    this.timer.update(currTime);
};
