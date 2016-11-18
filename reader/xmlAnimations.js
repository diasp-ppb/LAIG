/**
 *	Class that represents a parameterized line segment between two points in space
 * @param pointA Initial point of line segment (array of 3 coords)
 * @param pointB Final point of line segment (array of 3 coords)
 * @param linearVel Linear Velocity (units / milliseconds)
 */
function lineSegment(pointA, pointB, linearVel) {
	this.pointA = pointA.slice(0);
	this.pointB = pointB.slice(0);
	//vector director
	this.vector = [pointB[0] - pointA[0], pointB[1] - pointA[1], pointB[2] - pointA[2]];
	// d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)
	this.distance = Math.sqrt(
		(pointB[0] - pointA[0]) * (pointB[0] - pointA[0]) +
		(pointB[1] - pointA[1]) * (pointB[1] - pointA[1]) +
		(pointB[2] - pointA[2]) * (pointB[2] - pointA[2]));
	// linear velocity
	this.linearVel = linearVel;
	// how long this lineSegment takes to go through (in milliseconds)
	this.totalDuration = this.distance / this.linearVel;
	// how long this segment has been active for (in milliseconds)
	this.activeDuration = 0;
}

/**
 *	Calculates and returns the angle (in radians!) between the vector of this line and axis Oz
 * @return angle (in radians!) between the vectors (ignoring Y coordinate)
 */
lineSegment.prototype.getAngle = function() {

	// don't even ask how this works. After multiple attempts it finally does! #trigonometry
	var angle = Math.atan2(this.vector[0], this.vector[2]);

	return angle;
};

/**
 * Calculates new position given time
 * @param timePassed Time passed since last call
 * @param position Position to update (array of 3 coords)
 * @return Over duration (duration that is left to animate after this segment is done)
 */
lineSegment.prototype.update = function(timePassed, position) {

	// update active duration
	this.activeDuration += timePassed;

	// used as a control value by animation class
	var overtime = this.activeDuration - this.totalDuration;

	// normalize time in order to calculate equation
	var time = this.activeDuration / this.totalDuration;

	// make sure to limit time
	if (time > 1) {
		time = 1;
	}

	// position = pointA + t * vector, 0 >= t >= 1

	// x
	position[0] = this.pointA[0] + time * this.vector[0];
	// y
	position[1] = this.pointA[1] + time * this.vector[1];
	// z
	position[2] = this.pointA[2] + time * this.vector[2];

	return overtime;
};


/** TODO permitir rotaçoes de angulos negativos, para poder andar para tras
 *	Class that represents a parameterized circle (it's only part of a circle, but wtv, let's not get technical)
 * @param span Span of the animation
 * @param centerPoint Coordinates for center
 * @param radius radius
 * @param startang Starting angle (in degree!)
 * @param rotang Rotating angle (in degree!)
 * @param linearVel Linear Velocity (units / milliseconds)
 */
function circle(span, centerPoint, radius, startang, rotang, linearVel) {

	// in milliseconds
	this.span = span * 1000;
	this.center = centerPoint.slice(0);
	this.radius = radius;
	// store in radians!
	this.startang = startang * (Math.PI / 180);
	// store in radians!
	this.rotang = rotang * (Math.PI / 180);
	// store in radians!
	this.finishang = this.startang + this.rotang;
	this.linearVel = linearVel;
	// how long this segment has been active for (in milliseconds)
	this.activeDuration = 0;
}

/** TODO aqui
 *	Calculates and returns the angle (in radians!) between the vector at this instance and axis Oz
 * @param position Position at this instance
 * @return angle (in radians!) between the vectors (ignoring Y coordinate)
 */
circle.prototype.getAngle = function(position) {

	var angle;

	// Don't even ask how this works. It just does.

	if (position[2] <= this.center[2]) {
		angle = Math.acos((position[0] - this.center[0]) / this.radius);
	} else {
		angle = -1 * Math.acos((position[0] - this.center[0]) / this.radius);
	}

	return angle;
};

/**
 * Calculates new position given time
 * @param timePassed Time passed since last call
 * @param position Position to update (array of 3 coords)
 * @return Over duration (duration that is left to animate after this circle is done)
 */
circle.prototype.update = function(timePassed, position) {

	// update active duration
	this.activeDuration += timePassed;

	// used as a control value by animation class
	var overtime = this.activeDuration - this.span;

	// get theta in order to calculate equation
	var theta = this.startang + ((this.activeDuration / this.span) * this.rotang);

	// make sure to limit theta
	if (theta > this.finishang) {
		theta = this.finishang;
	}

	// positionX = centerX + radius * cos(t), 0 >= t, >= PI
	position[0] = this.center[0] + this.radius * Math.cos(theta);

	// positionY - ignore

	// positionZ = centerY + radius * sin(t), 0 >= t, >= PI
	position[2] = this.center[2] + this.radius * Math.sin(theta);

	return overtime;
};

/** TODO ligar as posiçoes de uma animaçao à animaçao seguinte
 * Class that represents animations tag in xml (it's basically just an array, but it helps with debugging)
 * @param arrayAnimations array of animations (object of class xmlAnim)
 */
function xmlAnimations(arrayAnimations) {
	this.animations = arrayAnimations.slice(0);
	// set active animation
	this.activeAnimationIndex = 0;
	if (this.animations.length === 0) {
		this.activeAnimation = null;
	} else {
		this.activeAnimation = this.animations[this.activeAnimationIndex];
	}
	// set start position
	this.objectPosition = [0, 0, 0];
	// true if all animations have finished running
	this.done = false;
}

/**
 * Applies active animation
 * @param scene Scene
 */
xmlAnimations.prototype.apply = function(scene) {
	if (this.activeAnimation !== null) {
		this.activeAnimation.apply(scene);
	}
};

/**
 * Updates the animations based on time passed
 * @param currTime The current time in milliseconds
 */
xmlAnimations.prototype.update = function(currTime) {
	if (this.done === false && this.activeAnimation !== null) {
		var overtime = this.activeAnimation.update(currTime);
		// if overtime >= 0 means active animation is over and need to move to the next animation
		while (overtime >= 0) {
			// index++
			this.activeAnimationIndex++;
			// if last animation is over
			if (this.activeAnimationIndex >= this.animations.length) {
				this.done = true;
				break;
			} else {

				// get current position & origin
				var currentPos = this.activeAnimation.position.slice(0);
				var origin = this.activeAnimation.origin.slice(0);
				// move to the next animation
				this.activeAnimation = this.animations[this.activeAnimationIndex];
				// set position
				this.activeAnimation.lastAnimPos[0] = currentPos[0] - origin[0];
				this.activeAnimation.lastAnimPos[1] = currentPos[1] - origin[1];
				this.activeAnimation.lastAnimPos[2] = currentPos[2] - origin[2];
				// and update it as well
				overtime = this.activeAnimation.update(currTime);
			}
		}
	}
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
 */
function xmlAnim(id, span, type) {
	this.id = id;
	this.span = span;
	this.type = type;
	// time of last update
	this.lastTime = 0;
	// how long this animation has been active for
	this.activeDuration = 0;
	this.lastAnimPos = [0, 0, 0];
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

	// set control points
	this.controlPoints = arrayControlPoints.slice(0);

	//set origin (first point - controlPoints[0])
	this.origin = this.controlPoints[0].slice(0);

	// initialize totalDistance
	var totalDistance = 0;

	// go through all control points to find totalDistance
	for (var i = 0; i < this.controlPoints.length - 1; i++) {
		var pointA = this.controlPoints[i];
		var pointB = this.controlPoints[i + 1];
		// d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)
		var distance = Math.sqrt(
			(pointB[0] - pointA[0]) * (pointB[0] - pointA[0]) +
			(pointB[1] - pointA[1]) * (pointB[1] - pointA[1]) +
			(pointB[2] - pointA[2]) * (pointB[2] - pointA[2]));
		totalDistance += distance;
	}

	// find linear velocity (units / milliseconds)
	this.linearVel = totalDistance / (span * 1000);

	// line segments storage
	this.lineSegments = [];

	// go through all control points and create their line segments
	for (var i = 0; i < this.controlPoints.length - 1; i++) {
		var pointA = this.controlPoints[i];
		var pointB = this.controlPoints[i + 1];
		this.lineSegments.push(new lineSegment(pointA, pointB, this.linearVel));
	}

	// call to super constructor
	xmlAnim.call(this, id, span, type);

	// set current line segment
	this.currentLineSegmentIndex = 0;
	this.currentLineSegment = this.lineSegments[this.currentLineSegmentIndex];

	// set position
	this.position = this.currentLineSegment.pointA.slice(0);

	// set angle in radians (first time it's the angle of first lineSegment with Oz axis)
	this.angle = this.currentLineSegment.getAngle();
}
xmlLinearAnim.prototype = Object.create(xmlAnim.prototype);

/**
 * Updates animation based on time passed
 * @param currTime The current time in milliseconds
 * @return -1 if animation is not over, overtime otherwise
 */
xmlLinearAnim.prototype.update = function(currTime) {

	// if it's the first update since program started
	if (this.lastTime === 0) {
		//set last time
		this.lastTime = currTime;
	}
	// if it's not the first time
	else {
		// get how much time passed since last update (in milliseconds)
		var timePassed = currTime - this.lastTime;
		// update lastTime
		this.lastTime = currTime;
		// update position in line segment
		var overtime = this.currentLineSegment.update(timePassed, this.position);
		// if overtime >= 0 means currentLineSegment is over and need to move to the next overtimeLineSegment
		while (overtime >= 0) {
			// index++
			this.currentLineSegmentIndex++;
			// if last segment is over
			if (this.currentLineSegmentIndex >= this.lineSegments.length) {
				return overtime;
			} else {
				// move to the next line segment
				this.currentLineSegment = this.lineSegments[this.currentLineSegmentIndex];
				// set new angle
				this.angle = this.currentLineSegment.getAngle();
				// and update it as well
				overtime = this.currentLineSegment.update(timePassed, this.position);
			}
		}
		// means this animation isn't over yet
		return -1;
	}
};

/**
 * Applies needed transformations in order to animate
 * @param scene Scene
 */
xmlLinearAnim.prototype.apply = function(scene) {

	// translate

	var xTranslate = this.lastAnimPos[0] + this.position[0] - this.origin[0];
	var yTranslate = this.lastAnimPos[1] + this.position[1] - this.origin[1];
	var zTranslate = this.lastAnimPos[2] + this.position[2] - this.origin[2];
	scene.translate(xTranslate, yTranslate, zTranslate);

	// rotate around Oy axis
	scene.rotate(this.angle, 0, 1, 0);
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

	xmlAnim.call(this, id, span, type);

	this.lastTime = 0;

	this.circle = new circle(span, centerPoint, radius, startang, rotang);

	// set position
	this.position = [0, 0, 0];
	this.circle.update(0, this.position);

	// set origin
	this.origin = this.position.slice(0);

	// set angle in radians
	this.angle = this.circle.getAngle(this.position);
}
xmlCircularAnim.prototype = Object.create(xmlAnim.prototype);

/**
 * Updates animation based on time passed
 * @param currTime The current time in milliseconds
 * @return -1 if animation is not over, overtime otherwise
 */
xmlCircularAnim.prototype.update = function(currTime) {

	// if it's the first update since program started
	if (this.lastTime === 0) {
		//set last time
		this.lastTime = currTime;
	}
	// if it's not the first time
	else {
		// get how much time passed since last update (in milliseconds)
		var timePassed = currTime - this.lastTime;
		// update lastTime
		this.lastTime = currTime;
		// update position in circle
		var overtime = this.circle.update(timePassed, this.position);
		// set new angle
		this.angle = this.circle.getAngle(this.position);
		// if overtime >= 0 means animation is over
		return overtime;
	}
};

/**
 * Applies needed transformations in order to animate
 * @param scene Scene
 */
xmlCircularAnim.prototype.apply = function(scene) {

	// translate
	var xTranslate = this.lastAnimPos[0] + this.position[0] - this.origin[0];
	var yTranslate = this.lastAnimPos[1] + this.position[1] - this.origin[1];
	var zTranslate = this.lastAnimPos[1] + this.position[2] - this.origin[2];
	scene.translate(xTranslate, yTranslate, zTranslate);

	// rotate around Oy axis
	scene.rotate(this.angle, 0, 1, 0);
};

/**
 * Clones this Object
 * @return Cloned Object
 */
xmlCircularAnim.prototype.clone = function() {

	var startang = this.circle.startang * (180 / Math.PI);
	var rotang = this.circle.rotang * (180 / Math.PI);
	return new xmlCircularAnim(this.id, this.span, this.type, this.circle.center, this.circle.radius, startang, rotang);
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
