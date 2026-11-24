import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
 * The hero portrait as a 3D surface. The photo is mapped onto a finely
 * subdivided plane whose vertices are lifted by the image's brightness, so
 * the face has real relief when the plane turns toward the pointer.
 *
 *   intro    0 -> 1  a noise front sweeps across and resolves the photo
 *   scatter  0 -> 1  driven by scroll; the photo dissolves and lifts away
 *   pointer          tilts the plane and raises the surface under the cursor
 *
 * Graded to warm monochrome and feathered at every edge, so it sits in the
 * page instead of on it.
 */

const PLANE_W = 3
const PLANE_H = 3.75

const NOISE = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
`

const vertexShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec4 uCrop;
  uniform vec2 uPointer;
  uniform float uPointerForce;
  uniform float uScatter;
  uniform float uTime;
  varying vec2 vUv;
  varying float vLift;

  void main() {
    vUv = uv;
    vec3 p = position;
    vec3 tex = texture2D(uMap, uCrop.xy + uv * uCrop.zw).rgb;
    float lum = dot(tex, vec3(0.2126, 0.7152, 0.0722));

    // Relief from brightness, strongest in the middle of the frame.
    float centre = 1.0 - smoothstep(0.2, 0.75, distance(uv, vec2(0.5, 0.45)));
    p.z += (lum - 0.4) * 0.22 * centre;

    // Surface rises under the pointer.
    float d = distance(p.xy, uPointer);
    float lift = (1.0 - smoothstep(0.0, 0.7, d)) * uPointerForce;
    p.z += lift * 0.22;

    // Scroll exit: the surface bows back and drifts upward.
    p.z -= uScatter * uScatter * 0.8 * (0.5 + uv.y);
    p.y += uScatter * 0.6;

    p.z += sin(uTime * 0.7 + uv.y * 6.0) * 0.006;

    vLift = lift;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec4 uCrop;
  uniform float uIntro;
  uniform float uScatter;
  varying vec2 vUv;
  varying float vLift;
  ${NOISE}

  void main() {
    vec3 tex = texture2D(uMap, uCrop.xy + vUv * uCrop.zw).rgb;
    float lum = dot(tex, vec3(0.2126, 0.7152, 0.0722));

    // Full colour: slight contrast curve and a touch more saturation.
    vec3 col = clamp((tex - 0.5) * 1.08 + 0.5, 0.0, 1.0);
    col = mix(vec3(lum), col, 1.12);
    // Let the bright ceiling sink; keep the face lit.
    float focus = 1.0 - smoothstep(0.12, 0.62, distance(vUv, vec2(0.5, 0.62)));
    col *= mix(0.6, 1.04, focus);
    col += vLift * 0.05;

    // Feathered oval frame.
    vec2 q = (vUv - vec2(0.5, 0.52)) / vec2(0.46, 0.5);
    float frame = 1.0 - smoothstep(0.55, 1.0, length(q));
    frame *= smoothstep(0.0, 0.22, vUv.y);

    // Intro reveal and scroll dissolve share one noise field.
    float n = fbm(vUv * 5.0);
    float reveal = smoothstep(n - 0.06, n + 0.06, uIntro * 1.25 - 0.12);
    float keep = 1.0 - smoothstep(n - 0.08, n + 0.08, uScatter * 1.2);
    float edge = (reveal * (1.0 - reveal)) * 4.0;
    col += vec3(0.95, 0.42, 0.25) * edge * 0.35;

    gl_FragColor = vec4(col, frame * reveal * keep);
  }
`

function Surface({ src, scroll, animate, segments }) {
  const [texture, setTexture] = useState(null)
  const [crop, setCrop] = useState(() => new THREE.Vector4(0, 0, 1, 1))
  const mesh = useRef()
  const material = useRef()
  const intro = useRef(animate ? 0 : 1)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const force = useRef(0)

  useEffect(() => {
    let cancelled = false
    new THREE.TextureLoader().load(src, (tex) => {
      if (cancelled) return
      // Sample raw sRGB values; the shader grades and outputs them directly.
      tex.colorSpace = THREE.NoColorSpace
      tex.anisotropy = 4
      // A 4:5 window over head and shoulders, centred horizontally.
      const { width, height } = tex.image
      const w = Math.min(width, height * 0.8) * 0.8
      const h = w / 0.8
      const x = (width - w) / 2
      const top = height * 0.03
      // Texture v runs bottom to top.
      setCrop(new THREE.Vector4(x / width, 1 - (top + h) / height, w / width, h / height))
      setTexture(tex)
    })
    return () => {
      cancelled = true
    }
  }, [src])

  useEffect(() => () => texture?.dispose(), [texture])

  const uniforms = useMemo(
    () => ({
      uMap: { value: null },
      uCrop: { value: new THREE.Vector4(0, 0, 1, 1) },
      uIntro: { value: 0 },
      uScatter: { value: 0 },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPointerForce: { value: 0 },
    }),
    []
  )

  useFrame((state, delta) => {
    const m = material.current
    if (!texture || !m) return
    const dt = Math.min(delta, 0.05)
    // R3F copies the uniforms prop, so write through the live material.
    const u = m.uniforms
    u.uMap.value = texture
    u.uCrop.value.copy(crop)
    u.uTime.value = state.clock.elapsedTime

    if (intro.current < 1) intro.current = Math.min(1, intro.current + dt / 2)
    u.uIntro.value = 1 - Math.pow(1 - intro.current, 3)
    u.uScatter.value = scroll ? THREE.MathUtils.clamp((scroll.get() - 0.1) / 0.7, 0, 1) : 0

    const inside = animate && Math.abs(state.pointer.x) < 1 && Math.abs(state.pointer.y) < 1
    if (inside) {
      pointer.current.set((state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2)
    }
    force.current = THREE.MathUtils.damp(force.current, inside ? 1 : 0, 4, dt)
    u.uPointer.value.lerp(pointer.current, 1 - Math.exp(-8 * dt))
    u.uPointerForce.value = force.current

    if (mesh.current) {
      const rx = animate ? -state.pointer.y * 0.14 : 0
      const ry = animate ? state.pointer.x * 0.24 : 0
      mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, rx, 3, dt)
      mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, ry, 3, dt)
    }
  })

  if (!texture) return null

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[PLANE_W, PLANE_H, segments[0], segments[1]]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export default function PortraitScene({ src, scroll, animate, compact }) {
  const segments = useMemo(() => (compact ? [90, 112] : [160, 200]), [compact])

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={animate ? 'always' : 'demand'}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      aria-hidden="true"
    >
      <Surface src={src} scroll={scroll} animate={animate} segments={segments} />
    </Canvas>
  )
}
