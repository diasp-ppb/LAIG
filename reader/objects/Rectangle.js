/**
 * rectangle
 * @constructor
 */
function Rectangle(scene, point1,point2) {
    CGFobject.call(this, scene);
    this.x1 = point1[0];
    this.y1 = point1[1];
    this.x2 = point2[0];
    this.y2 = point2[1];
    this.maxS = 1;
    this.maxT = 1;
    this.minS = 0;
    this.minT = 0;
    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initBuffers = function() {
    this.vertices = [
        this.x1, this.y1, 0,
        this.x2, this.y1, 0,
        this.x1, this.y2, 0,
        this.x2, this.y2, 0
    ];

    this.indices = [
        0, 1, 2,
        3, 2, 1
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        this.maxS, this.maxT,
        this.minS, this.maxT,
        this.maxS, this.minT,
        this.minS, this.minT
    ];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

Rectangle.prototype.setTexturaRatio = function(s,t){
  var ds= Math.abs((this.x2-this.x1)/s);
  var dt= Math.abs((this.y2- this.y1)/t);


  this.texCoords = [
    ds, dt,
    this.minS, dt,
    ds,this.minT,
    this.minS,this.minT
  ];


  this.updateTexCoordsGLBuffers();
};
