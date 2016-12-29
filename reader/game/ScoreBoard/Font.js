function Font(scene) {

    CGFobject.call(this, scene);



    this.shader = new CGFshader(scene.gl, "shaders/font.vert", "shaders/font.frag");

    this.shader.setUniformsValues({
        'fontSize': [16, 16]
    });

    this.material = new CGFappearance(scene);

    this.material.setAmbient(0.1, 0.1, 0.1, 1);
    this.material.setDiffuse(0.1, 0.1, 0.1, 1);
    this.material.setSpecular(0.1, 0.1, 0.1, 1);

    this.material.loadTexture("../resources/oolite-font2.png");



}

Font.prototype.charPosition = function(char) {
        var ascii = char.charCodeAt(0);

        //numbers
        if (ascii >= 48 && ascii <= 57) {
            switch (char) {
                case "0":
                    return [0, 3];
                case "1":
                    return [1, 3];
                case "2":
                    return [2, 3];
                case "3":
                    return [3, 3];
                case "4":
                    return [4, 3];
                case "5":
                    return [5, 3];
                case "6":
                    return [6, 3];
                case "7":
                    return [7, 3];
                case "8":
                    return [8, 3];
                case "9":
                    return [9, 3];
            }
        } else if (ascii >= 65 && ascii <= 90) {
            //Capital
            switch (char) {
                case "A":
                    return [1, 4];
                case "B":
                    return [2, 4];
                case "C":
                    return [3, 4];
                case "D":
                    return [4, 4];
                case "E":
                    return [5, 4];
                case "F":
                    return [6, 4];
                case "G":
                    return [7, 4];
                case "H":
                    return [8, 4];
                case "I":
                    return [9, 4];
                case "J":
                    return [10, 4];
                case "K":
                    return [11, 4];
                case "L":
                    return [12, 4];
                case "M":
                    return [13, 4];
                case "N":
                    return [14, 4];
                case "O":
                    return [15, 4];
                case "P":
                    return [0, 5];
                case "Q":
                    return [1, 5];
                case "R":
                    return [2, 5];
                case "S":
                    return [3, 5];
                case "T":
                    return [4, 5];
                case "U":
                    return [5, 5];
                case "V":
                    return [6, 5];
                case "W":
                    return [7, 5];
                case "X":
                    return [8, 5];
                case "Y":
                    return [9, 5];
                case "Z":
                    return [10, 5];
            }
        } else {

            switch (char) {
                case " ":
                    return [15, 0];
                case ":":
                    return [10, 3];
                default:
                    return [15, 0];
            }
          }


        };
