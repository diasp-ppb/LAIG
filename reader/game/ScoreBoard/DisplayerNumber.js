function DisplayerNumber(scene, value) {
    CGFobject.call(this, scene);

    this.scene = scene;

    this.lastCurrTime = -1;

    this.value = value;

    this.n1;
    this.n2;

    this.convertValueToString();

    // scene obj
    this.width = 0.2;
    this.height = 0.2;

    this.show = new Rectangle(scene, [this.width/2, this.height/2], [-this.width/2, -this.height/2]);
    this.show2 = new Rectangle(scene,[this.width/2, this.height/2], [-this.width/2, -this.height/2]);

    this.font = new Font(scene);
}



DisplayerNumber.prototype = Object.create(CGFobject.prototype);
DisplayerNumber.prototype.constructor = DisplayerNumber;

DisplayerNumber.prototype.convertValueToString = function() {
    var d = Math.floor(this.value / 10);
    var u = Math.floor(this.value % 10);

    this.n1 = d.toString();
    this.n2 = u.toString();
}

DisplayerNumber.prototype.update = function(currTime) {
    var time;


    if (this.lastCurrTime == -1) {
        time = 0;
    } else {
        time = (currTime - this.lastCurrTime) / 1000;
    }

    this.lastCurrTime = currTime;


    this.value -= time;
    if (this.value < 0)
        this.value = 0;

    this.convertValueToString();

}

DisplayerNumber.prototype.increaseValue = function() {
    this.value++;
}

DisplayerNumber.prototype.display = function() {

    this.font.material.apply();
    this.scene.setActiveShader(this.font.shader);



    this.scene.pushMatrix();
    this.scene.rotate(3.14,0,0,1);
    //this.scene.rotate(1.57,0,0,1);
    var charPosN1;

    if (this.n1 != "0")
        charPosN1 = this.font.charPosition(this.n1);
    else
        charPosN1 = this.font.charPosition(" ");

    this.scene.activeShader.setUniformsValues({
        charPosition: charPosN1
    });
    this.show.display();


    var charPosN2 = this.font.charPosition(this.n2);
    this.scene.activeShader.setUniformsValues({
        charPosition: charPosN2
    });
    this.scene.translate(-this.width, 0, 0);
    this.show2.display();



    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
}
