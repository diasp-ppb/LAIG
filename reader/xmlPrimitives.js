/**
 * Class that represents primitives tag in xml (it's basically a struct with 5 arrays)
 * @param arrayRect array containing rectangles
 * @param arrayTri
 * @param arrayCil
 * @param arraySph
 * @param arrayTor
 */
function xmlPrimitives(arrayRect, arrayTri, arrayCyl, arraySph, arrayTor,arrayPlane,arraySurf) {
    this.rect = arrayRect.slice(0);
    this.tri = arrayTri.slice(0);
    this.cyl = arrayCyl.slice(0);
    this.sph = arraySph.slice(0);
    this.tor = arrayTor.slice(0);
    this.plane = arrayPlane.slice(0);
    this.surfaces = arraySurf.slice(0);
};

/**
 * Checks if there are multiple objects with the same id
 */
xmlPrimitives.prototype.checkDoubleId = function() {
    for (var i = 0; i < this.rect.length; i++) {
        for (var j = i + 1; j < this.rect.length; j++)
            if (this.rect[i].id === this.rect[j].id)
                return 'Found multiple primitives with the same id: ' + this.rect[i].id;
        for (var j = 0; j < this.tri.length; j++)
            if (this.rect[i].id === this.tri[j].id)
                return 'Found multiple primitives with the same id: ' + this.rect[i].id;
        for (var j = 0; j < this.cyl.length; j++)
            if (this.rect[i].id === this.cyl[j].id)
                return 'Found multiple primitives with the same id: ' + this.rect[i].id;
        for (var j = 0; j < this.sph.length; j++)
            if (this.rect[i].id === this.sph[j].id)
                return 'Found multiple primitives with the same id: ' + this.rect[i].id;
        for (var j = 0; j < this.tor.length; j++)
            if (this.rect[i].id === this.tor[j].id)
                return 'Found multiple primitives with the same id: ' + this.rect[i].id;
    }
    for (var i = 0; i < this.tri.length; i++) {
        for (var j = i + 1; j < this.tri.length; j++)
            if (this.tri[i].id === this.tri[j].id)
                return 'Found multiple primitives with the same id: ' + this.tri[i].id;
        for (var j = 0; j < this.rect.length; j++)
            if (this.tri[i].id === this.rect[j].id)
                return 'Found multiple primitives with the same id: ' + this.tri[i].id;
        for (var j = 0; j < this.cyl.length; j++)
            if (this.tri[i].id === this.cyl[j].id)
                return 'Found multiple primitives with the same id: ' + this.tri[i].id;
        for (var j = 0; j < this.sph.length; j++)
            if (this.tri[i].id === this.sph[j].id)
                return 'Found multiple primitives with the same id: ' + this.tri[i].id;
        for (var j = 0; j < this.tor.length; j++)
            if (this.tri[i].id === this.tor[j].id)
                return 'Found multiple primitives with the same id: ' + this.tri[i].id;
    }
    for (var i = 0; i < this.cyl.length; i++) {
        for (var j = i + 1; j < this.cyl.length; j++)
            if (this.cyl[i].id === this.cyl[j].id)
                return 'Found multiple primitives with the same id: ' + this.cyl[i].id;
        for (var j = 0; j < this.rect.length; j++)
            if (this.cyl[i].id === this.rect[j].id)
                return 'Found multiple primitives with the same id: ' + this.cyl[i].id;
        for (var j = 0; j < this.tri.length; j++)
            if (this.cyl[i].id === this.tri[j].id)
                return 'Found multiple primitives with the same id: ' + this.cyl[i].id;
        for (var j = 0; j < this.sph.length; j++)
            if (this.cyl[i].id === this.sph[j].id)
                return 'Found multiple primitives with the same id: ' + this.cyl[i].id;
        for (var j = 0; j < this.tor.length; j++)
            if (this.cyl[i].id === this.tor[j].id)
                return 'Found multiple primitives with the same id: ' + this.cyl[i].id;
    }
    for (var i = 0; i < this.sph.length; i++) {
        for (var j = i + 1; j < this.sph.length; j++)
            if (this.sph[i].id === this.sph[j].id)
                return 'Found multiple primitives with the same id: ' + this.sph[i].id;
        for (var j = 0; j < this.rect.length; j++)
            if (this.sph[i].id === this.rect[j].id)
                return 'Found multiple primitives with the same id: ' + this.sph[i].id;
        for (var j = 0; j < this.tri.length; j++)
            if (this.sph[i].id === this.tri[j].id)
                return 'Found multiple primitives with the same id: ' + this.sph[i].id;
        for (var j = 0; j < this.cyl.length; j++)
            if (this.sph[i].id === this.cyl[j].id)
                return 'Found multiple primitives with the same id: ' + this.sph[i].id;
        for (var j = 0; j < this.tor.length; j++)
            if (this.sph[i].id === this.tor[j].id)
                return 'Found multiple primitives with the same id: ' + this.sph[i].id;
    }
    for (var i = 0; i < this.tor.length; i++) {
        for (var j = i + 1; j < this.tor.length; j++)
            if (this.tor[i].id === this.tor[j].id)
                return 'Found multiple primitives with the same id: ' + this.tor[i].id;
        for (var j = 0; j < this.rect.length; j++)
            if (this.tor[i].id === this.rect[j].id)
                return 'Found multiple primitives with the same id: ' + this.tor[i].id;
        for (var j = 0; j < this.tri.length; j++)
            if (this.tor[i].id === this.tri[j].id)
                return 'Found multiple primitives with the same id: ' + this.tor[i].id;
        for (var j = 0; j < this.cyl.length; j++)
            if (this.tor[i].id === this.cyl[j].id)
                return 'Found multiple primitives with the same id: ' + this.tor[i].id;
        for (var j = 0; j < this.sph.length; j++)
            if (this.tor[i].id === this.sph[j].id)
                return 'Found multiple primitives with the same id: ' + this.tor[i].id;
    }
    return null;
};

/**
 * Outputs every attr to the console
 */
xmlPrimitives.prototype.consoleDebug = function() {
    console.log("--- START PRIMITIVES DEBUGGING ---");
    console.log("Rect[" + this.rect.length + "]:");
    for (var i = 0; i < this.rect.length; i++) {
        this.rect[i].consoleDebug();
    }
    console.log("Tri[" + this.tri.length + "]:");
    for (var i = 0; i < this.tri.length; i++) {
        this.tri[i].consoleDebug();
    }
    console.log("Cyl[" + this.cyl.length + "]:");
    for (var i = 0; i < this.cyl.length; i++) {
        this.cyl[i].consoleDebug();
    }
    console.log("Sph[" + this.sph.length + "]:");
    for (var i = 0; i < this.sph.length; i++) {
        this.sph[i].consoleDebug();
    }
    console.log("Tor[" + this.tor.length + "]:");
    for (var i = 0; i < this.tor.length; i++) {
        this.tor[i].consoleDebug();
    }
    console.log("--- FINISH PRIMITIVES DEBUGGING ---");
};

/**
 * Scan rect array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findRectById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.rect.length; i++) {
        //match id
        if (this.rect[i].id === id) {
            return this.rect[i];
        }
    }
    return false;
}

/**
 * Scan tri array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findTriById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.tri.length; i++) {
        //match id
        if (this.tri[i].id === id) {
            return this.tri[i];
        }
    }
    return false;
}

/**
 * Scan cyl array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findCylById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.cyl.length; i++) {
        //match id
        if (this.cyl[i].id === id) {
            return this.cyl[i];
        }
    }
    return false;
}

/**
 * Scan sph array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findSphById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.sph.length; i++) {
        //match id
        if (this.sph[i].id === id) {
            return this.sph[i];
        }
    }
    return false;
}

/**
 * Scan tor array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findTorById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.tor.length; i++) {
        //match id
        if (this.tor[i].id === id) {
            return this.tor[i];
        }
    }
    return false;
}

/**
 * Scan plane array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findPlaneById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.plane.length; i++) {
        //match id
        if (this.plane[i].id === id) {
            return this.plane[i];
        }
    }
    return false;
}

/**
 * Scan patch array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlPrimitives.prototype.findPatchById = function(id) {
    //percorrer o array
    for (var i = 0; i < this.patch.length; i++) {
        //match id
        if (this.patch[i].id === id) {
            return this.patch[i];
        }
    }
    return false;
}

xmlPrimitives.prototype.findById = function(id) {
    var found = this.findRectById(id);
    if (false == found)
        found = this.findTriById(id);
    if (false == found)
        found = this.findCylById(id);
    if (false == found)
        found = this.findSphById(id);
    if (false == found)
        found = this.findTorById(id);
    if (false == found)
        found = this.findPlaneById(id);
    if (false == found)
        found = this.findPatchById(id);

    return found;
}

xmlPrimitives.prototype.display = function(scene, texture) {
    var n = this.rect.length;

    var xml;
    for (var i = 0; i < n; i++) {

        //create rect
        xml = this.rect[i];
        var rec = new Rectangle(scene, xml.point1, xml.point2);
        rec.setTexturaRatio(texture.length_s, texture.length_t);
        rec.display(scene);
        //display rect
    }

    n = this.tri.length;

    for (var i = 0; i < n; i++) {
        //create
        xml = this.tri[i];
        var tri = new Triangle(scene, xml.point1, xml.point2, xml.point3);
        tri.setTexturaRatio(texture.length_s, texture.length_t);
        //display
        tri.display(scene);
    }

    n = this.cyl.length;

    for (var i = 0; i < n; i++) {
        //create
        xml = this.cyl[i];

        var cyl = new Cylinder(scene, xml.slices, xml.stacks, xml.base, xml.top, xml.height);
        //display
        cyl.display(scene);
    }


    n = this.sph.length;

    for (var i = 0; i < n; i++) {
        //create
        xml = this.sph[i];

        var sph = new Sphere(scene, xml.slices, xml.stacks, xml.radius);
        //display
        sph.display(scene);
    }


    n = this.tor.length;

    for (var i = 0; i < n; i++) {
        //create(scene, inner, outer, slices, loops)
        xml = this.tor[i];
        var tor = new Torus(scene, xml.inner, xml.outer, xml.slices, xml.loops);
        //display
        tor.display(scene);
    }

   n = this.plane.length;

   for(var i = 0; i < n; i ++) {
       xml = this.plane[i];
       var plane = new Plane(scene, xml.dimX, xml.dimY. xml.partsX,xml.partsY);
       plane.display();
   }

   n = this.patch.length;

   for(var i = 0; i < n; i ++) {
       xml = this.patch[i];
       var plane = new Patch(scene, xml.orderU,xml.orderV, xml.partsU, xml.partsV, xml.controlPoints)
       plane.display();
   }

}

/**
 * Class that represents a rectangle primitive
 * @param id ID of the rectangle
 * @param poin1 Array of 2 coordinates x, y
 * @param poin2 Array of 2 coordinates x, y
 */
function xmlRectangle(id, point1, point2) {
    this.id = id;
    this.point1 = point1.slice(0);
    this.point2 = point2.slice(0);
};

/**
 * Outputs every attr to the console
 */
xmlRectangle.prototype.consoleDebug = function() {
    console.log("--- START RECTANGLE DEBUGGING ---");
    console.log("Id: " + this.id);
    var ss; //string variable that helps avoiding the console.log newline
    ss = "Point1[" + this.point1.length + "]:";
    for (var i = 0; i < this.point1.length; i++) {
        ss += " " + this.point1[i];
    }
    console.log(ss);
    ss = "Point2[" + this.point2.length + "]:";
    for (var i = 0; i < this.point2.length; i++) {
        ss += " " + this.point2[i];
    }
    console.log(ss);
    console.log("--- FINISH RECTANGLE DEBUGGING ---");
};

/**
 * Class that represents a triangle primitive
 * @param id ID of the rectangle
 * @param poin1 Array of 3 coordinates x, y, z
 * @param poin2 Array of 3 coordinates x, y, z
 * @param poin3 Array of 3 coordinates x, y, z
 */
function xmlTriangle(id, point1, point2, point3) {
    this.id = id;
    this.point1 = point1.slice(0);
    this.point2 = point2.slice(0);
    this.point3 = point3.slice(0);
};

/**
 * Outputs every attr to the console
 */
xmlTriangle.prototype.consoleDebug = function() {
    console.log("--- START TRIANGLE DEBUGGING ---");
    console.log("Id: " + this.id);
    var ss; //string variable that helps avoiding the console.log newline
    ss = "Point1[" + this.point1.length + "]:";
    for (var i = 0; i < this.point1.length; i++) {
        ss += " " + this.point1[i];
    }
    console.log(ss);
    ss = "Point2[" + this.point2.length + "]:";
    for (var i = 0; i < this.point2.length; i++) {
        ss += " " + this.point2[i];
    }
    console.log(ss);
    ss = "Point3[" + this.point3.length + "]:";
    for (var i = 0; i < this.point3.length; i++) {
        ss += " " + this.point3[i];
    }
    console.log(ss);
    console.log("--- FINISH TRIANGLE DEBUGGING ---");
};

/**
 * Class that represents a cylinder primitive
 * @param id ID of the rectangle
 * @param base
 * @param top
 * @param height
 * @param slices
 * @param stacks
 */
function xmlCylinder(id, base, top, height, slices, stacks) {
    this.id = id;
    this.base = base;
    this.top = top;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;
};

/**
 * Outputs every attr to the console
 */
xmlCylinder.prototype.consoleDebug = function() {
    console.log("--- START CYLINDER DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("Base: " + this.base);
    console.log("Top: " + this.top);
    console.log("Height: " + this.height);
    console.log("Slices: " + this.slices);
    console.log("Stacks: " + this.stacks);
    console.log("--- FINISH CYLINDER DEBUGGING ---");
};

/**
 * Class that represents a sphere primitive
 * @param id ID of the rectangle
 * @param radius
 * @param slices
 * @param stacks
 */
function xmlSphere(id, radius, slices, stacks) {
    this.id = id;
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
};

/**
 * Outputs every attr to the console
 */
xmlSphere.prototype.consoleDebug = function() {
    console.log("--- START SPHERE DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("Radius: " + this.radius);
    console.log("Slices: " + this.slices);
    console.log("Stacks: " + this.stacks);
    console.log("--- FINISH SPHERE DEBUGGING ---");
};

/**
 * Class that represents a torus primitive
 * @param id ID of the rectangle
 * @param inner
 * @param outer
 * @param slices
 * @param loops
 */
function xmlTorus(id, inner, outer, slices, loops) {
    this.id = id;
    this.inner = inner;
    this.outer = outer;
    this.slices = slices;
    this.loops = loops;
};

/**
 * Outputs every attr to the console
 */
xmlTorus.prototype.consoleDebug = function() {
    console.log("--- START TORUS DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("Inner: " + this.inner);
    console.log("Outer: " + this.outer);
    console.log("Slices: " + this.slices);
    console.log("Loops: " + this.loops);
    console.log("--- FINISH TORUS DEBUGGING ---");
};
/**
 * Class that represents a patch primitive
 * @param id ID of the rectangle
 * @param orderU
 * @param orderV
 * @param partsU
 * @param partsV
 * @param controlPoints
 */

function xmlPatch(id,orderU,orderV,partsU,partsV, controlPoints){
  this.id = id;
  this.orderU = orderU;
  this.orderV = orderV;
  this.partsU = partsU;
  this.partsV = partsV;
  this.controlPoints = controlPoints;
}

/**
 * Class that represents a patch primitive
 * @param id ID of the rectangle
 * @param dimX
 * @param dimY
 * @param partsX
 * @param partsY
 */
function xmlPlane(id, dimX,dimY,partsX,partsY){
  this.id = id;
  this.dimX = dimX;
  this.dimY = dimY;
  this.partsX = partsX;
  this.partsY = partsY;
}
