/**
 * Class that represents a perspective animation
 * @param id ID
 * @param span Span of the animation
 * @param type 'perspectie'
 * @param clock TRUE if animation is clock-wise, FALSE otherwise
 * @param persp1 xmlPerspective Object
 * @param persp2 xmlPerspective Object
 */
function perspectiveAnimation(id, span, type, clock, persp1, persp2) {
	this.id = id;
	this.span = span;
	this.type = type;
	this.clock = clock;
	this.persp1 = persp1;
	this.persp2 = persp2;
	this.currPersp = persp1.clone();

	// current angle and rotationa angle (in degree!)
	this.startang = -1 * Math.atan2(this.persp1.from[2], this.persp1.from[0]) * 180 / Math.PI;

	if (clock === false) {
		this.rotang = 180;
	} else {
		this.rotang = -180;
	}

	// distance between the perspectives
	// d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2)
	var distance = Math.sqrt(
		(this.persp2.from[0] - this.persp1.from[0]) * (this.persp2.from[0] - this.persp1.from[0]) +
		(this.persp2.from[1] - this.persp1.from[1]) * (this.persp2.from[1] - this.persp1.from[1]) +
		(this.persp2.from[2] - this.persp1.from[2]) * (this.persp2.from[2] - this.persp1.from[2]));

	// animation radius (assumes board is in the middle of both perspectives)
	var radius = distance / 2;

	// animation center
	// midpoint = [(x1 + x2) / 2 , (y1 + y2) / 2, (z1 + z2) / 2]
	var center = [(this.persp1.from[0] + this.persp2.from[0]) / 2,
		(this.persp1.from[1] + this.persp2.from[1]) / 2,
		(this.persp1.from[2] + this.persp2.from[2]) / 2
	];

	this.center = center.slice(0);

	// set animation
	this.animation = new xmlCircularAnim(null, this.span, this.type, center, radius, this.startang, this.rotang);
}

/**
 * Updates animation based on time passed
 * @param currTime The current time in milliseconds
 * @return TRUE if animation is over, FALSE otherwise
 */
perspectiveAnimation.prototype.update = function(currTime) {
	if (this.animation.done === false) {
		// update animation
		this.animation.update(currTime);

		// update current perspective
		//var perspFrom = [0, 0, 0];
		//this.animation.getAbsolutePos(perspFrom);

		var animPosition = this.animation.position.slice(0);
		this.currPersp.from[0] = animPosition[0] + this.center[0];
		this.currPersp.from[1] = animPosition[1] + this.center[1];
		this.currPersp.from[2] = animPosition[2] + this.center[2];

		//this.currPersp.from[0] = perspFrom[0];
		//this.currPersp.from[1] = perspFrom[1];
		//this.currPersp.from[2] = perspFrom[2];
	}
};

/**
 * Applies camera changes
 * @param scene Scene
 */
perspectiveAnimation.prototype.apply = function(scene) {

	scene.allowMoveCamera = this.animation.done;
	scene.setCamera(this.currPersp);
};

/**
 * Outputs every attr to the console
 */
perspectiveAnimation.prototype.consoleDebug = function() {
	console.log("--- START PerspectiveAnimation DEBUGGING ---");
	console.log("Id: " + this.id);
	console.log("Span: " + this.span);
	console.log("Type: " + this.type);
	console.log("Clock: " + this.clock);
	console.log("Start Angle: " + this.startang);
	console.log("Rotation Angle: " + this.rotang);
	console.log("Perspective 1:");
	this.persp1.consoleDebug();
	console.log("Perspective 2:");
	this.persp2.consoleDebug();
	console.log("--- FINISH PerspectiveAnimation DEBUGGING ---");
};
