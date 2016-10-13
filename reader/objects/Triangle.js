/**
 * triangle
 * @constructor
 */
 function Triangle(scene,point1,point2,point3 ) {
 	CGFobject.call(this,scene);
  this.point1 = point1;
  this.point2 = point2;
  this.point3 = point3;

 	this.initBuffers();
 };

 Triangle.prototype = Object.create(CGFobject.prototype);
 Triangle.prototype.constructor = Triangle;

 Triangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.point1[0],this.point1[1],this.point1[2],
 	this.point2[0],this.point2[1],this.point2[2],
  this.point3[0],this.point3[1],this.point3[2]
 	];

 	this.indices = [
 	0, 1, 2,
  
 	];


  var U = {
    x: this.point2[0] - this.point1[0],
    y: this.point2[1] - this.point1[1],
    z: this.point2[2] - this.point1[2]
};
  var V = {
    x: this.point3[0] - this.point1[0],
    y: this.point3[1] - this.point1[1],
    z: this.point3[2] - this.point1[2]
  };

 var N = {
   x: U.y * V.z - U.z * V.y,
   y: U.z * V.x - U.x * V.z,
   z: U.x * V.y - U.y * V.x
 };

 	this.normals=[
  N.x, N.y, N.z,
  N.x, N.y, N.z,
  N.x, N.y, N.z
 	];





 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
