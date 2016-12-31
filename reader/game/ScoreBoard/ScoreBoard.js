function ScoreBoard(scene,tt) {

    CGFobject.call(this, scene);

    this.scene = scene;
    //time to a humam player play
    this.turntime = tt;
    //Timer
    this.timer = new DisplayerNumber(scene, this.turntime);
    this.t = new DisplayerChar(scene, "T");
    //Counter for 2 players
    this.counterBlack = new DisplayerNumber(scene, 0);
    this.b = new DisplayerChar(scene, "B");
    this.counterWhite = new DisplayerNumber(scene, 0);
    this.w = new DisplayerChar(scene, "W");

    //messages
    this.msg = new DisplayerString(scene, "      ");
    //back
    //  this.backTimer = new Rectangle(scene,[0,0],[2,4]);

    this.font = new Font(scene);
    
};



ScoreBoard.prototype = Object.create(CGFobject.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;



ScoreBoard.prototype.display = function() {

   
    this.scene.setActiveShader(this.font.shader);
    this.font.material.apply();


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
    this.counterBlack.display(this.font);
    this.scene.translate(0.4, 0, 0);
    this.counterWhite.display(this.font);


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


ScoreBoard.prototype.update = function(currTime,currentPlayer) {
    this.timer.update(currTime);
    //check turn end 
    if(this.timer.value == 0){
        this.fault(currentPlayer);
    }
};


ScoreBoard.prototype.winWhite = function(){
 this.msg.updateString("WINNER W");
 this.counterWhite.increaseValue();
};


ScoreBoard.prototype.winBlack = function(){
 this.msg.updateString("WINNER B");
 this.counterBlack.increaseValue();
};

ScoreBoard.prototype.fault = function(currentPlayer) {
 this.msg.updateString(" FAULT");
 if(currentPlayer == "player2")
 this.counterWhite.increaseValue();
 else
 this.counterBlack.increaseValue();

 this.timer.value = this.turntime;
};  


ScoreBoard.prototype.resetTimer =function (bool){
if(!bool)
 this.msg.updateString("      ");
 this.timer.value = this.turntime;
};

ScoreBoard.prototype.setTurnTime = function(time){
this.timer.value = time;
this.turntime = time;
};


ScoreBoard.prototype.setMsg = function(mensagem){
 this.msg.updateString(mensagem);
};