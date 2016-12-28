function ScoreBoard(scene) {

    CGFobject.call(this, scene);

    this.scene = scene;


    //Timer

    this.timer = new DisplayerNumber(30);


}



ScoreBoard.prototype = Object.create(CGFobject.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;



ScoreBoard.prototype.display = function() {
    this.timer.display();
}


ScoreBoard.prototype.update = function(currTime) {

}







function DisplayerNumber(scene, value) {
    CGFobject.call(this, scene);

    this.scene = scene;

    this.lastCurrTime = -1;

    this.value = value;

    this.n1;
    this.n2;

    //TODO
}


DisplayerNumber.prototype = Object.create(CGFobject.prototype);
DisplayerNumber.prototype.constructor = DisplayerNumber;

DisplayerNumber.prototype.convertValueToString = function() {
    var d = Math.floor(this.number / 10);
    var u = Math.floor(this.number % 10);

    this.n1 = d.toString();
    this.n2 = u.toString();
}

DisplayerNumber.prototype.update = function(currtime) {
    var time;


    if (this.lastCurrTime == -1) {
        time = 0;
    } else {
        time = (currTime - this.lastCurrTime) / 1000;
    }

    this.lastCurrTime = currTime;


    this.number -= time;
    if (this.number < 0)
        this.number = 0;

    this.convertValueToString();

}

DisplayerNumber.prototype.increaseValue = function() {
    this.value++;
}

DisplayerNumber.prototype.display = function() {
    //TODO
}

// TODO
function DisplayerString(scene) {
    CGFobject.call(this, scene);
}


DisplayerString.prototype = Object.create(CGFobject.prototype);
DisplayerString.prototype.constructor = DisplayerString;


function Font(scene) {

    CGFobject.call(this, scene).

    //TODO SHADER 

    this.font = new CGFTexture(scene,)

    this.material = new CGFappearance(scene);


    this.material.setTexture(this.texture);
}
