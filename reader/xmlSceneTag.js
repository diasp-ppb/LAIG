/**
* Class that represents a scene tag in xml
* @param root ID of the rootnote of Scene Graph
* @param axis_length length of the axis
*/
function xmlSceneTag(root, axis_length)
{
  this.root = root;
  this.axis_length = axis_length;
};

/**
* Outputs every attr to the console
*/
xmlSceneTag.prototype.consoleDebug = function(){
  console.log("--- START SCENETAG DEBUGGING ---");
  console.log("Root: " + this.root);
  console.log("Axis Length: " + this.axis_length);
  console.log("--- FINISH SCENETAG DEBUGGING ---");
};
