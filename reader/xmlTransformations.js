/**
* Class that represents transformations tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayTransformations array of transformations (object of class xmlTransf)
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
* Scan transformations array to find match with parameter id and return it
* @param id Id to match with
* @return Matched element. False otherwise
*/
xmlTransformations.prototype.findById = function(id)
{
  //percorrer o array
  for (var i = 0; i < this.transformations.length; i++)
  {
    //match id
    if (this.transformations[i].id === id)
    {
      return this.transformations[i];
    }
  }
  return false;
}

/**
* Class that represents a single transformation
* @param id ID of the transformation
* @param arrayTransformations array of transformations (object of class xmlTransfOp)
*/
function xmlTransf(id, arrayTransformations)
{
  this.id = id;
  this.transformations = arrayTransformations.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlTransf.prototype.consoleDebug = function(){
  console.log("--- START TRANSF DEBUGGING ---");
  console.log("Id: " + this.id);
  for (var i = 0; i < this.transformations.length; i++) {
    this.transformations[i].consoleDebug();
  }
  console.log("--- FINISH TRANSF DEBUGGING ---");
};

/**
* Class that represents a transformation operation
* @param type Set to either 'translate', 'rotate' or 'scale'
* @param arrayTransformations array of transformations
* @param arrayOperation Array with operation values
*/
function xmlTransfOp(type, arrayOperation)
{
  this.type = type;
  this.operation = arrayOperation;
};

/**
* Outputs every element of translate to the console
*/
xmlTransfOp.prototype.consoleDebug = function(){
  var ss; //string variable that helps avoiding the console.log newline
  if (this.type === 'translate') {
    ss = "Translate[" + this.operation.length + "]:";
    for(var i = 0; i < this.operation.length; i++){
      ss += " " + this.operation[i];
    }
  }
  else if (this.type === 'rotate') {
    ss = "Rotate[" + this.operation.length + "]:";
    for(var i = 0; i < this.operation.length; i++){
      ss += " " + this.operation[i];
    }
  }
  else if (this.type === 'scale') {
    ss = "Scale[" + this.operation.length + "]:";
    for(var i = 0; i < this.operation.length; i++){
      ss += " " + this.operation[i];
    }
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
