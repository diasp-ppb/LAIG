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
uniform float fu;
uniform float iu;
uniform float iv;
uniform float fv;


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

  vec4 finalColor = texture2D(uSampler, vTextureCoord);
  vec4 colorToMix = colorSeclect(vTextureCoord,color1,color2);


  if(vTextureCoord.x <= fu && vTextureCoord.x > iu && vTextureCoord.y <= fv && vTextureCoord.y > iu )
  vec4 colorToMix = colorMark;



  finalColor.rgba *= colorToMix;

  gl_FragColor = finalColor;
}
