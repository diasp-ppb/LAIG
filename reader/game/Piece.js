/**
 color = 0  white
 color = 1 black
*/


function Piece(id,scene, color, x, y, z) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.id = id;
    this.color = color;

    if (this.color === 0) {
      this.tag = "whitePiece";
    } else if (this.color === 1) {
      this.tag = "blackPiece";
    }
    this.base = new Cylinder(this.scene, 12, 1, 0.05, 0.05, 0.025);
    this.body = new Cylinder(this.scene, 4, 1, 0.05, 0.05, 0.05);
    this.top = new Cylinder(this.scene,8,1,0.03,0.06,0.025);

    this.x = x;
    this.y = y;
    this.z = z;

    this.moved = false;

}

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(materialWhite, materialBlack, materialBase) {






    materialBase.apply();
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.base.display();



    this.scene.rotate(1.57,1,0,0);
    this.scene.translate(0,0.07,-0.025);

    this.body.display();


     this.scene.rotate(1.57,-1,0,0);
     this.scene.translate(0,-0.025,-0.025);


         if (this.color == 0)
             materialWhite.apply();
         else if (this.color == 1)
             materialBlack.apply();
         else return;

    this.top.display();


    this.scene.popMatrix();

}
