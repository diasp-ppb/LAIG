/**
 * Class that represents animations tag in xml (it's basically just an array, but it helps with debugging)
 * @param arrayAnimations array of animations (object of class xmlAnim)
 */
function xmlAnimations(arrayAnimations) {
	this.animations = arrayAnimations.slice(0);
	//set active animation
	this.activeAnimation = this.animations[0];
	//set start position
	this.objectPosition = [0, 0, 0];
}

/**
 * Updates the animations based on time passed
 * @param currTime The current time in milliseconds
 */
xmlAnimations.prototype.update = function(currTime) {
	this.activeAnimation.update(currTime);
	//TODO move to next animation if activeAnimation.done === true;
};

/**
 * Checks if there are multiple objects with the same id
 */
xmlAnimations.prototype.checkDoubleId = function() {
	for (var i = 0; i < this.animations.length - 1; i++) {
		for (var j = i + 1; j < this.animations.length; j++) {
			if (this.animations[i].id === this.animations[j].id) {
				return 'Found multiple animations with the same id: ' + this.animations[i].id;
			}
		}
	}
	return null;
};

/**
 * Scan animations array to find match with parameter id and return it
 * @param id Id to match with
 * @return Clone of matched element. False otherwise
 */
xmlAnimations.prototype.findById = function(id) {
	//percorrer o array
	for (var i = 0; i < this.animations.length; i++) {
		//match id
		if (this.animations[i].id === id) {
			return this.animations[i].clone();
		}
	}
	return false;
};

/**
 * Outputs every attr to the console
 */
xmlAnimations.prototype.consoleDebug = function() {
	console.log("--- START ANIMATIONS DEBUGGING ---");
	console.log("Animations[" + this.animations.length + "]:");
	for (var i = 0; i < this.animations.length; i++) {
		this.animations[i].consoleDebug();
	}
	console.log("--- FINISH ANIMATIONS BUGGING ---");
};

/**
 * Abstract Class that represents an animation
 * @param id ID
 * @param span Span of the animation
 * @param type Linear or Circular
 * @param linearVel Linear velocity
 */
function xmlAnim(id, span, type, linearVel) {
	this.id = id;
	this.span = span;
	this.type = type;
	this.linearVel = linearVel;
	//time of last update
	this.lastTime = 0;
}

/**
 * Outputs every attr to the console
 */
xmlAnim.prototype.consoleDebug = function() {
	console.log("--- START ANIM DEBUGGING ---");
	console.log("Id: " + this.id);
	console.log("Span: " + this.span);
	console.log("Type: " + this.type);
	console.log("linearVel: " + this.linearVel);
};

/**
 * Class that represents a linear animation
 * @param id ID
 * @param span Span of the animation
 * @param type Linear or Circular
 * @param arrayControlPoints 2D array with control points
 */
function xmlLinearAnim(id, span, type, arrayControlPoints) {
	//initialize linear vel (units/second)
	var linearVel = 0;
	//go through all control points to find linearVel value
	for (var i = 0; i < this.controlPoints - 1; i++) {
		var point1 = this.controlPoints[i];
		var point2 = this.controlPoints[i + 1];
		// d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)
		var distance = Math.sqrt(
			(point2[0] - point1[0]) * (point2[0] - point1[0]) +
			(point2[1] - point1[1]) * (point2[1] - point1[1]) +
			(point2[2] - point1[2]) * (point2[2] - point1[2]));
		//update linear vel
		linearVel += distance;
	}
	//call to super constructor
	xmlAnim.call(this, id, span, type, linearVel);
	//set control points
	this.controlPoints = arrayControlPoints.slice(0);
	//set current position inside the trajectory
	this.currentPosition = this.controlPoints[0];
}
xmlLinearAnim.prototype = Object.create(xmlAnim.prototype);

/**
 * Updates animation based on time passed
 * @param currTime The current time in milliseconds
 */
xmlLinearAnim.prototype.update = function(currTime) {
	//if it's the first update since program started
	if (this.lastTime === 0) {
		//set last time
		this.lastTime = currTime;
	} else {
		//get how much time passed since last update
		var timePassed = this.lastTime - currTime;
		//update lastTime
		this.lastTime = currTime;
		//get position increment
		var posInc = this.linearVel * timePassed;
	}
};

/**
 * Clones this Object
 * @return Cloned Object
 */
xmlLinearAnim.prototype.clone = function() {
	return new xmlLinearAnim(this.id, this.span, this.type, this.controlPoints);
};

/**
 * Outputs every attr to the console
 */
xmlLinearAnim.prototype.consoleDebug = function() {
	xmlAnim.prototype.consoleDebug.call(this);
	var ss; //string variable that helps avoiding the console.log newline
	console.log("--- START CONTROL POINTS DEBUGGING ---");
	for (var i = 0; i < this.controlPoints.length; i++) {
		ss = "Point" + i + "[" + this.controlPoints[i].length + "]:";
		for (var j = 0; j < this.controlPoints[i].length; j++) {
			ss += " " + this.controlPoints[i][j];
		}
		console.log(ss);
	}
	console.log("--- FINISH CONTROL POINTS DEBUGGING ---");
	console.log("--- FINISH ANIM DEBUGGING ---");
};

/**
 * Class that represents a circular animation
 * @param id ID
 * @param span Span of the animation
 * @param type Linear or Circular
 * @param centerPoint Coordinates for center
 * @param radius radius
 * @param startang Starting angle (in degree!)
 * @param rotang Rotating angle (in degree!)
 */
function xmlCircularAnim(id, span, type, centerPoint, radius, startang, rotang) {
	//TODO calcular vel linear
	var linearVel = 0;
	//TODO calcular vel angular
	var angVel = 0;
	xmlAnim.call(this, id, span, type, linearVel);
	this.center = centerPoint.slice(0);
	this.radius = radius;
	this.startang = startang;
	this.rotang = rotang;
}
xmlCircularAnim.prototype = Object.create(xmlAnim.prototype);

/**
 * Clones this Object
 * @return Cloned Object
 */
xmlCircularAnim.prototype.clone = function() {
	return new xmlCircularAnim(this.id, this.span, this.type, this.center, this.radius, this.startang, this.rotang);
};

/**
 * Outputs every attr to the console
 */
xmlCircularAnim.prototype.consoleDebug = function() {
	xmlAnim.prototype.consoleDebug.call(this);
	var ss; //string variable that helps avoiding the console.log newline
	ss = "Center[" + this.center.length + "]:";
	for (var i = 0; i < this.center.length; i++) {
		ss += " " + this.center[i];
	}
	console.log(ss);
	console.log("Radius: " + this.radius);
	console.log("StartAng: " + this.startang);
	console.log("RotAng: " + this.rotang);
	console.log("--- FINISH ANIM DEBUGGING ---");
};
