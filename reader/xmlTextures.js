/**
* Class that represents textures tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayTextures array of textures
*/
function xmlTextures(arrayTextures)
{
  this.textures = arrayTextures.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlTextures.prototype.consoleDebug = function(){
  console.log("--- START TEXTURES DEBUGGING ---");
  console.log("Textures[" + this.textures.length + "]:");
  for(var i = 0; i < this.textures.length; i++){
    this.textures[i].consoleDebug();
  }
  console.log("--- FINISH TEXTURES BUGGING ---");
};

/**
* Scan textures array to find match with parameter id and return it
* @param id Id to match with
* @return Matched element. False otherwise
*/
xmlTextures.prototype.findById = function(id)
{
  if (id === 'inherit' || id === 'none')
  {
    return new xmlText(id, '', 0, 0);
  }
  //percorrer o array
  for (var i = 0; i < this.textures.length; i++)
  {
    //match id
    if (this.textures[i].id === id)
    {
      return this.textures[i];
    }
  }
  return false;
}

/**
* Class that represents a single texture
* @param id ID of the texture
* @param file
* @param length_s
* @param length_t
*/
function xmlText(id, file, length_s, length_t)
{
  this.id = id;
  this.file = file;
  this.length_s = length_s;
  this.length_t = length_t;
};

/**
* Outputs every attr to the console
*/
xmlText.prototype.consoleDebug = function(){
  console.log("--- START TEXT DEBUGGING ---");
  console.log("Id: " + this.id);
  console.log("File: " + this.file);
  console.log("Length_s: " + this.length_s);
  console.log("Length_t: " + this.length_t);
  console.log("--- FINISH TEXT DEBUGGING ---");
};
