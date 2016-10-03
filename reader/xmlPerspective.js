/**
* Class that represents a perspective
* @param id ID of this perspective
* @param near
* @param far
* @param angle
* @param arrayFrom array that contains the coordinates inside 'from' tag in .dsx
* @param arrayTo array that contains the coordinates inside 'to' tag in .dsx
*/
function xmlPerspective(id, near, far, angle, arrayFrom, arrayTo)
{
  this.id = id;
  this.near = near;
  this.far = far;
  this.angle = angle;
  this.from = arrayFrom.slice(0);
  this.to = arrayTo.slice(0);
};
