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

    /* Stored scene perpectives*/
    this.perspectives = [];

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

MySceneGraph.prototype.parserPrimitives = function(rootElement) {
    var primitives = rootElement.getElementsByTagName('primitives');

    if (primitives == null || primitives.length == 0) {
        return "primitives are missing";
    }

    var nnodes = primitives[0].childen.length;
    if (nnodes <= 0) {
        return "wrong number of basic objects";
    }

    /** TODO */
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

    for (var i = 0; i < nnodes; i++) {
        var child = views[0].children[i];
        if (child.nodeName === "perspective") {
            var perspective = {
                id: child.getAttribute("id"),
                near: child.getAttribute("near"),
                far: child.getAttribute("far"),
                angle: child.getAttribute("angle"),
                from: {},
                to: {}
            };

            var childNodes = child.children.length;
            if (childNodes < 2)
                return "wrong number of perspective " + perspective.id + "children";

            var childSon;
            for (var k = 0; k < childNodes; k++) {
                childSon = child.children[k];
                if (childSon.nodeName !== "from" && childSon.nodeName !== "to") {
                  return "invalid perspective " + perspective.id + " son ";}

                    perspective[childSon.nodeName] = {
                        x: childSon.getAttribute("x"),
                        y: childSon.getAttribute("y"),
                        z: childSon.getAttribute("z")
                    };
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

    for (var i = 0; i < nnodes; i++) {
        var child = ilumi[0].children[i];
        if (child.nodeName === "ambient") {
            this.scene.setAmbient(child.getAttribute("r"), child.getAttribute("g"), child.getAttribute("b"), child.getAttribute("a"));
            // TODO FALTA TESTAR ISTO PRECISO Objectos
        } else if (child.nodeName === "background") {
            this.background = child.getAttribute("r") + child.getAttribute("g") + child.getAttribute("b") + child.getAttribute("a");
        }
    }
};

MySceneGraph.prototype.parserLights = fuction(rootElement) {
  var lights = rootElement.getElementsByTagName('lights');

  if (lights == null ||  lights.length == 0) {
      return "'lights' is missing";
  }

  var nnodes=

}

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};
