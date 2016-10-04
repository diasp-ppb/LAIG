function MySceneGraph(filename, scene) {
  this.loadedOk = null;

  // Establish bidirectional references between scene and graph
  this.scene = scene;
  scene.graph = this;

  // File reading
  this.reader = new CGFXMLreader();

  /*
  * Read the contents of the xml file, and refer to this class for loading and error handlers.
  * After the file is read, the reader calls onXMLReady on this object.
  * If any error occurs, the reader calls onXMLError on this object, with an error message
  */

  this.reader.open('scenes/' + filename, this);


  /* Storage for scene tag */
  this.xmlScene = null;
  /* Storage for views tag */
  this.views = null;
  /* Storage for scene lights*/
  this.lights = {
    omnis: [],
    spots: []
  };
  /* Storage for textures information*/
  this.textures = [];
  /* Storage for materials*/
  this.materials = [];
  /* Storage for primitives */
  this.primitives = [];
}

/*
* Callback to be executed after successful reading
*/
MySceneGraph.prototype.onXMLReady = function() {
  console.log("XML Loading finished.");
  var rootElement = this.reader.xmlDoc.documentElement;

  // Here should go the calls for different functions to parse the various blocks
  var error = this.parserIllumination(rootElement);
  error = this.parserSceneTag(rootElement);
  error = this.parserViews(rootElement);
  error = this.parserLights(rootElement);
  error = this.parserTextures(rootElement);
  error = this.parserMaterials(rootElement);
  error = this.parserTransformations(rootElement);
  error = this.parserPrimitives(rootElement);
  if (error != null) {
    this.onXMLError(error);
    return;
  }

  this.loadedOk = true;


  //CONFIGURATION
  this.setAxis();


  // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
  this.scene.onGraphLoaded();
};

MySceneGraph.prototype.parserSceneTag= function(rootElement) {
  var elems = rootElement.getElementsByTagName('scene');
  if (elems == null)
  {
    return "scene element is missing";
  }

  if (elems.length != 1)
  {
    return "either zero or more than one 'scene' element found";
  }

  var scene = elems[0];
  //read attr 'root' within 'scene' tag
  var root = this.reader.getString(scene, 'root');
  //read attr 'axis_length' within 'scene' tag
  var axis_length = this.reader.getFloat(scene, 'axis_length');
  this.xmlScene = new xmlScene(root, axis_length);
};

/*
* Example of method that parses elements of one block and stores information in a specific data structure
*/
MySceneGraph.prototype.parseGlobalsExample = function(rootElement) {

  var elems = rootElement.getElementsByTagName('globals');
  if (elems == null) {
    return "globals element is missing.";
  }

  if (elems.length != 1) {
    return "either zero or more than one 'globals' element found.";
  }

  // various examples of different types of access
  var globals = elems[0];
  this.background = this.reader.getRGBA(globals, 'background');
  this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill", "line", "point"]);
  this.cullface = this.reader.getItem(globals, 'cullface', ["back", "front", "none", "frontandback"]);
  this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw", "cw"]);

  console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

  var tempList = rootElement.getElementsByTagName('list');

  if (tempList == null || tempList.length == 0) {
    return "list element is missing.";
  }

  this.list = [];
  // iterate over every element
  var nnodes = tempList[0].children.length;
  for (var i = 0; i < nnodes; i++) {
    var e = tempList[0].children[i];

    // process each element and store its information
    this.list[e.id] = e.attributes.getNamedItem("coords").value;
    console.log("Read list item id " + e.id + " with value " + this.list[e.id]);
  };

};


MySceneGraph.prototype.parserViews = function(rootElement) {
  var views = rootElement.getElementsByTagName('views');
  if (views == null || views.length == 0) {
    return "'views' is missing";
  }
  var defaultPersp = views[0].getAttribute("default");
  //create Views object (storing the default perspective)
  this.views = new xmlViews(defaultPersp);
  var nnodes = views[0].children.length;
  if (nnodes <= 0) {
    return 'no perspectives on file';
  }
  var child;
  for (var i = 0; i < nnodes; i++) {
    child = views[0].children[i];
    if (child.nodeName === "perspective") {
      var id = this.reader.getString(child, "id", 1);
      var near = this.reader.getFloat(child, "near", 1);
      var far = this.reader.getFloat(child, "far", 1);
      var angle = this.reader.getFloat(child, "angle", 1);
      var arrayFrom =  [];
      var arrayTo =  [];
      var childNodes = child.children.length;
      if (childNodes < 2) {
        return "wrong number of perspective " + perspective.id + "children";
      }
      var childSon;
      for (var k = 0; k < childNodes; k++)
      {
        childSon = child.children[k];
        if (childSon.nodeName === "from") {
            arrayFrom = [this.reader.getFloat(childSon, "x", 1),
            this.reader.getFloat(childSon, "y", 1),
            this.reader.getFloat(childSon, "z", 1)];
        }
        else if (childSon.nodeName === "to") {
          arrayTo = [this.reader.getFloat(childSon, "x", 1),
          this.reader.getFloat(childSon, "y", 1),
          this.reader.getFloat(childSon, "z", 1)];
        }
        else {
          return "invalid perspective " + perspective.id + " son ";
        }
      }
      var perspective = new xmlPerspective(id, near, far, angle, arrayFrom, arrayTo);
      this.views.perspectives.push(perspective);
    }
  }
};


MySceneGraph.prototype.parserIllumination = function(rootElement) {
  var ilumi = rootElement.getElementsByTagName('illumination');


  if (ilumi == null || ilumi.length == 0) {
    return "'illumination' is missing";
  }

  var doublesided = ilumi[0].getAttribute("doublesided");
  var local = ilumi[0].getAttribute("local");
  // TODO o que fazer ao doublesided e local ???

  var nnodes = ilumi[0].children.length;

  if (nnodes != 2) {
    return "'illumination' wrong number of children ";
  }
  var child;
  for (var i = 0; i < nnodes; i++) {
    child = ilumi[0].children[i];
    if (child.nodeName === "ambient") {
      this.scene.setAmbient(this.reader.getFloat(child, "r", 1), this.reader.getFloat(child, "g", 1), this.reader.getFloat(child, "b", 1), this.reader.getFloat(child, "a", 1));
      // TODO FALTA TESTAR ISTO PRECISO Objectos
    } else if (child.nodeName === "background") {
      //Set background color
      this.background = this.reader.getFloat(child, "r", 1) + "" +
      this.reader.getFloat(child, "g", 1) + "" +
      this.reader.getFloat(child, "b", 1) + "" +
      this.reader.getFloat(child, "a", 1);
    }

  }
};

MySceneGraph.prototype.parserLights = function(rootElement) {
  var lights = rootElement.getElementsByTagName('lights');

  if (lights == null || lights.length == 0) {
    return "'lights' is missing";
  }

  var nnodes = lights[0].children.length;
  if (nnodes < 1) {
    return "wrong number of lights children";
  }

  var child;
  for (var i = 0; i < nnodes; i++) {
    child = lights[0].children[i];
    if (child.nodeName === "omni") {
      var nodesSon = child.children.length;
      var omni = {
        id: this.reader.getString(child, "id", 1),
        enabled: this.reader.getBoolean(child, "enabled", 1),
        location:  [],
        ambient:  [],
        diffuse: [],
        specular: []
      };

      var childSon;
      for (var k = 0; k < nodesSon; k++) {
        childSon = child.children[k];

        if (childSon.nodeName === "location") {
          omni.location = {
            x: this.reader.getFloat(childSon, "x", 1),
            y: this.reader.getFloat(childSon, "y", 1),
            z: this.reader.getFloat(childSon, "z", 1),
            w: this.reader.getFloat(childSon, "w", 1)
          }
        } else if (childSon.nodeName === "ambient" || childSon.nodeName === "diffuse" ||
        childSon.nodeName === "specular") {
          omni[childSon.nodeName] = {
            r: this.reader.getFloat(childSon, "r", 1),
            g: this.reader.getFloat(childSon, "g", 1),
            b: this.reader.getFloat(childSon, "b", 1),
            a: this.reader.getFloat(childSon, "a", 1)
          }
        }
      }
      this.lights.omnis.push(omni);
    } else if (child.nodeName === "spot") {
      var spot = {
        id: this.reader.getString(child, "id", 1),
        enabled: this.reader.getBoolean(child, "enabled", 1),
        angle: this.reader.getFloat(child, "angle", 1),
        exponent: this.reader.getFloat(child, "exponent", 1),
        target: [],
        location: [],
        ambient:  [],
        diffuse:  [],
        specular: []
      };


      var childSon;
      for (var k = 0; k < nodesSon; k++) {
        childSon = child.children[k];
        if (childSon.nodeName === "target" || childSon.nodeName === "location") {
          spot[childSon.nodeName] = {
            x: this.reader.getFloat(childSon, "x", 1),
            y: this.reader.getFloat(childSon, "y", 1),
            z: this.reader.getFloat(childSon, "z", 1),


          };
        } else {
          spot[childSon.nodeName] = {
            r: this.reader.getFloat(childSon, "r", 1),
            g: this.reader.getFloat(childSon, "g", 1),
            b: this.reader.getFloat(childSon, "b", 1),
            a: this.reader.getFloat(childSon, "a", 1)
          }


        }
      }
      this.lights.spots.push(spot);
    }
  }

};

MySceneGraph.prototype.parserTextures = function(rootElement) {
  var textures = rootElement.getElementsByTagName('textures');

  if (textures == null || textures.length == 0) {
    return "'textures' are missing";
  }
  var nnodes = textures[0].children.length;
  if (nnodes < 1) {
    return "no textures";
  }

  var child;

  for(var i = 0; i < nnodes; i++)
  {
    child = textures[0].children[i];

    var texture = {
      id: this.reader.getString(child, "id", 1),
      file: this.reader.getString(child, "file", 1),
      length_s:  this.reader.getFloat(child, "length_s", 1),
      length_t:  this.reader.getFloat(child, "length_t", 1),
    }
    this.textures.push(texture);
  }
}

MySceneGraph.prototype.parserMaterials = function(rootElement) {
  var materials = rootElement.getElementsByTagName('textures');

  if (materials == null || materials.length == 0) {
    return "'textures' are missing";
  }
  var nnodes = materials[0].children.length;
  if (nnodes < 1) {
    return "no materials";
  }

  var child;

  for(var i = 0; i < nnodes; i++){
    child = materials[0].children[i];
    var material = {
      id: this.reader.getString(child, "id", 1),
      emission: [],
      ambient: [],
      diffuse: [],
      specular: []
    };
    var nodesSon = child.children.length;

    var childSon;
    for(var k = 0; k < nodesSon; k++){
      childSon=child[0].children[k];
      if(childSon.nodeName ==="shininess"){
        material.shininess = this.reader.getFloat(childSon, "value", 1);
      }
      else {
        material[childSon.nodeName] = {
          r: this.reader.getFloat(childSon, "r", 1),
          g: this.reader.getFloat(childSon, "g", 1),
          b: this.reader.getFloat(childSon, "b", 1),
          a: this.reader.getFloat(childSon, "a", 1)
        }
      }
    }
    this.materials.push(material);
  }
};


MySceneGraph.prototype.parserTransformations = function(rootElement) {
  var transformations = rootElement.getElementsByTagName('transformations');



  if (transformations == null || transformations.length == 0) {
    return "'transformations' are missing";
  }
  var nnodes = transformations[0].children.length;
  if (nnodes < 1) {
    return "no transformations";
  }

  var child;

  for(var i = 0; i < nnodes; i++)
  {
    child = transformations[0].children[i];
    if(child.nodeName === "transformation"){
      var nSon = child.children.length;

      console.log("nSon " + nSon);

      if(nSon < 1){
        return "Wrong number of transformations in " + transformation.id;
      }



      var transformation = {
        id : this.reader.getString(child,"id",1),
        transforms:[],
      };

      var childSon;
      for(var k = 0; k < nSon; k++){
        childSon = child.children[k];

        if(childSon.nodeName === "translate"){
          var translate = {

            x: this.reader.getFloat(childSon,"x",1),
            y: this.reader.getFloat(childSon,"y",1),
            z: this.reader.getFloat(childSon,"z",1)
          };
          transformation.transforms.push(translate);
        }
        else if(childSon.nodeName === "rotate"){
          var  rotate = {
            axis:this.reader.getItem(childSon,"axis",["x","y","z"],1),
            angle: this.reader.getFloat(childSon,"angle",1)
          };
          console.log(rotate.axis);
          transformation.transforms.push(rotate);
        }
        else if(childSon.nodeName === "scale"){
          var scale = {
            x: this.reader.getFloat(childSon,"x",1),
            y: this.reader.getFloat(childSon,"y",1),
            z: this.reader.getFloat(childSon,"z",1)
          }
          console.log(scale.x);
          transformation.transforms.push(scale);
        }
        else {
          return "invalid transformation -> use translate,rotate,scale"
        }

      }

    }
    console.log(transformation.transforms.length);
  }
};

MySceneGraph.prototype.parserPrimitives= function(rootElement) {
  var elems = rootElement.getElementsByTagName('primitives');
  if (elems == null)
  {
    return "'primitives' element is missing";
  }

  if (elems.length != 1)
  {
    return "either zero or more than one 'primitives' element found";
  }
  //'primitives' tag
  var primitives = elems[0];

  //how many 'primitive' tags there are
  var nPrim = primitives.children.length;
  if (nPrim <= 0) {
    return "no 'primitive' tags found";
  }
  for (var i = 0; i < nPrim; i++){
    //'primitive' tag
    var prim = primitives.children[i];
    //extract id
    var primId = this.reader.getString(prim, 'id');
    //how many primitive types there are (can only be one!)
    var nChildPrim = prim.children.length;
    if (nPrim != 1)
    {
      return "either zero or more than one primitive types found (rectangle, triangle, cylinder, sphere, torus )";
    }
    //primitive type (rectangle, triangle, cylinder, sphere, torus )
    var primType = prim.children[0];
    //find out what type of primitive it is (rectangle, triangle, cylinder, sphere, torus )
    if (primType.nodeName === "rectangle")
    {
      var x1 = this.reader.getFloat(primType, 'x1');
      var x2 = this.reader.getFloat(primType, 'x2');
      var y1 = this.reader.getFloat(primType, 'y1');
      var y2 = this.reader.getFloat(primType, 'y2');
      this.primitives.push(new xmlRectangle(primId, x1, x2, y1, y2));
    }
    else if (primType.nodeName === "triangle")
    {
      //TODO
    }
    else  if (primType.nodeName === "cylinder")
    {
      //TODO
    }
    else  if (primType.nodeName === "sphere")
    {
      //TODO
    }
    else   if (primType.nodeName === "torus")
    {
      //TODO
    }
    else {
      return "invalid primitive type";
    }
  }
};

/*
* Callback to be executed on any read error
*/

MySceneGraph.prototype.onXMLError = function(message) {
  console.error("XML Loading Error: " + message);
  this.loadedOk = false;
};

MySceneGraph.prototype.setAxis = function(){
  this.scene.axis = new CGFaxis(this.scene,this.xmlScene.axis_length);
};
