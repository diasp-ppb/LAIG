function GameBoard(scene, x, y) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.cells = [];

	this.posX = x;
	this.posY = y;

	this.createCells();

	this.WIDTH = 9;


	/* to lockpicking */
	this.pickLock = true;
	/** Selected cell storage */
	this.pick = -1;

    this.botpick = -1;
	/** cells register switch */
	//this.registerPick;

	this.resetRegisterPick();

	/* materials */
	this.materialBase = new CGFappearance(scene);
	//set emission
	this.materialBase.setEmission(0.5, 0.5, 0.5, 1);
	//set ambient
	this.materialBase.setAmbient(0.8, 0.8, 0.8, 1);
	//set diffuse
	this.materialBase.setDiffuse(0.8, 0.8, 0.8, 1);
	//set specular
	this.materialBase.setSpecular(0.4, 0.4, 0.4, 1);
	//set shininess
	this.materialBase.setShininess(70);

	this.materialBase.loadTexture('../resources/madeira.jpg');



    this.materialBack = new CGFappearance(scene);
    //set emission
    this.materialBack.setEmission(0, 0, 0, 1);
    //set ambient
    this.materialBack.setAmbient(0.6, 0.6, 0.6, 1);
    //set diffuse
    this.materialBack.setDiffuse(0.5, 0.5, 0.5, 1);
    //set specular
    this.materialBack.setSpecular(0.0, 0.0, 0.0, 1);
    //set shininess
    this.materialBack.setShininess(70);

    this.materialBack.loadTexture('../resources/madeira-escura.jpg');


    this.materialBorder = new CGFappearance(scene);
    //set emission
    this.materialBorder.setEmission(0, 0, 0, 1);
    //set ambient
    this.materialBorder.setAmbient(0.5, 0.6, 0.7, 1);
    //set diffuse
    this.materialBorder.setDiffuse(0.5, 0.6, 0.7, 1);
    //set specular
    this.materialBorder.setSpecular(0.2, 0.2, 0.2, 1);
    //set shininess
    this.materialBorder.setShininess(50);

    this.materialBorder.loadTexture('../resources/marmore.jpg');

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

    /** Cosmetics*/
    this.back = new Cylinder(scene, 6, 3, 0.85, 0.85, 0.05);
    this.border = new Torus(scene, 0.8, 0.9, 6, 4);
    this.conector = new Cylinder(scene, 6, 3, 0.06, 0.06, 1.99);



}

GameBoard.prototype = Object.create(CGFobject.prototype);
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.display = function() {


	this.scene.pushMatrix();



	this.cosmeticsObjDisplay();

  this.scene.popMatrix();
  this.scene.pushMatrix();


	this.materialBase.apply();

	var n = this.cells.length;
	for (var i = 0; i < n; i++) {
		var nn = this.cells[i].length;
		for (var t = 0; t < nn; t++) {
			this.cells[i][t].display(this.materialBase, this.materialSelected, this.pick, this.botpick, this.pickLock);
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
};





GameBoard.prototype.createCells = function() {

    var dec = 0.156;
    var y = 0 + this.posY;
    var x = -0.29 + this.posX;
    this.cells.push(this.createLine(x, y, 5, 1));
    y -= dec;
    x = -0.38 + this.posX;
    this.cells.push(this.createLine(x, y, 6, 6));
    y -= dec;
    x = -0.48 + this.posX;
    this.cells.push(this.createLine(x, y, 7, 12));
    y -= dec;
    x = -0.58 + this.posX;
    this.cells.push(this.createLine(x, y, 8, 19));
    y -= dec;
    x = -0.68 + this.posX;
    this.cells.push(this.createLine(x, y, 9, 27));
    y -= dec;
    x = -0.58 + this.posX;
    this.cells.push(this.createLine(x, y, 8, 36));
    y -= dec;
    x = -0.48 + this.posX;
    this.cells.push(this.createLine(x, y, 7, 44));
    y -= dec;
    x = -0.38 + this.posX;
    this.cells.push(this.createLine(x, y, 6, 51));
    y -= dec;
    x = -0.29 + this.posX;
    this.cells.push(this.createLine(x, y, 5, 57));

};


GameBoard.prototype.updatePick = function(id) {
	this.pick = id;
	this.lockCell(id);
};

GameBoard.prototype.resetRegisterPick = function() {
	this.registerPick = [];

	/** +1 to macth cell iD */
	var lastCell = 61 + 1;

	for (var i = 0; i < lastCell; i++) {
		this.registerPick.push(true);
	}
};

/**
Update already picked cell
*/
GameBoard.prototype.lockCell = function(id) {
	this.registerPick[id] = false;
};


GameBoard.prototype.getPosition = function(id) {
    var n = this.cells.length;
    for (var i = 0; i < n; i++) {
        var nn = this.cells[i].length;
        for (var t = 0; t < nn; t++) {
            if (this.cells[i][t].id == id) {
                return [i, t];
            }
        }
    }


    return null;

};


GameBoard.prototype.cosmeticsObjDisplay = function() {

	this.scene.pushMatrix();

    this.scene.translate(this.posX + 0.05, this.posY - 0.6, -0.05);

    this.materialBack.apply();
    this.back.display();

    this.materialBorder.apply();
    this.border.display();


    this.scene.translate(0, 0, -2);

    this.border.display();
    this.conector.display();

      this.scene.translate(0, 0, -0.01);
    this.materialBack.apply();
    this.back.display();


    this.scene.popMatrix();
};


/**
 * Turns this board into a string, so it can be sent to the server
 * This string is a list of lists in prolog
 *
 * @return A string
 */
GameBoard.prototype.toString = function() {

	// output string. Initial brackets
	var ss = "[";

	for (var i = 0; i < this.cells.length; i++) {

		// line i. Initial brackets
		var line = "[";

		for (var j = 0; j < this.cells[i].length; j++) {

			// if last emtpy cell
			if (j === this.cells[i].length - 1) {

				line += this.cells[i][j].tag;

				// remaining cells
				var nNullCells = this.WIDTH - this.cells[i].length;

				for (var k = 0; k < nNullCells; k++) {
					line += ",nullCell";
				}

			} else {
				line += this.cells[i][j].tag + ",";
			}

		}

		// line i. Final brackets
    if (i === this.cells.length - 1) {
		    line += "]";
    } else {
      line += "],";
    }

    ss += line;

	}

	// final brackets
	ss += "]";

	return ss;
};
