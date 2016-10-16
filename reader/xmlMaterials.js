/**
* Class that represents materials tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayMaterials array of textures
*/
function xmlMaterials(arrayMaterials)
{
  this.materials = arrayMaterials.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlMaterials.prototype.consoleDebug = function(){
  console.log("--- START MATERIALS DEBUGGING ---");
  console.log("Materials[" + this.materials.length + "]:");
  for(var i = 0; i < this.materials.length; i++){
    this.materials[i].consoleDebug();
  }
  console.log("--- FINISH MATERIALS BUGGING ---");
};

/**
* Scan materials array to find match with parameter id and return it
* @param id Id to match with
* @return Matched element. False otherwise
*/
xmlMaterials.prototype.findById = function(id)
{
  if (id === 'inherit')
  {
    return new xmlMat('inherit', [], [], [], [], '');
  }
  //percorrer o array
  for (var i = 0; i < this.materials.length; i++)
  {
    //match id
    if (this.materials[i].id === id)
    {
      return this.materials[i];
    }
  }
  return false;
}

/**
* Class that represents a single material
* @param id ID of the material
* @param arrayEmission
* @param arrayAmbient
* @param arrayDiffuse
* @param arraySpecular
* @param shininess
*/
function xmlMat(id, arrayEmission, arrayAmbient, arrayDiffuse, arraySpecular, shininess)
{
  this.id = id;
  this.emission = arrayEmission.slice(0);
  this.ambient = arrayAmbient.slice(0);
  this.diffuse = arrayDiffuse.slice(0);
  this.specular = arraySpecular.slice(0);
  this.shininess = shininess;
};

/**
* Outputs every attr to the console
*/
xmlMat.prototype.consoleDebug = function(){
  console.log("--- START MAT DEBUGGING ---");
  console.log("Id: " + this.id);
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Emission[" + this.emission.length + "]:";
  for(var i = 0; i < this.emission.length; i++){
    ss += " " + this.emission[i];
  }
  console.log(ss);
  ss = "Ambient[" + this.ambient.length + "]:";
  for(var i = 0; i < this.ambient.length; i++){
    ss += " " + this.ambient[i];
  }
  console.log(ss);
  ss = "Diffuse[" + this.diffuse.length + "]:";
  for(var i = 0; i < this.diffuse.length; i++){
    ss += " " + this.diffuse[i];
  }
  console.log(ss);
  ss = "Specular[" + this.specular.length + "]:";
  for(var i = 0; i < this.specular.length; i++){
    ss += " " + this.specular[i];
  }
  console.log(ss);
  console.log("Shininess: " + this.shininess);
  console.log("--- FINISH MAT DEBUGGING ---");
};
