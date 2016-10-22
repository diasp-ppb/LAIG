/**
 * Class that represents lights tag in xml (it's basically a struct with two arrays)
 * @param arrayOmni Array containing Omni Lights
 * @param arraySpot Array containing Spot Lights
 */
function xmlLights(arrayOmni, arraySpot) {
    this.omni = arrayOmni.slice(0);
    this.spot = arraySpot.slice(0);
}

/**
 * Checks if there are multiple objects with the same id
 */
xmlLights.prototype.checkDoubleId = function() {
    //check omni
    for (var i = 0; i < this.omni.length - 1; i++) {
        //vs omni
        for (var j = i + 1; j < this.omni.length; j++) {
            if (this.omni[i].id === this.omni[j].id) {
                return 'Found multiple lights with the same id: ' + this.omni[i].id;
            }
        }
        //vs spot
        for (var j = 0; j < this.spot.length; j++) {
            if (this.omni[i].id === this.spot[j].id) {
                return 'Found multiple lights with the same id: ' + this.omni[i].id;
            }
        }
    }
    //check spot
    for (var i = 0; i < this.spot.length - 1; i++) {
        //vs spot
        for (var j = i + 1; j < this.spot.length; j++) {
            if (this.spot[i].id === this.spot[j].id) {
                return 'Found multiple lights with the same id: ' + this.spot[i].id;
            }
        }
        //vs omni
        for (var j = 0; j < this.omni.length; j++) {
            if (this.spot[i].id === this.omni[j].id) {
                return 'Found multiple lights with the same id: ' + this.spot[i].id;
            }
        }
    }
    return null;
};

/**
 * Outputs every attr to the console
 */
xmlLights.prototype.consoleDebug = function() {
    console.log("--- START LIGHTS DEBUGGING ---");
    console.log("Omni[" + this.omni.length + "]:");
    for (var i = 0; i < this.omni.length; i++) {
        this.omni[i].consoleDebug();
    }
    console.log("Spot[" + this.spot.length + "]:");
    for (var i = 0; i < this.spot.length; i++) {
        this.spot[i].consoleDebug();
    }
    console.log("--- FINISH LIGHTS DEBUGGING ---");
};

/**
 * Class that represents an Omni Light
 * @param id
 * @param enabled
 * @param location
 * @param ambient
 * @param diffuse
 * @param specular
 */
function xmlLightOmni(id, enabled, location, ambient, diffuse, specular) {
    this.id = id;
    this.enabled = enabled;
    this.location = location.slice(0);
    this.ambient = ambient.slice(0);
    this.diffuse = diffuse.slice(0);
    this.specular = specular.slice(0);
}

/**
 * Outputs every attr to the console
 */
xmlLightOmni.prototype.consoleDebug = function() {
    console.log("--- START OMNI DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("Enabled: " + this.enabled);
    var ss; //string variable that helps avoiding the console.log newline
    ss = "Location[" + this.location.length + "]:";
    for (var i = 0; i < this.location.length; i++) {
        ss += " " + this.location[i];
    }
    console.log(ss);
    ss = "Ambient[" + this.ambient.length + "]:";
    for (var i = 0; i < this.ambient.length; i++) {
        ss += " " + this.ambient[i];
    }
    console.log(ss);
    ss = "Diffuse[" + this.diffuse.length + "]:";
    for (var i = 0; i < this.diffuse.length; i++) {
        ss += " " + this.diffuse[i];
    }
    console.log(ss);
    ss = "Specular[" + this.specular.length + "]:";
    for (var i = 0; i < this.specular.length; i++) {
        ss += " " + this.specular[i];
    }
    console.log(ss);
    console.log("--- FINISH OMNI DEBUGGING ---");
};

/**
 * Class that represents a Spot Light
 * @param id
 * @param enabled
 * @param angle
 * @param exponent
 * @param target
 * @param location
 * @param ambient
 * @param diffuse
 * @param specular
 */
function xmlLightSpot(id, enabled, angle, exponent, target, location, ambient, diffuse, specular) {
    this.id = id;
    this.enabled = enabled;
    this.angle = angle;
    this.exponent = exponent;
    this.target = target.slice(0);
    this.location = location.slice(0);
    this.ambient = ambient.slice(0);
    this.diffuse = diffuse.slice(0);
    this.specular = specular.slice(0);
}

/**
 * Outputs every attr to the console
 */
xmlLightSpot.prototype.consoleDebug = function() {
    console.log("--- START SPOT DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("Enabled: " + this.enabled);
    console.log("Angle: " + this.angle);
    console.log("Exponent: " + this.exponent);
    var ss; //string variable that helps avoiding the console.log newline
    ss = "Target[" + this.target.length + "]:";
    for (var i = 0; i < this.target.length; i++) {
        ss += " " + this.target[i];
    }
    console.log(ss);
    ss = "Location[" + this.location.length + "]:";
    for (var i = 0; i < this.location.length; i++) {
        ss += " " + this.location[i];
    }
    console.log(ss);
    ss = "Ambient[" + this.ambient.length + "]:";
    for (var i = 0; i < this.ambient.length; i++) {
        ss += " " + this.ambient[i];
    }
    console.log(ss);
    ss = "Diffuse[" + this.diffuse.length + "]:";
    for (var i = 0; i < this.diffuse.length; i++) {
        ss += " " + this.diffuse[i];
    }
    console.log(ss);
    ss = "Specular[" + this.specular.length + "]:";
    for (var i = 0; i < this.specular.length; i++) {
        ss += " " + this.specular[i];
    }
    console.log(ss);
    console.log("--- FINISH SPOT DEBUGGING ---");
};
