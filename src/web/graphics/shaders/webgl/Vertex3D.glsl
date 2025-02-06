attribute vec3 inPosition;
attribute vec2 inUV;
attribute vec3 inNormal;
attribute vec4 inColor;

uniform mat4 ufModelMatrix;
uniform mat4 ufViewMatrix;
uniform mat4 ufProjMatrix;

varying vec2 fragUV;
varying vec3 fragNormal;
varying vec4 fragColor;

void main() {
    // gl_Position = ufProjMatrix * ufViewMatrix * ufModelMatrix * vec4(inPosition, 1.0);
    gl_Position = vec4(inPosition, 1.0);
    fragUV = vec2(inUV.x, 1.0 - inUV.y);  // flipping the Y coordinate for UV
    fragNormal = inNormal;
    fragColor = inColor;
}
