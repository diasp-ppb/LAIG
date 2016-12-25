function Piece(scene,color){

this.color = color;

this.scene = scene;

}

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;
