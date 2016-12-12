function GameCell(id, scene, x, y) {
	CGFobject.call(this, scene);

	this.id = id;
	this.scene = scene;
	this.cell = new Cylinder(this.scene, 6, 1, 0.1, 0.1, 0.1);
	this.x = x;
	this.y = y;

	console.log(this.id);

};

GameCell.prototype = Object.create(CGFobject.prototype);
GameCell.prototype.constructor = GameCell;


GameCell.prototype.display = function() {
	this.scene.pushMatrix();
	this.scene.translate(this.x, this.y, 0);
	this.scene.rotate(Math.PI * 30 / 180, 0, 0, 1);
	this.scene.registerForPick(this.id, this);
	this.cell.display();
	this.scene.popMatrix();
};
