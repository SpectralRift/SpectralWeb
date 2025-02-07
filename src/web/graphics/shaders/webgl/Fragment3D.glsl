precision mediump float;

varying vec2 fragUV;
varying vec3 fragNormal;
varying vec4 fragColor;

uniform sampler2D sTexture;

void main() {
    gl_FragColor = texture2D(sTexture, fragUV) * fragColor;
}
