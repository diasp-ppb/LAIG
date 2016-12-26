function GameBoard(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.cells = [];
    this.createCells();



    /* to lockpicking */
    this.pickLock = true;
    /** Selected cell storage */
    this.pick = -1;
    /** cells register switch */
    this.registerPick;

    this.resetRegisterPick();


    this.materialBase = new CGFappearance(scene);
    //set emission
    this.materialBase.setEmission(0, 0, 0, 1);
    //set ambient
    this.materialBase.setAmbient(0.5, 0.6, 0.5, 1);
    //set diffuse
    this.materialBase.setDiffuse(0.5, 0.6, 0.5, 1);
    //set specular
    this.materialBase.setSpecular(0.2, 0.0, 0.0, 1);
    //set shininess
    this.materialBase.setShininess(70);


    this.materialSelected = new CGFappearance(scene);
    //set emission
    this.materialSelected.setEmission(0, 0, 0, 1);
    //set ambient
    this.materialSelected.setAmbient(0.5, 0.5, 0.5, 1);
    //set diffuse
    this.materialSelected.setDiffuse(0.6, 0.6, 0.6, 1);
    //set specular
    this.materialSelected.setSpecular(0.2, 0.3, 0.4, 1);
    //set shininess
    this.materialSelected.setShininess(150);






};

GameBoard.prototype = Object.create(CGFobject.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.display = function() {


    this.scene.pushMatrix();


    this.materialBase.apply();

    this.scene.translate(-0.25, 0, 0);

    var n = this.cells.length;
    for (var i = 0; i < n; i++) {
        var nn = this.cells[i].length;
        for (var t = 0; t < nn; t++) {
            this.cells[i][t].display(this.materialBase, this.materialSelected, this.pick, this.pickLock);
        }
    }




    this.scene.popMatrix();

};

GameBoard.prototype.createLine = function(x, y, numCells, id) {

    var line = [];
    for (var i = 0; i < numCells; i++) {
        hex = new GameCell(i + id, this.scene, x, y);
        console.log(i + id);
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
    this.cells.push(this.createLine(x, y, 9, 27));
    y -= dec;
    x = -0.58;
    this.cells.push(this.createLine(x, y, 8, 36));
    y -= dec;
    x = -0.48;
    this.cells.push(this.createLine(x, y, 7, 44));
    y -= dec;
    x = -0.38;
    this.cells.push(this.createLine(x, y, 6, 51));
    y -= dec;
    x = -0.29;
    this.cells.push(this.createLine(x, y, 5, 57));

};


GameBoard.prototype.updatePick = function(id) {
    this.pick = id;
    this.lockCell(id);
}

GameBoard.prototype.resetRegisterPick = function() {
    this.registerPick = [];

    /** +1 to macth cell iD */
    var lastCell = 61 + 1;

    for (var i = 0; i < lastCell; i++) {
        this.registerPick.push(true);
    }
}

/**
Update already picked cell
*/
GameBoard.prototype.lockCell = function(id) {
    this.registerPick[id] = false;
}


GameBoard.prototype.getPosition = function(id){
  var n = this.cells.length;
  for (var i = 0; i < n; i++) {
      var nn = this.cells[i].length;
      for (var t = 0; t < nn; t++) {
          if(this.cells[i][t].id == id)
          {
              return  [i,t];
          }
      }
  }


  return null;

}
