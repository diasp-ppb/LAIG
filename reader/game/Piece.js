/**
 color = 0  white
 color = 1 black
*/


function Piece(id,scene, color, x, y, z) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.id = id;
    this.color = color;

    this.body = new Cylinder(this.scene, 12, 1, 0.05, 0.05, 0.05);

    this.x = x;
    this.y = y;
    this.z = z;

    this.moved = false;

}

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(materialWhite, materialBlack) {
    if (color = 0)
        materialWhite.apply();
    else if (color = 1)
        materialBlack.apply();
    else return;

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.body.display();
    this.scene.popMatrix();

}
