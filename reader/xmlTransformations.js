/**
* Class that represents transformations tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayTransformations array of transformations
*/
function xmlTransformations(arrayTransformations)
{
  this.transformations = arrayTransformations.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlTransformations.prototype.consoleDebug = function(){
  console.log("--- START TRANSFORMATIONS DEBUGGING ---");
  console.log("Transformations[" + this.transformations.length + "]:");
  for(var i = 0; i < this.transformations.length; i++){
    this.transformations[i].consoleDebug();
  }
  console.log("--- FINISH TRANSFORMATIONS BUGGING ---");
};

/**
* Class that represents a single transformation
* @param id ID of the transformation
* @param arrayTranslate
* @param arrayRotate
* @param arrayScale
*/
function xmlTrans(id, arrayTranslate, arrayRotate, arrayScale)
{
  this.id = id;
  this.translate = arrayTranslate.slice(0);
  this.rotate = arrayRotate.slice(0);
  this.scale = arrayScale.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlTrans.prototype.consoleDebug = function(){
  console.log("--- START TRANS DEBUGGING ---");
  console.log("Id: " + this.id);
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Translate[" + this.translate.length + "]:";
  for(var i = 0; i < this.translate.length; i++){
    ss += " " + this.translate[i];
  }
  console.log(ss);
  ss = "Rotate[" + this.rotate.length + "]:";
  for(var i = 0; i < this.rotate.length; i++){
    ss += " " + this.rotate[i];
  }
  console.log(ss);
  ss = "Scale[" + this.scale.length + "]:";
  for(var i = 0; i < this.scale.length; i++){
    ss += " " + this.scale[i];
  }
  console.log(ss);
  console.log("--- FINISH TRANS DEBUGGING ---");
};
