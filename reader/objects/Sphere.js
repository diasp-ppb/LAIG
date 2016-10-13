function Sphere(scene, slices, stacks,radius) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
  this.radius = radius;

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {

this.vertices = [];
this.indices = [];
this.normals = [];
this.texCoords = [];

var sigma = (2 * Math.PI)/ this.slices;
var teta = Math.PI/ this.stacks;

var tetaAux  = 0;
var sigmaAux = 0;
for(var i = 0 ; i <= this.stacks ; i++){
		tetaStack = i * teta;
		for(var m = 0 ; m <= this.slices; m++){
			sigmaSlice = m * sigma;
			var x = this.radius * Math.cos(sigmaSlice) * Math.sin(tetaStack);
			var y = this.radius * Math.sin(tetaStack) * Math.sin(sigmaSlice);
			var z = this.radius * Math.cos(tetaStack);

			this.vertices.push(x,y,z);
			this.normals.push(x,y,z);
			this.texCoords.push(1- i/this.stacks, 1 - m/this.slices);

		}
	}

//Indices
for(var i = 0 ; i < this.stacks ; ++i){
 		for(var k = 0; k < this.slices ; ++k){
      var x = i * (this.slices + 1) + k;
      var y = (i + 1) * (this.slices + 1) + k;
 			this.indices.push(x, y, (i + 1) * (this.slices + 1) + k + 1);
			this.indices.push(x, y + 1, i * (this.slices + 1) + k + 1);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
