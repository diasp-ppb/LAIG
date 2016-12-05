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

  // current angle and rotationa angle (in radians!)
  this.currang = 0;

  if (clock === false) {
    this.rotang = Math.PI;
  } else {
    this.rotang = -1 * Math.PI;
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
		(this.persp1.from[1] - this.persp2.from[1]) / 2,
		(this.persp1.from[2] - this.persp2.from[2]) / 2
	];

	// set animation
	this.animation = new xmlCircularAnim(null, this.span, this.type, center, radius, this.currang, this.rotang);
}

/**
 * Updates animation based on time passed
 * @param currTime The current time in milliseconds
 * @return TRUE if animation is over, FALSE otherwise
 */
perspectiveAnimation.prototype.update = function(currTime) {
	this.animation.update(currTime);
};

/**
 * Applies camera changes
 * @param scene Scene
 */
perspectiveAnimation.prototype.apply = function(scene) {

	// translate
	var perspFrom = [0, 0, 0];
	this.animation.getAbsolutePos(perspFrom);

  // set camera
  scene.camera = new CGFcamera(this.persp1.angle, this.persp1.near, this.persp1.far,
		vec3.fromValues(perspFrom[0], perspFrom[1], perspFrom[2]),
		vec3.fromValues(this.persp1.to[0], this.persp1.to[1], this.persp1.to[2]));

	scene.interface.setActiveCamera(scene.camera);
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
  console.log("Current Angle: " + this.currang);
  console.log("Rotation Angle: " + this.rotang);
  console.log("Perspective 1:");
  this.persp1.consoleDebug();
  console.log("Perspective 2:");
  this.persp2.consoleDebug();
	console.log("--- FINISH PerspectiveAnimation DEBUGGING ---");
};
