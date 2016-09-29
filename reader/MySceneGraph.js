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

    /* Storage for scene perpectives*/
    this.perspectives = [];
    /* Storage for scene lights*/
    this.lights = {
        omnis: [],
        spots: []
    };
    /* Storage for textures information*/
    this.textures = [];
    /* Storage for materials*/
    this.materials = [];
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function() {
    console.log("XML Loading finished.");
    var rootElement = this.reader.xmlDoc.documentElement;

    // Here should go the calls for different functions to parse the various blocks
    var error = this.parserIllumination(rootElement);
    error = this.parserViews(rootElement); //TODO
    error = this.parserLights(rootElement);
    error = this.parserTextures(rootElement);
    error = this.parserMaterials(rootElement);
    if (error != null) {
        this.onXMLError(error);
        return;
    }

    this.loadedOk = true;

    // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
    this.scene.onGraphLoaded();
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

    var defaultPersp = views[0].getAttribute("default"); // TODO NOT STORED

    var nnodes = views[0].children.length;

    if (nnodes <= 0) {
        return 'no perspectives on file';
    }
    var child;
    for (var i = 0; i < nnodes; i++) {
        child = views[0].children[i];
        if (child.nodeName === "perspective") {
            var perspective = {
                id: this.reader.getString(child, "id", 1),
                near: this.reader.getFloat(child, "near", 1),
                far: this.reader.getFloat(child, "far", 1),
                angle: this.reader.getFloat(child, "angle", 1),
                from:  [],
                to:  []
            };
            var childNodes = child.children.length;
            if (childNodes < 2)
                return "wrong number of perspective " + perspective.id + "children";

            var childSon;
            for (var k = 0; k < childNodes; k++) {
                childSon = child.children[k];
                if (childSon.nodeName !== "from" && childSon.nodeName !== "to") {
                    return "invalid perspective " + perspective.id + " son ";
                }
                perspective[childSon.nodeName] = {
                    x: this.reader.getFloat(childSon, "x", 1),
                    y: this.reader.getFloat(childSon, "y", 1),
                    z: this.reader.getFloat(childSon, "z", 1),
                }
            }
        }
        this.perspectives.push(perspective);
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
}


MySceneGraph.prototype.parserTransformations = function(rootElement) {
  var transformations = rootElement.getElementsByTagName('textures');

  if (transformations == null || transformations.length == 0) {
      return "'textures' are missing";
  }
  var nnodes = transformations[0].children.length;
  if (nnodes < 1) {
      return "no transformations";
  }

  var child;

  for(var i = 0; i < nnodes; i++)
  {
    
  }

}
/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};
