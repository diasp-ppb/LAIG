/**
* Class that represents a primitive (rectangle, triangle, cylinder, sphere, torus)
*/
function xmlPrimitive()
{
  this.id = null;
};

/**
* Class that represents a rectangle primitive
*/
function xmlRectangle(id, x1, x2, y1, y2)
{
  xmlPrimitive.call(this);
  this.id = id;
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
};
