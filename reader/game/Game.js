function Game(scene) {

    CGFobject.call(this, scene);

    this.scene = scene;


    this.sideBoard = new GameBoard(this.scene, 0, 0);
    this.sideBoard.pickLock = false;


    var offsetWhiteX = 4;
    this.sideBoardWhite = new GameBoard(this.scene, offsetWhiteX, 0);
    this.sideBoardWhite.pickLock = false;

    this.playBoard = new GameBoard(this.scene, 2, 0);


    this.scoreBoard = new ScoreBoard(scene);


    this.piecesBlack = this.createPieces(1, 0, 0);
    this.piecesWhite = this.createPieces(0, offsetWhiteX, 0);




    // player1 or player2
    this.currPlayer = "player1";

    // bot difficulty (easy, hard or none)
    this.botDiff = "easy";

    // true if it's bot's turn to play
    this.botTurn = false;

    // true if the game is bot vs bot (if this is true, botTurn should also be true)
    // call new RequestPlayBot(this) to start the game
    this.twoBots = false;

    // storage for plays (class Play), used for ctrlz and game movie
    this.plays = [];

    this.black = new CGFappearance(scene);
    //set emission
    this.black.setEmission(0.3, 0.3, 0.3, 1.0);
    //set ambient
    this.black.setAmbient(0.9, 0.9, 0.9, 1.0);
    //set diffuse
    this.black.setDiffuse(0.9, 0.9, 0.9, 1.0);
    //set specular
    this.black.setSpecular(0.2, 0.2, 0.2, 1.0);
    //set shininess
    this.black.setShininess(1000);

    this.black.loadTexture('../resources/black.jpg');


    this.white = new CGFappearance(scene);
    //set emission
    this.white.setEmission(0, 0, 0, 1);
    //set ambient
    this.white.setAmbient(0.8, 0.8, 0.8, 1);
    //set diffuse
    this.white.setDiffuse(0.8, 0.8, 0.8, 1);
    //set specular
    this.white.setSpecular(0.8, 0.8, 0.8, 1);
    //set shininess
    this.white.setShininess(1000);

    this.white.loadTexture('../resources/glaciar.jpg');


    this.support = new CGFappearance(scene);
    //set emission
    this.support.setEmission(0, 0, 0, 1);
    //set ambient
    this.support.setAmbient(0.8, 0.8, 0.8, 1);
    //set diffuse
    this.support.setDiffuse(0.8, 0.8, 0.8, 1);
    //set specular
    this.support.setSpecular(0.8, 0.8, 0.8, 1);
    //set shininess
    this.support.setShininess(1000);

    this.support.loadTexture('../resources/metal.jpg');
};


Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;


Game.prototype.display = function() {

    this.scene.clearPickRegistration();


 // SCOREBOARDD
    this.scene.pushMatrix();
    this.scene.translate(1.5, 0, -7);
    this.scoreBoard.display();

    this.scene.translate(0, 0, 14);
    this.scene.rotate(3.14, 0, 1, 0);
    this.scoreBoard.display();
    this.scene.popMatrix();

//BOARDS
    this.scene.pushMatrix();

    this.scene.rotate(-1.57, 1, 0, 0);


    this.displayPieces();
    this.sideBoard.display();
    this.sideBoardWhite.display();



    this.playBoard.display();

    this.scene.popMatrix();

};




Game.prototype.updateBoardPick = function(id) {
    this.playBoard.updatePick(id);

    // validate play (it also checks for game over!)
    new RequestValidatePlay(this, id);

};


Game.prototype.createLinePieces = function(x, y, z, num, id, color) {
    var line = [];
    for (var i = 0; i < num; i++) {
        hex = new Piece(i + id, this.scene, color, x, y, z, this.playBoard);
        console.log(i + id);
        x += 0.177;
        line.push(hex);
    }
    return line;
};

Game.prototype.createPieces = function(color, offsetX, offsetY) {
    var dec = 0.156;
    var y = 0 + offsetY;
    var x = -0.29 + offsetX;
    var z = 0.01;

    var pieces = [];
    pieces.push(this.createLinePieces(x, y, z, 5, 1, color));
    y -= dec;
    x = -0.38 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 6, 6, color));
    y -= dec;
    x = -0.48 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 7, 12, color));
    y -= dec;
    x = -0.58 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 8, 19, color));
    y -= dec;
    x = -0.68 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 9, 27, color));
    y -= dec;
    x = -0.58 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 8, 36, color));
    y -= dec;
    x = -0.48 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 7, 44, color));
    y -= dec;
    x = -0.38 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 6, 51, color));
    y -= dec;
    x = -0.29 + offsetX;
    pieces.push(this.createLinePieces(x, y, z, 5, 57, color));

    return pieces;
};




Game.prototype.displayPieces = function() {

    this.scene.pushMatrix();

    var n = this.piecesBlack.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesBlack[i].length;
        for (var t = 0; t < nn; t++) {
            this.piecesBlack[i][t].display(this.white, this.black, this.support);
        }
    }


    n = this.piecesWhite.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesWhite[i].length;
        for (var t = 0; t < nn; t++) {
            this.piecesWhite[i][t].display(this.white, this.black, this.support);
        }
    }


    this.scene.popMatrix();
};

Game.prototype.getPieceBlack = function(id) {
    var n = this.piecesBlack.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesBlack[i].length;
        for (var t = 0; t < nn; t++) {
            var piece = this.piecesBlack[i][t];
            if (piece.id == id) {
                return piece;
            }
        }
    }
};


Game.prototype.getPieceWhite = function(id) {
    var n = this.piecesWhite.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesWhite[i].length;
        for (var t = 0; t < nn; t++) {
            var piece = this.piecesWhite[i][t];
            if (piece.id == id) {
                return piece;
            }
        }
    }
};


/**
 * Switch player turn
 */
Game.prototype.switchTurn = function() {

    if (this.currPlayer === "player1") {
        // switch turn
        this.currPlayer = "player2";
    } else if (this.currPlayer === "player2") {
        // switch turn
        this.currPlayer = "player1";
    }

    console.log("Switch turn!");

    if (this.botDiff !== "none") {
        // if bot just played, it's the player turn
        if (this.botTurn === true && this.twoBots === false) {
            this.botTurn = false;
        }
        // if it's bot's turn to play
        else {
            this.botTurn = true;
            new RequestPlayBot(this);
        }
    }
};

/**
* Stores a given play for later use
*
* @param play Play object
*/
Game.prototype.storePlay = function(play) {

  this.plays.push(play);

};

/**
* Pops the last stored play and updates game info accordingly
*
* @return Array of plays (max length = 2)
*/
Game.prototype.popPlay = function() {

  if (this.twoBots === true) {
    return;
  }

  var lastIndex = this.plays.length - 1;
  // splice returns array with poped element
  var removedPlays;
  if (this.botDiff === "none") {
    removedPlays = this.plays.splice(lastIndex);
  }
  else {
    removedPlays = this.plays.splice(lastIndex - 1);
  }

  // remove play
  var play = removedPlays[0];

  // update player turn
  this.currPlayer = play.player;

  // remove piece from board
  this.removePieceBoard(play.piece);

  // remove other play (but don't update curr player!)
  if (removedPlays.length === 2) {

    play = removedPlays[1];

    // remove piece from board
    this.removePieceBoard(play.piece);
  }

  return removedPlays;
};


/** id range 1 - 61*/
Game.prototype.switchPieceBoard = function(id) {

    var piece;

    if (this.currPlayer === "player1") {
        // get white piece
        piece = this.getPieceWhite(id);
    } else if (this.currPlayer === "player2") {
        // get black piece
        piece = this.getPieceBlack(id);
    }

    // get array coordinates of picked cell
    var position = this.playBoard.getPosition(id);

    // get picked GameCell
    var cell = this.playBoard.cells[position[0]][position[1]];

    // set piece absolute coordinates to match cell coordinates
    piece.x = cell.x;
    piece.y = cell.y;

    // set tag (emptyCell, whitePiece or blackPiece)
    cell.tag = piece.tag;

    // play animation
    piece.startAnimation();
};

/** id range 1 - 61*/
/**
* Removes the given piece from the main board and returns it to it's color board
*
* @param piece Piece to remove
*/
Game.prototype.removePieceBoard = function(piece) {

  // array coordinates of piece/cell (the same for all 3 boards)
  var position = this.playBoard.getPosition(piece.id);
  // cell of side color board
  var sideCell;
  // cell of main board
  var mainCell = this.playBoard.cells[position[0]][position[1]];

  // get cell from respective color board
  if (piece.tag === "whitePiece") {
    // get cell
    sideCell = this.sideBoardWhite.cells[position[0]][position[1]];
  }
  else if (piece.tag === "blackPiece") {
    // get cell
    sideCell = this.sideBoard.cells[position[0]][position[1]];
  }

  // set piece absolute coordinates to match cell coordinates
  piece.x = sideCell.x;
  piece.y = sideCell.y;

  // set tag
  mainCell.tag = "emptyCell";

  // play animation
  //piece.startAnimation();
};


Game.prototype.update = function(currTime) {
    var n = this.piecesBlack.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesBlack[i].length;
        for (var t = 0; t < nn; t++) {
            this.piecesBlack[i][t].update(currTime);
        }
    }


    n = this.piecesWhite.length;
    for (var i = 0; i < n; i++) {
        var nn = this.piecesWhite[i].length;
        for (var t = 0; t < nn; t++) {
            this.piecesWhite[i][t].update(currTime);
        }
    }


   this.scoreBoard.update(currTime);
};
