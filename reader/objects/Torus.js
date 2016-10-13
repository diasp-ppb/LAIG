function Torus(scene, inner, outer, slices, loops) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = loops;
  this.inner = inner;
  this.outer = outer;



 	this.initBuffers();
 };

 Torus.prototype = Object.create(CGFobject.prototype);
 Torus.prototype.constructor = Torus;

 Torus.prototype.initBuffers = function() {

this.vertices = [];
this.indices = [];
this.normals = [];
this.texCoords = [];



var sigma = (2 * Math.PI)/ this.slices;
var teta = Math.PI/ this.stacks;


var tetaStack  = 0;
var sigmaSlice = 0;

var r = (this.outer - this.inner);
var R = r/2 + this.inner;

for(var i = 0 ; i <= this.stacks ; i++){
		tetaStack = i * teta;
		for(var m = 0 ; m <= this.slices; m++){
			sigmaSlice = m * sigma;
			var x = (R+r*Math.cos(tetaStack))*Math.cos(sigmaSlice);
			var y = (R+r*Math.cos(tetaStack))*Math.sin(sigmaSlice);
			var z =r * Math.sin(tetaStack);

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
 			this.indices.push( (i + 1) * (this.slices + 1) + k + 1, y,x);
			this.indices.push(i * (this.slices + 1) + k + 1, y + 1,x );
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
