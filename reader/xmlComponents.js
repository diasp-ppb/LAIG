/**
* Class that represents a single component
* @param id ID of the material
* @param transformation Object of Class xmlTransf
* @param materials Object of Class xmlMaterials (could be just a simple array, but this helps with debugging!)
* @param texture Object of Class xmlText
* @param children Object of Class xmlCompChildren (could be just a simple bi-dim array, but this helps with debugging!)
*/
function xmlComp(id, transformation, materials, texture, children)
{
  this.id = id;
  this.transformation = transformation;
  this.materials = materials;
  this.texture = texture;
  this.children = children;
};

/**
* Outputs every attr to the console
*/
xmlComp.prototype.consoleDebug = function(){
  console.log("--- START COMPONENT DEBUGGING ---");
  //debug id
  console.log("Id: " + this.id);
  //debug transformation
  console.log("Transformation:");
  this.transformation.consoleDebug();
  //debug materials
  console.log("Materials:");
  this.materials.consoleDebug();
  //debug texture
  console.log("Texture:");
  this.texture.consoleDebug();
  //debug children
  console.log("Children:");
  this.children.consoleDebug();
  console.log("--- FINISH COMPONENT DEBUGGING ---");
};

/**
* Class that represents the children of a component (it's basically just a struct with 2 arays)
* @param childrenComp Object of Class xmlComponents
* @param childrenPrim Object of Class xmlPrimitives
*/
function xmlCompChildren(childrenComp, childrenPrim)
{
  this.components = childrenComp;
  this.primitives = childrenPrim;
};

/**
* Outputs every attr to the console
*/
xmlCompChildren.prototype.consoleDebug = function(){
  console.log("--- START COMP CHILDREN DEBUGGING ---");
  //debug components
  console.log("Components:");
  this.components.consoleDebug();
  //debug primitives
  console.log("Primitives:");
  this.primitives.consoleDebug();
  console.log("--- FINISH COMP CHILDREN DEBUGGING ---");
};

/**
* Class that represents an array of components
* @param arrayComponents Array of objects of Class xmlComp
*/
function xmlComponents(arrayComponents)
{
  this.components = arrayComponents.slice(0);
};

/**
* Scan components array to find match with parameter id and return it
* @param id Id to match with
* @return Matched element. False otherwise
*/
xmlComponents.prototype.findById = function(id)
{
  //percorrer o array
  for (var i = 0; i < this.components.length; i++)
  {
    //match id
    if (this.components[i].id === id)
    {
      return this.components[i];
    }
  }
  return false;
}

/**
* Outputs every attr to the console
*/
xmlComponents.prototype.consoleDebug = function(){
  console.log("--- START COMPONENTS DEBUGGING ---");
  console.log("Components[" + this.components.length + "]:");
  for(var i = 0; i < this.components.length; i++){
    this.components[i].consoleDebug();
  }
  console.log("--- FINISH COMPONENTS DEBUGGING ---");
};
