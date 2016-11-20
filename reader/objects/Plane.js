
function Plane(scene, dimX, dimY, divX, divY){

CGFobject.call(this,scene);

this.scene = scene;
this.dimX = dimX;
this.dimY = dimY;
this.divX = divX;
this.divY = divY;


this.controlPoints = [							[ this.dimX/2,-this.dimY/2,0,1],
												[ this.dimX/2,this.dimY/2,0,1],
												[-this.dimX/2,-this.dimY/2,0,1],
												[-this.dimX/2, this.dimY/2,0,1],

										 ];

this.patch = new Patch(scene,1,1,this.divX,this.divY,this.controlPoints);
}


Plane.prototype.display = function()
{
	this.patch.display();
}
