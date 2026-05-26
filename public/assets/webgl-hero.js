/* ──────────────────────────────────────────────
   webgl-hero.js — full-bleed flowing gradient mesh
   A simplex-noise driven fragment shader with
   a deep-green / gold / charcoal palette.
   Adjusts intensity based on scroll position so it
   doesn't compete with content sections.
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  const canvas = document.getElementById('webgl-hero');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
  if (!gl) {
    // Fallback: simple radial gradient via CSS
    canvas.style.background =
      'radial-gradient(ellipse at 30% 40%, #16372a 0%, #050505 60%), radial-gradient(circle at 80% 70%, rgba(200,169,110,0.15), transparent 60%)';
    canvas.classList.add('on');
    return;
  }

  // ─── shaders ───────────────────────────────────
  const vsrc = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // 3D simplex noise (Ashima/Ian McEwan, public domain)
  // Used to produce slow flowing fields.
  const fsrc = `
    precision highp float;

    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;
    uniform float u_scroll;
    uniform float u_intensity;

    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0);
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0*C.xxx;
      vec3 x2 = x0 - i2 + 2.0*C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0*C.xxx;

      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ));
    }

    // palette: charcoal → deep green → gold → cream
    vec3 palette(float t) {
      vec3 a = vec3(0.020, 0.020, 0.020);   // near-black
      vec3 b = vec3(0.043, 0.122, 0.090);   // deep green
      vec3 c = vec3(0.784, 0.661, 0.431);   // gold
      vec3 d = vec3(0.925, 0.902, 0.847);   // cream

      vec3 ab = mix(a, b, smoothstep(0.10, 0.55, t));
      vec3 bc = mix(ab, c, smoothstep(0.55, 0.85, t));
      vec3 cd = mix(bc, d, smoothstep(0.92, 1.0, t));
      return cd;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;

      // slow time + scroll drift
      float t = u_time * 0.045;
      vec2  drift = vec2(t * 0.4, u_scroll * 0.18 + t * 0.25);

      // mouse parallax — very subtle
      uv += (u_mouse - 0.5) * 0.08;

      // layered fractal noise
      float n  = snoise(vec3(uv * 1.3 + drift, t));
      n       += 0.55 * snoise(vec3(uv * 2.7 + drift * 1.6, t * 1.4));
      n       += 0.30 * snoise(vec3(uv * 5.1 - drift * 0.9, t * 1.8));
      n = (n + 1.4) / 2.8;          // normalize approx
      n = pow(n, 1.15);

      // angular streaks for "field" look
      float a = atan(uv.y, uv.x);
      float streak = sin(a * 3.0 + t * 1.2 + n * 4.0) * 0.05;
      n += streak;

      vec3 col = palette(clamp(n, 0.0, 1.0));

      // vignette
      float v = 1.0 - smoothstep(0.5, 1.4, length(uv));
      col *= mix(0.55, 1.0, v);

      // overall intensity (driven by scroll progress)
      col *= u_intensity;

      // soft film grain
      float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      col += (g - 0.5) * 0.014;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Shader compile failed:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  const vs = compile(gl.VERTEX_SHADER, vsrc);
  const fs = compile(gl.FRAGMENT_SHADER, fsrc);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link failed:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  // full-screen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1,  -1,  1,
    -1,  1,  1, -1,   1,  1
  ]), gl.STATIC_DRAW);

  const loc_pos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc_pos);
  gl.vertexAttribPointer(loc_pos, 2, gl.FLOAT, false, 0, 0);

  const u_res        = gl.getUniformLocation(prog, 'u_res');
  const u_time       = gl.getUniformLocation(prog, 'u_time');
  const u_mouse      = gl.getUniformLocation(prog, 'u_mouse');
  const u_scroll     = gl.getUniformLocation(prog, 'u_scroll');
  const u_intensity  = gl.getUniformLocation(prog, 'u_intensity');

  // state
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let mx = 0.5, my = 0.5;
  let tmx = 0.5, tmy = 0.5;
  let scroll = 0;
  let intensity = 1.0;
  let visible = true;
  let running = true;

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    tmx = e.clientX / window.innerWidth;
    tmy = 1.0 - (e.clientY / window.innerHeight);
  });

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    scroll = sy / 1000;
    // dim down on subsequent sections so content reads
    const fadePoint = window.innerHeight * 0.6;
    const t = Math.min(sy / fadePoint, 1);
    intensity = 1.0 - t * 0.55;        // never fully off
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) loop(performance.now());
  });

  // Pause when offscreen entirely (after long scroll)
  const io = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
  }, { threshold: 0 });
  io.observe(canvas);

  const t0 = performance.now();
  function loop(now) {
    if (!running) return;
    if (visible) {
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, (now - t0) / 1000);
      gl.uniform2f(u_mouse, mx, my);
      gl.uniform1f(u_scroll, scroll);
      gl.uniform1f(u_intensity, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
