#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 color1;
uniform vec4 color2;
uniform vec4 colorMark;

uniform float divU;
uniform float divV;
uniform float sU;
uniform float sV;



vec4 colorSeclect(vec2 tex, vec4 color0, vec4 color1)
{


         if ((mod(divU*tex.x, 2.0) < 1.0) ^^ (mod(divV*tex.y, 2.0) < 1.0))
         {
            return color0;
         }
         else
         {
            return color1;
         }
}

void main() {


  float fU = (sU)/divU;
  float iU = fU - 1.0/divU;
  float fV = (sV)/divV;
  float iV = fV - 1.0/divV;


  vec4 finalColor = texture2D(uSampler, vTextureCoord);
  vec4 colorToMix = colorSeclect(vTextureCoord,color1,color2);


  if( vTextureCoord.x<= fU && vTextureCoord.x >= iU && vTextureCoord.y <= fV && vTextureCoord.y >= iV )
     colorToMix = colorMark;



  finalColor.rgba *= colorToMix;

  gl_FragColor = finalColor;
}
