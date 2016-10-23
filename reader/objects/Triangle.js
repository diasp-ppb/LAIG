/**
 * triangle
 * @constructor
 */
 function Triangle(scene,point1,point2,point3 ) {
 	CGFobject.call(this,scene);
  this.point1 = point1;
  this.point2 = point2;
  this.point3 = point3;
  this.u;
  this.v;
  this.ab;
  this.bc;
  this.ac;
  this.angle;
  this.minS = 0;
  this.maxS = 1;
  this.minT = 0;
  this.maxT = 1;
  this.ptX;
  this.ptY;

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


  this.u = {
    x: this.point2[0] - this.point1[0],
    y: this.point2[1] - this.point1[1],
    z: this.point2[2] - this.point1[2]
};
  this.v = {
    x: this.point3[0] - this.point1[0],
    y: this.point3[1] - this.point1[1],
    z: this.point3[2] - this.point1[2]
  };

 var N = {
   x: this.u.y * this.v.z - this.u.z * this.v.y,
   y: this.u.z * this.v.x - this.u.x * this.v.z,
   z: this.u.x * this.v.y - this.u.y * this.v.x
 };

 	this.normals=[
  N.x, N.y, N.z,
  N.x, N.y, N.z,
  N.x, N.y, N.z
 	];

  this.ab =Math.sqrt(Math.pow(this.point2[0]-this.point1[0] ,2)
                   + Math.pow(this.point2[1]-this.point1[1] ,2)
                   + Math.pow(this.point2[2]-this.point2[2] ,2));
  this.bc =Math.sqrt(Math.pow(this.point2[0]-this.point3[0] ,2)
                   + Math.pow(this.point2[1]-this.point3[1] ,2)
                   + Math.pow(this.point2[2]-this.point3[2] ,2));
  this.ac =Math.sqrt(Math.pow(this.point1[0]-this.point3[0] ,2)
                   + Math.pow(this.point1[1]-this.point3[1] ,2)
                   + Math.pow(this.point1[2]-this.point3[2] ,2));
  this.beta= Math.acos(
           ( Math.pow(this.bc, 2)
           - Math.pow(this.ac,2)
           + Math.pow(this.ab, 2))
           / (2*this.ab*this.bc)
           );

  this.ptX = this.ab-this.bc*Math.cos(this.beta);
  this.ptY = this.bc*Math.sin(this.beta);
  this.texCoords=[
    0,1,
    this.bc,1,
    this.ptX,1-this.ptY
  ];



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 Triangle.prototype.setTexturaRatio = function(s,t){

   this.texCoords=[
     0,1,
     this.bc/s,1,
     this.ptX/s,(1-this.ptY)/t
   ];


   this.updateTexCoordsGLBuffers();
 };
