/**
 color = 0  white
 color = 1 black
*/


function Piece(id, scene, color, x, y, z, gameboard) {
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
    this.top = new Cylinder(this.scene, 8, 1, 0.03, 0.06, 0.025);

    this.x = x;
    this.y = y;
    this.z = z;

    /** create animation */
    var p = gameboard.getPosition(id);
    // last position
    var cell = gameboard.cells[p[0]][p[1]];

    var midpointX = Math.abs(cell.x  - x);
    var midpointY = cell.y;



    var positions = [
        [x, y, z],
        [midpointX,midpointY,0.15],
        [cell.x, cell.y, z]
    ];
    var angle = [
        [0, 0, 0],
        [0,0,  0],
        [0, 0, 0]
    ];

    var slopes =  [0, 0, 0];

    var scales = [
      [1,1,1],
      [1,1,1],
      [1,1,1],
    ];

    this.animation = new KeyFrameAnimation(5, positions, angle, slopes, scales);
    this.reverseAnimation = new KeyFrameAnimation(5,[positions[2],positions[1],positions[0]],angle,slopes,scales);

    // a queue for animating this object.
    this.animationQ = [];

}

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display = function(materialWhite, materialBlack, materialBase) {






    materialBase.apply();
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.base.display();



    this.scene.rotate(1.57, 1, 0, 0);
    this.scene.translate(0, 0.07, -0.025);

    this.body.display();


    this.scene.rotate(1.57, -1, 0, 0);
    this.scene.translate(0, -0.025, -0.025);


    if (this.color == 0)
        materialWhite.apply();
    else if (this.color == 1)
        materialBlack.apply();
    else return;

    this.top.display();


    this.scene.popMatrix();

}

Piece.prototype.update = function(currtime) {

  // true if there's a need to reset animation
  var reset = false;

  // "animation" or "reverse-animation"
  var anim = this.animationQ[0];

  if (anim === "animation") {
    // if animation is on-going
    if (!this.animation.end) {
      this.animation.active = true;
      // set cell color
      this.scene.game.playBoard.botpick = this.id;
    }
    // if animation is over
    else {
      // remove cell color
      this.scene.game.playBoard.botpick = -1;
      // remove anim from Q
      this.animationQ.splice(0, 1);
      // update animation holder
      anim = this.animationQ[0];
      // state there's a need to reset
      reset = true;
    }
  }
  else if (anim === "reverse-animation") {
    // if animation is on-going
    if (!this.reverseAnimation.end) {
      this.reverseAnimation.active = true;
    }
    // if animation is over
    else {
      // remove anim from Q
      this.animationQ.splice(0, 1);
      // update animation holder
      anim = this.animationQ[0];
      // state there's a need to reset
      reset = true;
    }
  }

  if (reset === true) {
    if (anim === "animation") {
      this.animation.reset();
      this.animation.active = true;
    }
    else if (anim === "reverse-animation") {
      this.reverseAnimation.reset();
      this.reverseAnimation.active = true;
    }
  }



    if (this.animation.active) {
        this.animation.update(currtime);
        var newpos = this.animation.getPosition();
        this.x = newpos[0];
        this.y = newpos[1];
        this.z = newpos[2];
    }
    else if(this.reverseAnimation.active) {
        this.reverseAnimation.update(currtime);
        var newpos = this.reverseAnimation.getPosition();
        this.x = newpos[0];
        this.y = newpos[1];
        this.z = newpos[2];
    }

}

Piece.prototype.startAnimation = function() {

  // queue animation
  this.animationQ.push("animation");
  // if there were no animations in Q before this one
  if (this.animationQ.length === 1) {
    this.animation.reset();
    this.animation.active = true;
  }

    /*if (!this.animation.end)
        this.animation.active = true;
    else {
      this.animation.reset();
      this.animation.active = true;

    }*/
}


Piece.prototype.startReverseAnimation = function() {

  // queue animation
  this.animationQ.push("reverse-animation");
  // if there were no animations in Q before this one
  if (this.animationQ.length === 1) {
    this.reverseAnimation.reset();
    this.reverseAnimation.active = true;
  }

      /*if (!this.reverseAnimation.end)
        this.reverseAnimation.active = true
      else {
        this.reverseAnimation.reset();
        this.reverseAnimation.active = true;
      }*/


};

Piece.prototype.resetAnimations = function(){
    this.animation.reset();
    this.reverseAnimation.reset();
};

/**
* Check if both animations for this piece are over
*
* @return True if animations are over, false otherwise
*/
Piece.prototype.checkAnimationDone = function(){

  return (this.animation.end && this.reverseAnimation.end);
};
