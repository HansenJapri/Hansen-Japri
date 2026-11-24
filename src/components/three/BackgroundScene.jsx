import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/*
 * Site-wide backdrop: a deep field of short filaments, like iron filings,
 * each one aligned to a slowly drifting 3D flow field.
 *
 *   flow     filaments follow curl-like noise that evolves over time
 *   magnet   the pointer acts like a current-carrying wire: nearby filaments
 *            wrap around it and warm toward the accent colour
 *   pulse    a click (or, when idle, the field itself) sends a ring outward;
 *            filaments it passes snap radial and flash, then settle back
 *   travel   scroll moves the camera down through the field and each route
 *            parks it somewhere else, so pages feel like places in one space
 *
 * The field wraps around the camera, so it is endless in every direction
 * while drawing a fixed number of instances.
 */

const SIMPLEX = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCentre;
  uniform vec3 uBox;
  uniform vec3 uMagnet;
  uniform float uMagnetForce;
  uniform vec3 uPulseOrigin;
  uniform float uPulseAge;
  uniform float uPx;
  attribute vec3 aOffset;
  attribute float aSeed;
  varying float vAlpha;
  varying float vHeat;
  varying float vAcross;
  ${SIMPLEX}

  void main() {
    // Wrap each filament into a box that travels with the camera.
    vec3 w = mod(aOffset - uCentre + uBox * 0.5, uBox) - uBox * 0.5 + uCentre;

    // Flow direction from two slow noise fields (heading and pitch).
    // A dominant diagonal drift bent by low-frequency noise, so neighbours
    // agree and the whole field reads as one current.
    float th = 0.55 + snoise(w * 0.038 + vec3(0.0, 0.0, uTime * 0.03)) * 1.5;
    float ph = snoise(w * 0.03 + vec3(17.3, -4.1, uTime * 0.02)) * 0.55;
    vec3 dir = vec3(cos(th) * cos(ph), sin(th) * cos(ph), sin(ph));

    // Magnet: filaments near the pointer wrap around it.
    vec2 to = w.xy - uMagnet.xy;
    float d2 = dot(to, to);
    // (x * x, not pow: pow of a negative base is undefined in GLSL.)
    float dz = w.z - uMagnet.z;
    float zf = exp(-dz * dz / 30.0);
    float m = exp(-d2 / 7.0) * zf * uMagnetForce;
    vec3 swirl = normalize(vec3(-to.y, to.x, 0.0) + vec3(1e-4));
    dir = normalize(mix(dir, swirl, m));

    // Pulse: a ring that turns filaments radial as it passes.
    float r = uPulseAge * 7.5;
    float dr = distance(w, uPulseOrigin) - r;
    float ring = exp(-dr * dr / 1.4) * exp(-uPulseAge * 0.85);
    vec3 radial = normalize(w - uPulseOrigin + vec3(1e-4));
    dir = normalize(mix(dir, radial, ring * 0.9));

    float heat = clamp(m * 0.85 + ring, 0.0, 1.0);
    float len = (0.24 + aSeed * 0.16) * (1.0 + heat * 0.8) * (0.92 + 0.08 * sin(uTime * 0.8 + aSeed * 20.0));

    // Build a thin, screen-facing quad along the direction.
    vec4 mvC = modelViewMatrix * vec4(w, 1.0);
    vec3 dv = normalize((modelViewMatrix * vec4(dir, 0.0)).xyz);
    vec3 p = mvC.xyz + dv * position.x * len;
    vec3 side = normalize(cross(vec3(0.0, 0.0, 1.0), dv) + vec3(1e-5));
    p += side * position.y * uPx * 0.9 * max(-p.z, 0.1);
    gl_Position = projectionMatrix * vec4(p, 1.0);

    float depth = -mvC.z;
    float fade = (1.0 - smoothstep(10.0, 27.0, depth)) * smoothstep(1.5, 5.0, depth);
    vec3 q = abs(w - uCentre) / (uBox * 0.5);
    float edge = 1.0 - smoothstep(0.82, 1.0, max(q.x, max(q.y, q.z)));
    vAlpha = fade * edge * (0.13 + aSeed * 0.1 + heat * 0.6);
    vHeat = heat;
    vAcross = position.y;
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vHeat;
  varying float vAcross;
  void main() {
    float a = vAlpha * (1.0 - smoothstep(0.35, 1.0, abs(vAcross)));
    vec3 base = vec3(0.80, 0.79, 0.74);
    vec3 hot = vec3(0.94, 0.39, 0.23);
    gl_FragColor = vec4(mix(base, hot, smoothstep(0.12, 0.75, vHeat)), a);
  }
`

const BOX = new THREE.Vector3(48, 32, 18)

const ROUTE_CAMERA = {
  '/': [0, 0, 9],
  '/projects': [-4, -8, 8],
  '/journey': [4, -16, 8.5],
  '/about': [-2.5, -24, 9],
}

function rng(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

// Filaments sit on a jittered lattice in a few depth layers, like filings
// scattered evenly on stacked glass sheets, so the flow reads cleanly.
function buildGeometry(spacing, layers) {
  const g = new THREE.InstancedBufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, -1, 0, 0.5, -1, 0, -0.5, 1, 0, 0.5, 1, 0], 3))
  g.setIndex([0, 1, 2, 2, 1, 3])
  const rand = rng(11)
  const nx = Math.floor(BOX.x / spacing)
  const ny = Math.floor(BOX.y / spacing)
  const count = nx * ny * layers
  const offset = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  let i = 0
  for (let l = 0; l < layers; l++) {
    const z = -BOX.z / 2 + ((l + 0.5) / layers) * BOX.z
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        offset[i * 3] = -BOX.x / 2 + (x + 0.5 + (rand() - 0.5) * 0.7) * spacing
        offset[i * 3 + 1] = -BOX.y / 2 + (y + 0.5 + (rand() - 0.5) * 0.7) * spacing
        offset[i * 3 + 2] = z + (rand() - 0.5) * 2.4
        seed[i] = rand()
        i++
      }
    }
  }
  g.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offset, 3))
  g.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1))
  g.instanceCount = count
  return g
}

const MAGNET_Z = -2
const tmp = new THREE.Vector3()

// Where a screen point (NDC) meets the plane z = MAGNET_Z.
function toPlane(camera, x, y, out) {
  tmp.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize()
  const t = (MAGNET_Z - camera.position.z) / tmp.z
  return out.copy(camera.position).addScaledVector(tmp, t)
}

function Field({ compact, scroll, pathname, animate, magnet }) {
  const material = useRef()
  const geometry = useMemo(() => (compact ? buildGeometry(1.25, 3) : buildGeometry(0.9, 4)), [compact])
  useEffect(() => () => geometry.dispose(), [geometry])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCentre: { value: new THREE.Vector3() },
      uBox: { value: BOX },
      uMagnet: { value: new THREE.Vector3(0, 0, MAGNET_Z) },
      uMagnetForce: { value: 0 },
      uPulseOrigin: { value: new THREE.Vector3(0, 0, -40) },
      uPulseAge: { value: 99 },
      uPx: { value: 0.001 },
    }),
    []
  )

  const camera = useThree((s) => s.camera)
  const target = useRef(new THREE.Vector3(0, 0, MAGNET_Z))
  const pulse = useRef({ origin: new THREE.Vector3(0, 0, -40), start: -99, lastClick: -99 })
  const lastPointer = useRef({ x: 0, y: 0, moved: -99 })
  const force = useRef(0)

  // A click anywhere sends a pulse through the field from that point.
  useEffect(() => {
    if (!animate) return
    const onDown = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      toPlane(camera, x, y, pulse.current.origin)
      pulse.current.start = performance.now() / 1000
      pulse.current.lastClick = pulse.current.start
    }
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => window.removeEventListener('pointerdown', onDown)
  }, [animate, camera])

  const key = pathname.startsWith('/projects') ? '/projects' : pathname
  const base = ROUTE_CAMERA[key] ?? ROUTE_CAMERA['/']

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const now = performance.now() / 1000
    const cam = state.camera
    const p = scroll ? scroll.get() : 0
    const px = animate ? state.pointer.x : 0
    const py = animate ? state.pointer.y : 0

    cam.position.x = THREE.MathUtils.damp(cam.position.x, base[0] + px * 0.7, 2, dt)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, base[1] - p * 18 + py * 0.5, 2, dt)
    cam.position.z = THREE.MathUtils.damp(cam.position.z, base[2], 2, dt)
    cam.lookAt(cam.position.x * 0.5, cam.position.y - 1, -10)
    cam.updateMatrixWorld()

    const m = material.current
    if (!m) return
    const u = m.uniforms
    u.uTime.value = state.clock.elapsedTime
    u.uCentre.value.set(cam.position.x, cam.position.y, -5)
    u.uPx.value = (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2)) / state.size.height

    // Magnet follows the pointer with a little lag, and fades when idle.
    const lp = lastPointer.current
    if (state.pointer.x !== lp.x || state.pointer.y !== lp.y) {
      lp.x = state.pointer.x
      lp.y = state.pointer.y
      lp.moved = now
    }
    if (magnet && animate) toPlane(cam, state.pointer.x, state.pointer.y, target.current)
    u.uMagnet.value.lerp(target.current, 1 - Math.exp(-6 * dt))
    const active = magnet && animate && now - lp.moved < 3
    force.current = THREE.MathUtils.damp(force.current, active ? 1 : 0, active ? 3 : 1, dt)
    u.uMagnetForce.value = force.current

    // With no recent click, the field sends a quiet pulse of its own.
    const pl = pulse.current
    if (animate && now - pl.start > 9 && now - pl.lastClick > 9) {
      toPlane(cam, Math.random() * 1.6 - 0.8, Math.random() * 1.2 - 0.6, pl.origin)
      pl.origin.z = MAGNET_Z - 4 - Math.random() * 6
      pl.start = now
    }
    u.uPulseOrigin.value.copy(pl.origin)
    u.uPulseAge.value = animate ? now - pl.start : 99
  })

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function BackgroundScene({ scroll, pathname, animate, compact }) {
  const fine = useMemo(() => window.matchMedia('(pointer: fine)').matches, [])
  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      frameloop={animate ? 'always' : 'demand'}
      camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <Field compact={compact}scroll={scroll} pathname={pathname} animate={animate} magnet={fine} />
    </Canvas>
  )
}
