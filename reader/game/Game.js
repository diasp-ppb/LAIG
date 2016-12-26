function Game(scene){

	CGFobject.call(this, scene);

	this.scene = scene;
	this.playBoard = new GameBoard(this.scene);

	this.pentalath = new Pentalath();

}


Game.prototype = Object.create(CGFobject.prototype);
Game.prototype.constructor = Game;


Game.prototype.display = function(){
	this.playBoard.display();
};




Game.prototype.updateBoardPick = function(id){
	this.playBoard.updatePick(id);
	this.pentalath.makeRequest("id(" + id + ")");
};
