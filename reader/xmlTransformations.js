/**
* Class that represents transformations tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayTransformations array of transformations (object of class xmlTransf)
*/
function xmlTransformations(arrayTransformations)
{
  this.transformations = arrayTransformations.slice(0);
}

/**
* Applies transformations
* @param scene Scene
*/
xmlTransformations.prototype.apply= function(scene){
  var n = this.transformations.length;
  for(var i = 0 ; i < n; i++){
    this.transformations[i].apply(scene);
  }
};

/**
 * Checks if there are multiple objects with the same id
 */
xmlTransformations.prototype.checkDoubleId = function() {
    for (var i = 0; i < this.transformations.length - 1; i++) {
        for (var j = i + 1; j < this.transformations.length; j++) {
            if (this.transformations[i].id === this.transformations[j].id) {
                return 'Found multiple transformations with the same id: ' + this.transformations[i].id;
              }
        }
    }
    return null;
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
};

/**
* Class that represents a single transformation
* @param id ID of the transformation
* @param arrayTransformations array of transformations (object of class xmlTransfOp)
*/
function xmlTransf(id, arrayTransformations)
{
  this.id = id;
  this.transformations = arrayTransformations.slice(0);
}

/**
* Applies transformations
* @param scene Scene
*/
xmlTransf.prototype.apply= function(scene)
{
  var n = this.transformations.length;
  for(var i = 0 ; i < n ; i++){
      this.transformations[i].apply(scene);
  }
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
  // convert degrees to rads
  if(type === 'rotate'){
    this.operation[1] = this.operation[1]* Math.PI / 180;
  }
}

/**
* Applies transformations
* @param scene Scene
*/
xmlTransfOp.prototype.apply = function(scene){
  if(this.type === 'translate')
  {
    scene.translate(this.operation[0],this.operation[1],this.operation[2]);
  }
  else if (this.type === 'rotate')
  {
    var ex = this.operation[0];
    if( 'x' === ex ){
        scene.rotate(this.operation[1], 1,0,0);
    }
    else if('y' === ex){
        scene.rotate(this.operation[1], 0,1,0);
    }
    else if('z' === ex){
        scene.rotate(this.operation[1], 0,0,1);
    }
  }
  else  if(this.type === 'scale')
    {
      scene.scale(this.operation[0],this.operation[1],this.operation[2]);
    }
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
