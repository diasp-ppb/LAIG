//TODO FALTA TESTAR COM OS CONTROL POINTS do dsx
function Patch(scene, degree1, degree2 , partsU, partsV, controlPoints) {
  CGFobject.call(this,scene);

   this.scene = scene;

  this.degree1 = degree1;
  this.degree2 = degree2;

  this.partsU = partsU;
  this.partsV = partsV;

  this.controlPoints=  controlPoints;

  this.controlVertex = this.getControlVertex();

  this.surface = this.makeSurface();
}



Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;


Patch.prototype.getControlVertex = function(){
  var final = [];
  var conta = 0;
  for(var i = 0; i <= this.degree1; i++){
    var internal = [];
    for(var j = 0; j <= this.degree2; j++){

      internal.push(this.controlPoints[conta]);
      conta++;

    }
    final.push(internal);
  }
  return final;
}

Patch.prototype.getKnotsVector = function(degree) {

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

Patch.prototype.makeSurface = function () {

	var knots1 = this.getKnotsVector(this.degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.degree2); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(this.degree1, this.degree2, knots1, knots2, this.controlVertex);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	return  new CGFnurbsObject(this.scene, getSurfacePoint, this.partsU, this.partsV );

}


Patch.prototype.display = function (){
  this.surface.display();
}
