function GameBoard(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.cells = [];
    this.createCells();
    this.pick = -1;
    

    this.materialBase = new CGFappearance(scene);
    //set emission
    this.materialBase.setEmission(0,0,0,1);
    //set ambient
    this.materialBase.setAmbient(0.5,0.6,0.5,1);
    //set diffuse
    this.materialBase.setDiffuse(0.5,0.6,0.5,1);
    //set specular
    this.materialBase.setSpecular(0.2,0.0,0.0,1);
    //set shininess
    this.materialBase.setShininess(70); 


    this.materialSelected = new CGFappearance(scene);
    //set emission
    this.materialBase.setEmission(0,0,0,1);
    //set ambient
    this.materialBase.setAmbient(0.5,0.6,0.5,1);
    //set diffuse
    this.materialBase.setDiffuse(0.9,0.6,0.5,1);
    //set specular
    this.materialBase.setSpecular(0.2,0.0,0.0,1);
    //set shininess
    this.materialBase.setShininess(70); 

};

GameBoard.prototype = Object.create(CGFobject.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.display = function() {


    this.scene.pushMatrix();


    this.materialBase.apply();

    this.scene.translate(-0.25, 0, 0);

    var n = this.cells.length;

    for (i = 0; i < n; i++) {
        var nn = this.cells[i].length;
        for (var t = 0; t < nn; t++) {
            this.cells[i][t].display(this.materialBase,this.materialSelected,this.pick);
        }
    }




    this.scene.popMatrix();

};

GameBoard.prototype.createLine = function(x, y, numCells,id) {
    var hex;

    var line = [];
    for (var i = 0; i < numCells; i++) {
        hex = new GameCell(i + id, this.scene, x, y);
        x += 0.177;
        line.push(hex);
    }

    return line;
}

GameBoard.prototype.createCells = function() {

    var dec = 0.156;
    var y = 0;
    var x = -0.29;
    this.cells.push(this.createLine(x, y, 5, 1));
    y -= dec;
    x = -0.38;
    this.cells.push(this.createLine(x, y, 6, 6));
    y -= dec;
    x = -0.48;
    this.cells.push(this.createLine(x, y, 7, 12));
    y -= dec;
    x = -0.58;
    this.cells.push(this.createLine(x, y, 8, 19));
    y -= dec;
    x = -0.68;
    this.cells.push(this.createLine(x, y, 9, 28));
    y -= dec;
    x = -0.58;
    this.cells.push(this.createLine(x, y, 8, 37));
    y -= dec;
    x = -0.48;
    this.cells.push(this.createLine(x, y, 7, 45));
    y -= dec;
    x = -0.38;
    this.cells.push(this.createLine(x, y, 6, 52));
    y -= dec;
    x = -0.29;
    this.cells.push(this.createLine(x, y, 5, 58));

};


GameBoard.prototype.updatePick = function(id){
    this.pick = id;
}


