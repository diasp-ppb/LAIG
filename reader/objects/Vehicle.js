function Vehicle(scene) {
CGFobject.call(this, scene);

this.scene = scene;

this.controlPoints = [
							 [ -1.0,     -1,  0, 1 ],
							 [ -1.0,   -0.5,  1, 1 ],
							 [ -1.0,    0.5,  1, 1 ],
							 [ -1.0,      1,  0, 1 ],

							 [ 0,    -1.5,    0, 1 ],
							 [ 0,    0,      2, 1 ],
							 [ 0,    0,      2, 1 ],
							 [ 0,  	 1.5,    0, 1 ],

 						     [ 1.0, -1.0, 0, 1 ],
							 [ 1.0, -0.5, 0, 1 ],
							 [ 1.0,  0.5, 0, 1 ],
							 [ 1.0,  1.0, 0, 1 ]

							];




this.controlPoints2 =[

  [ -0.75, -1.75, 0.0, 1 ],
  [ -0.75,  2.5,  0.0, 1 ],
  [ 0,      -3.5, 2.0, 1 ],
  [ 0,      -0.5, 2.0, 1 ],
  [ 0.75,  -1.75, 0.0, 1 ],
  [ 0.75,   2.5,  0.0, 1 ]
];

this.controlPoints3 =
[
               		  		 [ -2.0, -2.0, 1.0, 1 ],
 							 [ -2.0, -1.0, -2.0, 1 ],
 							 [ -2.0, 1.0, 5.0, 1 ],
 							 [ -2.0, 2.0, -1.0, 1 ],

              				 [ 0, -2.0, 0, 1 ],
 							 [ 0, -1.0, -1.0, 1 ],
 							 [ 0, 1.0, 1.5, 1 ],
 							 [ 0, 2.0, 0, 1 ],

           				     [ 2.0, -2.0, -1.0, 1 ],
							 [ 2.0, -1.0, 2.0, 1 ],
							 [ 2.0, 1.0, -5.0, 1 ],
							 [ 2.0, 2.0, 1.0, 1 ]
];
this.up = new Patch(scene, 2, 3, 5, 5,this.controlPoints);
this.support = new Patch(scene, 2, 1, 5, 5,this.controlPoints2);
this.cover = new Patch(scene, 2, 3, 5, 5,this.controlPoints3);
this.tire = new Torus(scene, 0.1, 0.8, 8, 8);
this.canon = new Cylinder(scene, 8, 8, 0.3, 0.2, 4);
this.block = new Cylinder(scene, 10, 1, 0.4, 1, 2.5);
this.transmission = new Cylinder(scene, 6,1,0.1,0.1,2.5);




this.camo = new CGFtexture(scene, "../resources/Camo.png");
this.tyre = new CGFtexture(scene, "../resources/tyre.png");
this.metal = new CGFtexture(scene,"../resources/metal.png");
this.wood = new CGFtexture(scene,"../resources/madeira.jpg");

this.material = new CGFappearance(scene);
//set emission
this.material.setEmission(0,0,0,1);
//set ambient
this.material.setAmbient(0.5,0.6,0.5,1);
//set diffuse
this.material.setDiffuse(0.5,0.6,0.5,1);
//set specular
this.material.setSpecular(0.2,0.0,0.0,1);
//set shininess
this.material.setShininess(70);



this.material.setTextureWrap('REPEAT', 'REPEAT');
};


Vehicle.prototype.display = function() {

/// tank top
// personal cabine


this.material.apply();
this.camo.bind();

this.scene.pushMatrix();
this.scene.translate(0,1,1);
this.scene.rotate(Math.PI/2,-1,0,0);
this.scene.rotate(Math.PI/2,0,0,1);
this.up.display();
this.scene.popMatrix();



this.scene.pushMatrix();
this.scene.translate(0,0.75,-0.5);
this.block.display();
this.scene.popMatrix();

//weapon
this.scene.pushMatrix();
this.scene.translate(0,1,1);
this.canon.display();
this.scene.popMatrix();

//Tyre GUARD
this.scene.pushMatrix();
this.scene.rotate(Math.PI/2,-1,0,0);
this.scene.translate(1,-0.5,0);
this.support.display();
this.scene.translate(-2,0,0);
this.support.display();

this.scene.popMatrix();


this.camo.unbind();
this.metal.bind();


this.scene.pushMatrix();
this.scene.rotate(Math.PI/2, 0,1,0);
this.scene.translate(1,-0.1,-1.30);
this.transmission.display();

this.scene.translate(-1.75,0,0);
this.transmission.display();

this.scene.translate(-1.75,0,0);
this.transmission.display();


this.scene.popMatrix();




this.metal.unbind();
this.tyre.bind();
/// LOW  TANK
//Tires
this.scene.pushMatrix();
this.scene.rotate(Math.PI/2,0,1,0);
this.scene.translate(1,-0.1,1);
this.tire.display();

this.scene.translate(-1.75,0,0);
this.tire.display();


this.scene.translate(-1.75,0,0);
this.tire.display();


this.scene.translate(0,0,-2);
this.tire.display();

this.scene.translate(1.75,0,0);
this.tire.display();

this.scene.translate(1.75,0,0);
this.tire.display();


this.scene.popMatrix();

this.tyre.unbind();

this.wood.bind();

this.scene.pushMatrix();
this.scene.translate(0,0.5,0.5);
this.scene.scale(1.4,0.1,2);
this.scene.rotate(Math.PI/2,0,1,0);
this.canon.display();
this.scene.rotate(Math.PI,0,1,0);
this.canon.display();


this.wood.unbind();


this.scene.popMatrix();

};
