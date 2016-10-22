/**
* Class that represents materials tag in xml (it's basically just an array, but it helps with debugging)
* @param arrayMaterials array of textures
*/
function xmlMaterials(arrayMaterials)
{
  this.materials = arrayMaterials.slice(0);
  //object of class CGFappearance
  this.activeMat = null;
  //default activeMat is the first one
  this.activeMatIndex = 0;
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
 * Checks if there are multiple objects with the same id
 */
xmlMaterials.prototype.checkDoubleId = function() {
    for (var i = 0; i < this.materials.length - 1; i++) {
        for (var j = i + 1; j < this.materials.length; j++) {
            if (this.materials[i].id === this.materials[j].id) {
                return 'Found multiple materials with the same id: ' + this.materials[i].id;
              }
        }
    }
    return null;
};

/**
* Loads the active material
* @param scene Scene
* @param texture Texture (object of class CGFTexture)
* @return Returns the CGFappearance object loaded, or 'inherit'
*/
xmlMaterials.prototype.load= function(scene, texture, id) {
  //load active material
  return this.materials[this.activeMatIndex].load(scene, texture);
}

/**
* Applies materials
* @param scene Scene
* @param texture Texture (object of class CGFTexture)
*/
xmlMaterials.prototype.apply= function(scene, texture){
  //this makes sure a material is only loaded once
  if (this.activeMat === null) {
    //load active material
    this.activeMat = this.load(scene, texture);
  }
  //apply material if not 'inherit'
  if (this.activeMat != 'inherit') {
    this.activeMat.apply(scene, texture);
  }
};

/**
* Change material
* @param scene Scene
* @param texture Texture (object of class CGFTexture)
*/
xmlMaterials.prototype.nextMaterial = function(scene, texture) {
  //change activeMatIndex
  this.activeMatIndex++;
  //make sure it's a valid index
  if (this.activeMatIndex >= this.materials.length) {
    this.activeMatIndex = 0;
  }
  //load new activeMaterial
  this.activeMat = this.load(scene, texture);
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
* @param arrayEmission [r, g, b, a]
* @param arrayAmbient [r, g, b, a]
* @param arrayDiffuse [r, g, b, a]
* @param arraySpecular [r, g, b, a]
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
* Loads material
* @param scene Scene
* @param text CGFTexture object
* @return Returns the CGFappearance object loaded, or 'inherit'
*/
xmlMat.prototype.load= function(scene, texture) {
  //TODO M key to change material
  //only apply material if id is different than 'inherit', otherwise do nothing
  if (this.id != 'inherit') {
    //define new CGFappearance object
    var mat = new CGFappearance(scene);
    //set emission
    mat.setEmission(this.emission[0], this.emission[1], this.emission[2], this.emission[3]);
    //set ambient
    mat.setAmbient(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
    //set diffuse
    mat.setDiffuse(this.diffuse[0], this.diffuse[1], this.diffuse[2], this.diffuse[3]);
    //set specular
    mat.setSpecular(this.specular[0], this.specular[1], this.specular[2], this.specular[3]);
    //set shininess
    mat.setShininess(this.shininess);
    //set texture if not 'inherit'
    if (texture != 'inherit') {
      mat.setTexture(texture);
    }
    return mat;
  }
  return 'inherit';
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
