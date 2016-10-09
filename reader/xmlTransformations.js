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
* @param arrayTranslates (bi-demensional array! array of translates, and each translate is an array itself)
* @param arrayRotates (bi-demensional array! array of rotates, and each rotate is an array itself)
* @param arrayScales (bi-demensional array! array of scales, and each scale is an array itself)
*/
function xmlTransf(id, arrayTranslates, arrayRotates, arrayScales)
{
  this.id = id;
  this.translates = arrayTranslates.slice(0);
  this.rotates = arrayRotates.slice(0);
  this.scales = arrayScales.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlTransf.prototype.consoleDebug = function(){
  console.log("--- START TRANSF DEBUGGING ---");
  console.log("Id: " + this.id);
  console.log("Translates[" + this.translates.length + "]:");
  console.log("--- START TRANSLATES DEBUGGING ---");
  for(var i = 0; i < this.translates.length; i++){
    this.translateConsoleDebug(this.translates[i]);
  }
  console.log("--- FINISH TRANSLATES DEBUGGING ---");
  console.log("Rotates[" + this.rotates.length + "]:");
  console.log("--- START ROTATES DEBUGGING ---");
  for(var i = 0; i < this.rotates.length; i++){
    this.rotateConsoleDebug(this.rotates[i]);
  }
  console.log("--- FINISH ROTATES DEBUGGING ---");
  console.log("Scales[" + this.scales.length + "]:");
  console.log("--- START SCALES DEBUGGING ---");
  for(var i = 0; i < this.scales.length; i++){
    this.scaleConsoleDebug(this.scales[i]);
  }
  console.log("--- FINISH SCALES DEBUGGING ---");
  console.log("--- FINISH TRANSF DEBUGGING ---");
};

/**
* Outputs every element of translate to the console
*/
xmlTransf.prototype.translateConsoleDebug = function(translate){
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Translate[" + translate.length + "]:";
  for(var i = 0; i < translate.length; i++){
    ss += " " + translate[i];
  }
  console.log(ss);
};

/**
* Outputs every element of rotate to the console
*/
xmlTransf.prototype.rotateConsoleDebug = function(rotate){
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Rotate[" + rotate.length + "]:";
  for(var i = 0; i < rotate.length; i++){
    ss += " " + rotate[i];
  }
  console.log(ss);
};

/**
* Outputs every element of scale to the console
*/
xmlTransf.prototype.scaleConsoleDebug = function(scale){
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Scale[" + scale.length + "]:";
  for(var i = 0; i < scale.length; i++){
    ss += " " + scale[i];
  }
  console.log(ss);
};
