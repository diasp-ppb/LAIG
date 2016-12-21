function Game(scene){

	CGFobject.call(this, scene);

	this.scene = scene;
	this.playBoard = GameBoard(this.scene);
	
};


Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;


Game.prototype.display = function(){

	this.playBoard.registCells(true);
	this.playBoard.display();	
};




Game.prototype.updateBoardPick = function(id){
	this.playBoard.updatePick(id);
};