

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float divU;
uniform float divV;
uniform float sU;
uniform float sV;
varying vec2 vTextureCoord;

void main() {

  float fU = (sU  +0.1) / divU;
  float iU = fU - 1.1 / divU;
  float fV = (sV +0.1) / divV;
  float iV = fV - 1.1 / divV;
  if (aTextureCoord.x <= fU && aTextureCoord.x >= iU && aTextureCoord.y <= fV &&
      aTextureCoord.y >= iV)
    gl_Position =
        uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y,
                                    aVertexPosition.z + 0.5, 1.0);
  else
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

  vTextureCoord = aTextureCoord;
}
