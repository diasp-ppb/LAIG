/**
 * Class that represents a scene tag in xml
 * @param attrDefault ID for the default perspective
 */
function xmlViews(attrDefault) {
    this.default = attrDefault;
    this.perspectives = [];
    this.currePerspective = 0; //TODO need to be set to defaault
}

/**
 * Checks if there are multiple objects with the same id
 */
xmlViews.prototype.checkDoubleId = function() {
    for (var i = 0; i < this.perspectives.length - 1; i++) {
        for (var j = 0; j < this.perspectives.length; j++) {
            if (this.perspectives[i].id === this.perspectives[j].id)
                return 'Found multiple perspectives with the same id!';
        }
    }
    return null;
};

/**
 * Outputs every attr to the console
 */
xmlViews.prototype.consoleDebug = function() {
    console.log("--- START VIEWS DEBUGGING ---");
    console.log("Default: " + this.default);
    console.log("Current Perspective: " + this.currePerspective);
    console.log("Perspectives[" + this.perspectives.length + "]:");
    for (var i = 0; i < this.perspectives.length; i++) {
        this.perspectives[i].consoleDebug();
    }
    console.log("--- FINISH VIEWS DEBUGGING ---");
};

/**
 * @return next perspective defined in dsx file
 */
xmlViews.prototype.getNextPerspective = function() {
    if (this.currePerspective < this.perspectives.length - 1) {
        this.currePerspective++;
    } else
        this.currePerspective = 0;
    return this.perspectives[this.currePerspective];
};

xmlViews.prototype.getDefaultCamera = function() {
    var length = this.perspectives.length;


    for (var i = 0; i < length; i++) {
        if (this.default == this.perspectives[i].id) {
            return this.perspectives[i];
        }
    }
    return this.perspectives[0]; // TODO alterar depois
};
