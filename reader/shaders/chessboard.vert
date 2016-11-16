

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float fu;
uniform float iu;
uniform float iv;
uniform float fv;

varying vec2 vTextureCoord;



void main() {


  if( aTextureCoord.x <= fu && aTextureCoord.x >= iu && aTextureCoord.y<= fv  && aTextureCoord.y >= iu )
   gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y , aVertexPosition.z+0.5, 1.0);
  else
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

  vTextureCoord = aTextureCoord;
}
