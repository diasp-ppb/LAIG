
function Plane(scene,id, dimX, dimY, divX, divY){

CGFobject.call(this,scene);


this.dimX = dimX;
this.dimY = dimY;
this.divX = divX;
this.divY = divY;


this.controlPoints = [
												[0,this.dimY,0,1],
												[this.dimX,this.dimY,0,1],
												[0,0,0,1],
												[this.dimX,0,0,1]
										 ];

this.patch = new Patch(scene,1,1,this.divX,this.divY,this.controlPoints);

}


Plane.prototype.display = function()
{
	this.patch.display();
}
