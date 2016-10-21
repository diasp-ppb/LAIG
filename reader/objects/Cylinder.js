/**
 * Cilinder
 * @constructor
 */
 function Cylinder(scene, slices, stacks, base, top, height) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

	this.Tinc = 1/stacks;
	this.Sinc = 1/slices;
  this.increaseRadius = (top-base)/stacks;
  this.radius = base;
  this.radius2 = top;

  this.heightIncrease = height / stacks;
  this.height = height;
 	this.initBuffers();


 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {


 	this.vertices = new Array();
 	this.indices = new Array();
 	this.normals = new Array();
  this.texCoords = [];



  	var angle = 2 * Math.PI / (this.slices);

    var nCorpo = 0;
  var h=0;
  var l= this.radius;
  for (var i = 0; i < this.stacks +1; i++)
	{
    	this.Sinc = 0;


		for (var j = 0; j < this.slices + 1; j++)
		{

		this.vertices.push(Math.cos(j * angle)*l, Math.sin(j * angle)*l,  h);
    nCorpo++;
  	this.normals.push(Math.cos(j * angle), Math.sin(j * angle),0);
		this.texCoords.push(this.Sinc, this.Tinc);

			this.Sinc+=1/this.slices;
		}
    l += this.increaseRadius;
		this.Tinc+= 1/this.stacks;
    h = h + this.heightIncrease;

	}

	for (var i = 0; i < this.stacks+1; i++)
	{
		for (var j = 0; j < this.slices + 1; j++)
		{
			if (j == this.slices - 1)
			{
				this.indices.push((i * this.slices + j),  (i * this.slices + j) + 1 - this.slices, (((i + 1) * this.slices + j) + 1) - this.slices);
				this.indices.push((i * this.slices + j), (((i + 1) * this.slices + j) + 1) - this.slices, ((i + 1) * this.slices + j));
			}
			else
			{
				this.indices.push((i * this.slices + j), (i * this.slices + j) + 1, ((i + 1) * this.slices + j) + 1);
				this.indices.push((i * this.slices + j), ((i + 1) * this.slices + j) + 1, ((i + 1) * this.slices + j));
			}
		}
	}

  //base
  var count = nCorpo;


  for(var i = 0; i < this.slices ; i++){
    this.vertices.push(this.radius*Math.cos(angle*i),this.radius*Math.sin(angle*i), 0);
    this.texCoords.push(0.5+0.5*Math.cos(angle*i),0.5-0.5*Math.sin(angle*i));
    this.normals.push(0, 0, -1);
    count ++;
  }


    this.vertices.push(0,0,0);
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0, -1);

    var i = 1;
  	for (; i < this.slices; i++) {
  		this.indices.push(i+nCorpo,nCorpo+i+ -1,count -1);

  	}


    //topo

    nCorpo = count + 1;
    for(var i = 0; i < this.slices; i++){
      this.vertices.push(this.radius2*Math.cos(angle*i),this.radius2*Math.sin(angle*i), this.height);
      this.texCoords.push(0.5+0.5*Math.cos(angle*i),0.5-0.5*Math.sin(angle*i));
      this.normals.push(0, 0, 1);
      count ++;
    }

      this.vertices.push(0,0,this.height);
      this.texCoords.push(0.5,0.5);
      this.normals.push(0, 0, 1);


     var i = 1;
      for (; i < this.slices -1; i++) {
        this.indices.push(count, nCorpo+i-1,i+nCorpo);

      }




 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};
