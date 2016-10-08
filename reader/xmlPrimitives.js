/**
* Class that represents lights tag in xml (it's basically a struct with 5 arrays)
* @param arrayRect array containing rectangles
*/
function xmlPrimitives(arrayRect)
{
  this.rect = arrayRect.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlPrimitives.prototype.consoleDebug = function(){
  console.log("--- START PRIMITIVES DEBUGGING ---");
  console.log("Rect[" + this.rect.length + "]:");
  for(var i = 0; i < this.rect.length; i++){
    this.rect[i].consoleDebug();
  }
  console.log("--- FINISH PRIMITIVES DEBUGGING ---");
};

/**
* Class that represents a rectangle primitive
* @param id ID of the rectangle
* @param x1 coordinates
* @param x2 coordinates
* @param y1 coordinates
* @param y2 coordinates
*/
function xmlRectangle(id, x1, x2, y1, y2)
{
  this.id = id;
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
};

/**
* Outputs every attr to the console
*/
xmlRectangle.prototype.consoleDebug = function(){
  console.log("--- START RECTANGLE DEBUGGING ---");
  console.log("Id: " + this.id);
  console.log("x1: " + this.x1);
  console.log("y1: " + this.y1);
  console.log("x2: " + this.x2);
  console.log("y2: " + this.y2);
  console.log("--- FINISH RECTANGLE DEBUGGING ---");
};
