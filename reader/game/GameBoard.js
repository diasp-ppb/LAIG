function GameBoard(scene) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.cells = [];
    this.createCells();
};

GameBoard.prototype = Object.create(CGFobject.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.display = function() {


    this.scene.pushMatrix();

    this.scene.translate(-0.25, 0, 0);

    var n = this.cells.length;

    for (i = 0; i < n; i++) {
        var nn = this.cells[i].length;
        for (var t = 0; t < nn; t++) {
            this.cells[i][t].display();
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
    this.cells.push(this.createLine(x, y, 6,6));
    y -= dec;
    x = -0.48;
    this.cells.push(this.createLine(x, y, 7,12));
    y -= dec;
    x = -0.58;
    this.cells.push(this.createLine(x, y, 8,20));
    y -= dec;
    x = -0.68;
    this.cells.push(this.createLine(x, y, 9,29));
    y -= dec;
    x = -0.58;
    this.cells.push(this.createLine(x, y, 8,38));
    y -= dec;
    x = -0.48;
    this.cells.push(this.createLine(x, y, 7,45));
    y -= dec;
    x = -0.38;
    this.cells.push(this.createLine(x, y, 6,51));
    y -= dec;
    x = -0.29;
    this.cells.push(this.createLine(x, y, 5,57));

};
