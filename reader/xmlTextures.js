/**
 * Class that represents textures tag in xml (it's basically just an array, but it helps with debugging)
 * @param arrayTextures array of textures
 */
function xmlTextures(arrayTextures) {
    this.textures = arrayTextures.slice(0);
}

/**
 * Outputs every attr to the console
 */
xmlTextures.prototype.consoleDebug = function() {
    console.log("--- START TEXTURES DEBUGGING ---");
    console.log("Textures[" + this.textures.length + "]:");
    for (var i = 0; i < this.textures.length; i++) {
        this.textures[i].consoleDebug();
    }
    console.log("--- FINISH TEXTURES BUGGING ---");
};

/**
 * Checks if there are multiple objects with the same id
 */
xmlTextures.prototype.checkDoubleId = function() {
    for (var i = 0; i < this.textures.length - 1; i++) {
        for (var j = i + 1; j < this.textures.length; j++) {
            if (this.textures[i].id === this.textures[j].id) {
                return 'Found multiple textures with the same id: ' + this.textures[i].id;
              }
        }
    }
    return null;
};

/**
 * Scan textures array to find match with parameter id and return it
 * @param id Id to match with
 * @return Matched element. False otherwise
 */
xmlTextures.prototype.findById = function(id) {
    if (id === 'inherit' || id === 'none') {
        return new xmlText(id, '', 0, 0);
    }
    //percorrer o array
    for (var i = 0; i < this.textures.length; i++) {
        //match id
        if (this.textures[i].id === id) {
            return this.textures[i];
        }
    }
    return false;
};

/**
 * Class that represents a single texture
 * @param id ID of the texture
 * @param file
 * @param length_s
 * @param length_t
 */
function xmlText(id, file, length_s, length_t) {
    this.id = id;
    this.file = file;
    this.length_s = length_s;
    this.length_t = length_t;
    //CGFTexture object. (Doen't start as null, cause reasons)
    this.texture = 'empty';
}

/**
 * Outputs every attr to the console
 */
xmlText.prototype.consoleDebug = function() {
    console.log("--- START TEXT DEBUGGING ---");
    console.log("Id: " + this.id);
    console.log("File: " + this.file);
    console.log("Length_s: " + this.length_s);
    console.log("Length_t: " + this.length_t);
    console.log("--- FINISH TEXT DEBUGGING ---");
};

/**
 * Loads the texture and returns the object
 * @param scene Scene
 * @param fatherTexture xmlText object
 */
xmlText.prototype.load = function(scene, fatherTexture) {
    //this makes sure the texture is only loaded once
    if (this.texture === 'empty') {
        //in case id is null or inherit
        if (this.id === 'none') {
            this.texture = null;
        } else if (this.id === 'inherit' ) {
            this.id = fatherTexture.id;
            this.file = fatherTexture.file;
            this.length_t = fatherTexture.length_t;
            this.length_s = fatherTexture.length_s;
            this.texture = fatherTexture.texture;
        } else {
            this.texture = new CGFtexture(scene, this.file);
        }
    }
};
