function XMLscene(MyInterface) {
  CGFscene.call(this);
  this.interface = MyInterface;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function(application) {
  CGFscene.prototype.init.call(this, application);

  this.initCameras();

  this.initLights();

  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);


    this.axis = new CGFaxis(this);

    this.lightCount = 0;

    this.lightsStatus = [];

};

XMLscene.prototype.initLights = function() {

  this.lights[0].setPosition(2, 3, 3, 1);
  this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
  this.lights[0].update();
};

XMLscene.prototype.initCameras = function() {
  this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function() {
  this.setAmbient(0.2, 0.4, 0.8, 1.0);
  this.setDiffuse(0.2, 0.4, 0.8, 1.0);
  this.setSpecular(0.2, 0.4, 0.8, 1.0);
  this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {

    this.gl.clearColor(this.graph.illumination.background[0], this.graph.illumination.background[1], this.graph.illumination.background[2], this.graph.illumination.background[3]);


  this.setDefaultAxis();
  this.setDefaultCamera();
  this.setDefaultIllumination();
};

XMLscene.prototype.display = function() {
  // ---- BEGIN Background, camera and axis setup

  // Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  // Initialize Model-View matrix as identity (no transformation
  this.updateProjectionMatrix();
  this.loadIdentity();

  // Apply transformations corresponding to the camera position relative to the origin
  this.applyViewMatrix();

  // Draw axis
  this.axis.display();

  this.setDefaultAppearance();

  // ---- END Background, camera and axis setup


    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    if (this.graph.loadedOk) {
        for(var i = 0;i < this.lightCount; i++){
          if(this.lightsStatus[i])
          this.lights[i].enable();
          else {
            this.lights[i].disable();
          }
          this.lights[i].update();
        }
    };

};

/**
* Change camera to a new perspective
* @param perspective camera caracteristic
*/
XMLscene.prototype.setCamera = function(perspective) {

    this.camera = new CGFcamera(perspective.angle, perspective.near, perspective.far,
        vec3.fromValues(perspective.from[0], perspective.from[1], perspective.from[2]),
        vec3.fromValues(perspective.to[0], perspective.to[1], perspective.to[2]));
        //TODO DUVIDA se é target ou se é o vector director
}
XMLscene.prototype.setDefaultAxis = function() {
  this.axis = new CGFaxis(this, this.graph.xmlSceneTag.axis_length);
};

XMLscene.prototype.setNextCamera = function() {
  this.setCamera(this.graph.views.getNextPerspective());
};

XMLscene.prototype.setDefaultCamera = function(){
  this.setCamera(this.graph.views.getDefaultCamera());
};

XMLscene.prototype.setDefaultIllumination = function() {

  //TODO FALTA tratar dos id's

  this.setGlobalAmbientLight(this.graph.illumination.ambient[0], this.graph.illumination.ambient[1], this.graph.illumination.ambient[2], this.graph.illumination.ambient[3]);




  var light;
  /* OMNIS CONFIG*/
  var nOmnis = this.graph.lights.omni.length;
  for(var i = 0; i < nOmnis; i++, this.lightCount++){
   light = this.graph.lights.omni[i];


   this.lights[this.lightCount].setPosition(light.location[0],light.location[1],light.location[2],light.location[3]);
   this.lights[this.lightCount].setAmbient(light.ambient[0],light.ambient[1],light.ambient[2],light.ambient[3]);
   this.lights[this.lightCount].setDiffuse(light.diffuse[0],light.diffuse[1],light.diffuse[2],light.diffuse[3]);
   this.lights[this.lightCount].setSpecular(light.specular[0],light.specular[1],light.specular[2],light.specular[3]);
   this.lights[this.lightCount].setSpotCutOff(360); // TODO QUAL é o default?? nao tem doc


   if(light.enabled){
    this.lights[this.lightCount].enable();
    this.lightsStatus.push(true);
  }
   else {
    this.lights[this.lightCount].disable();
    this.lightsStatus.push(false);
  }
    this.lights[this.lightCount].setVisible(true);
    this.interface.addLights(this.graph.lights.spot[i].id ,this.lightCount);
  }


/* SPOTS CONFIG*/
  var nSpots = this.graph.lights.spot.length;

  for(var i = 0; i < nSpots; i++, this.lightCount++){
    light = this.graph.lights.spot[i];


    this.lights[this.lightCount].setPosition(light.location[0],light.location[1],light.location[2],light.location[3]);
    this.lights[this.lightCount].setSpotDirection(light.target[0] - light.location[0],light.target[1] - light.location[1],light.target[2] - light.location[2]);
    this.lights[this.lightCount].setSpotExponent(light.exponent);
    this.lights[this.lightCount].setSpotCutOff(light.angle);//TODO NOT SURE

    this.lights[this.lightCount].setAmbient(light.ambient[0],light.ambient[1],light.ambient[2],light.ambient[3]);
    this.lights[this.lightCount].setDiffuse(light.diffuse[0],light.diffuse[1],light.diffuse[2],light.diffuse[3]);
    this.lights[this.lightCount].setSpecular(light.specular[0],light.specular[1],light.specular[2],light.specular[3]);

    if(light.enabled){
     this.lights[this.lightCount].enable();
      this.lightsStatus.push(true);
    }
    else {
     this.lights[this.lightCount].disable();
      this.lightsStatus.push(false);

   }

   this.lights[this.lightCount].setVisible(true);
   this.interface.addLights(this.graph.lights.spot[i].id ,this.lightCount);
  }
};
