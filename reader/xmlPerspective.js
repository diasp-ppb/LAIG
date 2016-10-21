/**
* Class that represents a perspective
* @param id ID of this perspective
* @param near
* @param far
* @param angle Angleis is in degrees, but is stored as rad!
* @param arrayFrom array that contains the coordinates inside 'from' tag in .dsx
* @param arrayTo array that contains the coordinates inside 'to' tag in .dsx
*/
function xmlPerspective(id, near, far, angle, arrayFrom, arrayTo)
{
  this.id = id;
  this.near = near;
  this.far = far;
  this.angle = angle*Math.PI/180;
  this.from = arrayFrom.slice(0);
  this.to = arrayTo.slice(0);
}

/**
* Outputs every attr to the console
*/
xmlPerspective.prototype.consoleDebug = function(){
  console.log("--- START PERSPECTIVE DEBUGGING ---");
  console.log("Id: " + this.id);
  console.log("Near: " + this.near);
  console.log("Far: " + this.far);
  console.log("Angle: " + this.angle);
  var ss; //string variable that helps avoiding the console.log newline
  ss = "From[" + this.from.length + "]:";
  for(var i = 0; i < this.from.length; i++){
    ss += " " + this.from[i];
  }
  console.log(ss);
  ss = "To[" + this.to.length + "]:";
  for(var i = 0; i < this.to.length; i++){
    ss += " " + this.to[i];
  }
  console.log(ss);
  console.log("--- FINISH PERSPECTIVE DEBUGGING ---");
};
