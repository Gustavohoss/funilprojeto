'use client';

import React, { useEffect, useRef } from 'react';

type ProceduralGroundBackgroundProps = {
  isStatic?: boolean;
};

const ProceduralGroundBackground: React.FC<ProceduralGroundBackgroundProps> = ({ isStatic = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform bool u_is_static;
      
      // Cores do tema
      uniform vec3 u_color_primary;
      uniform vec3 u_color_background;


      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Ground Perspective Simulation
        float depth = 1.0 / (uv.y + 1.15);
        vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.15);
        
        // Layered Procedural Noise for Terrain
        float n = noise(gridUv * 3.5);
        float ripples = sin(gridUv.y * 18.0 + n * 8.0 + u_time * 0.5);
        
        // Neon Topographic Lines
        float topoLine = smoothstep(0.1, 0.05, abs(ripples));
        
        // Composite
        vec3 finalColor = mix(u_color_background, vec3(0.0,0.0,0.0), n * 0.6);
        finalColor += topoLine * u_color_primary * depth * 0.8;
        
        // Pulsating green light from below for mobile
        float screenRatio = u_resolution.y / u_resolution.x;
        if (screenRatio > 1.0) { // Simple check for portrait mode (mobile)
          float pulse = u_is_static ? 1.0 : 0.5 + 0.5 * sin(u_time * 1.5);
          float glow = smoothstep(1.0, -1.0, uv.y);
          finalColor += u_color_primary * glow * pulse * 1.5;
        }

        // Horizon Fog / Fade
        float fade = smoothstep(0.1, -1.0, uv.y);
        finalColor *= (1.0 - length(uv) * 0.45) * (1.0 - fade);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram()!;
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return;
    }
    
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const isStaticLoc = gl.getUniformLocation(program, "u_is_static");
    const primaryColorLoc = gl.getUniformLocation(program, "u_color_primary");
    const backgroundColorLoc = gl.getUniformLocation(program, "u_color_background");

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary').trim();
    const backgroundColor = rootStyles.getPropertyValue('--background').trim();

    function hslToRgb(hsl: string): [number, number, number] {
      const match = /hsl\(([\d\.]+)\s+([\d\.]+)%\s+([\d\.]+)%\)/.exec(hsl) || /([\d\.]+)\s+([\d\.]+)%\s+([\d\.]+)%/.exec(hsl);
      if (!match) return [0, 0, 0];
      let h = parseFloat(match[1]);
      let s = parseFloat(match[2]) / 100;
      let l = parseFloat(match[3]) / 100;

      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      let m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
          r = c; g = 0; b = x;
      }
      r = r + m;
      g = g + m;
      b = b + m;
      return [r, g, b];
    }
    
    const [pr, pg, pb] = hslToRgb(primaryColor);
    const [br, bg, bb] = hslToRgb(backgroundColor);


    let animationFrameId: number;
    const render = (time: number) => {
      const { innerWidth: width, innerHeight: height } = window;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, width, height);
      gl.uniform1i(isStaticLoc, isStatic ? 1 : 0);
      gl.uniform3f(primaryColorLoc, pr, pg, pb);
      gl.uniform3f(backgroundColorLoc, br, bg, bb);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isStatic]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};

export default ProceduralGroundBackground;
