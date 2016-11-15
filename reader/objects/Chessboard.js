function Chessboard(scene, divU, divV, textureref, sU, sV, color1, color2, color3) {
    CGFobject.call(this, scene);


    this.divU = divU;
    this.divV = divV;
    this.textureref = textureref;
    this.sU = sU;
    this.sV = sV;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;

    this.plane = new Plane(this.scene, 1, 1, this.divU, this.divV);
    this.textureref = textureref;
    this.xmlText = this.scene.graph.textures.findById(textureref);
    this.xmlText.load(this.scene);

    this.texture = this.xmlText.texture;

    this.shader = new CGFshader(this.scene.gl,"shaders/chessboard.vert","shaders/chessboard.frag");


    this.shader.setUniformsValues({uSampler : 0});
    this.shader.setUniformsValues({color1 : this.color1});
    this.shader.setUniformsValues({color2 : this.color2});
    this.shader.setUniformsValues({colorMark : this.color3});
    this.shader.setUniformsValues({divU:parseInt(this.divU)*1.0}); // Force number to be dd.00
    this.shader.setUniformsValues({divV:parseInt(this.divV)*1.0}); // Force number to be dd.00
};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

Chessboard.prototype.display = function() {


    this.scene.pushMatrix();
    this.scene.translate(0.2,0,1.1);
    this.scene.rotate(Math.PI/2,-1,0,0);

    this.texture.bind(0);

    this.scene.setActiveShader(this.shader);


    this.plane.display();



    this.texture.unbind(1);


    this.scene.setActiveShader(this.scene.defaultShader);


    this.scene.popMatrix();
};
