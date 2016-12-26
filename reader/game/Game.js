function Game(scene) {

    CGFobject.call(this, scene);

    this.scene = scene;


    this.sideBoard = new GameBoard(this.scene, 0, 0);
    this.sideBoard.pickLock = false;

    this.playBoard = new GameBoard(this.scene, 4, 0);


    this.pieces = [];
    this.createPieces();


    // TODO CHANGE COLOR
    this.black = new CGFappearance(scene);
    //set emission
    this.black.setEmission(0, 0, 0, 1);
    //set ambient
    this.black.setAmbient(0.9, 0.1, 0.1, 1);
    //set diffuse
    this.black.setDiffuse(0.9, 0.1, 0.1, 1);
    //set specular
    this.black.setSpecular(0.2, 0.3, 0.4, 1);
    //set shininess
    this.black.setShininess(220);



};


Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;


Game.prototype.display = function() {

    this.scene.clearPickRegistration();
    this.displayPieces();
    this.sideBoard.display();
    this.playBoard.display();
};




Game.prototype.updateBoardPick = function(id) {
    this.playBoard.updatePick(id);

		/** TODO TEMP*/
		this.switchPieceBoard(id);
};


Game.prototype.createLinePieces = function(x, y, z, num, id) {
    var line = [];
    for (var i = 0; i < num; i++) {
        hex = new Piece(i + id, this.scene, 1, x, y, z);
        console.log(i + id);
        x += 0.177;
        line.push(hex);
    }
    return line;
}

Game.prototype.createPieces = function() {
    var dec = 0.156;
    var y = 0;
    var x = -0.29;
    var z = 0.1;
    this.pieces.push(this.createLinePieces(x, y, z, 5, 1));
    y -= dec;
    x = -0.38;
    this.pieces.push(this.createLinePieces(x, y, z, 6, 6));
    y -= dec;
    x = -0.48;
    this.pieces.push(this.createLinePieces(x, y, z, 7, 12));
    y -= dec;
    x = -0.58;
    this.pieces.push(this.createLinePieces(x, y, z, 8, 19));
    y -= dec;
    x = -0.68;
    this.pieces.push(this.createLinePieces(x, y, z, 9, 27));
    y -= dec;
    x = -0.58;
    this.pieces.push(this.createLinePieces(x, y, z, 8, 36));
    y -= dec;
    x = -0.48;
    this.pieces.push(this.createLinePieces(x, y, z, 7, 44));
    y -= dec;
    x = -0.38;
    this.pieces.push(this.createLinePieces(x, y, z, 6, 51));
    y -= dec;
    x = -0.29;
    this.pieces.push(this.createLinePieces(x, y, z, 5, 57));

}


Game.prototype.displayPieces = function() {

    this.scene.pushMatrix();


    this.black.apply();

    this.scene.translate(-0.25, 0, 0);

    var n = this.pieces.length;
    for (var i = 0; i < n; i++) {
        var nn = this.pieces[i].length;
        for (var t = 0; t < nn; t++) {
            this.pieces[i][t].display(null, this.black);
        }
    }
    this.scene.popMatrix();
}

Game.prototype.getPiece = function(id) {
    var n = this.pieces.length;
    for (var i = 0; i < n; i++) {
        var nn = this.pieces[i].length;
        for (var t = 0; t < nn; t++) {
            var piece = this.pieces[i][t];
            if (piece.id == id) {
                return piece;
            }
        }
    }
}

/** id range 1 - 61*/
Game.prototype.switchPieceBoard = function(id) {
    var piece = this.getPiece(id);

    var postion = this.playBoard.getPosition(id);

		var cell = this.playBoard.cells[postion[0]][postion[1]];

		piece.x = cell.x;
		piece.y = cell.y;

}
