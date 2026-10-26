import {
  AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Group,
  IcosahedronGeometry, LineBasicMaterial, LineLoop, LineSegments, MathUtils,
  Mesh, MeshBasicMaterial, PerspectiveCamera, Points, Scene, ShaderMaterial,
  SphereGeometry, Vector3, WebGLRenderer, WireframeGeometry, type Material
} from 'three'

interface OrbState {
  pointer: { x: number; y: number }
  progress: number
}

export function createOrbModel() {
  const group = new Group()
  const geometry = new IcosahedronGeometry(1, 2)
  group.add(new LineSegments(new WireframeGeometry(geometry), new LineBasicMaterial({
    color: 0x8573ed, transparent: true, opacity: 0.22, depthWrite: false
  })))

  const positions = geometry.getAttribute('position')
  const unique = new Map<string, number[]>()
  for (let i = 0; i < positions.count; i++) {
    const point = [positions.getX(i), positions.getY(i), positions.getZ(i)]
    unique.set(point.map(value => value.toFixed(4)).join(','), point)
  }
  const nodeGeometry = new BufferGeometry().setAttribute('position',
    new Float32BufferAttribute([...unique.values()].flat(), 3))
  const nodeMaterial = new ShaderMaterial({
    uniforms: { uRatio: { value: 1 } },
    vertexShader: `
      uniform float uRatio;
      varying float vTint;
      void main() {
        vec4 point = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * point;
        gl_PointSize = 24.0 * uRatio / -point.z;
        vTint = position.y * 0.5 + 0.5;
      }`,
    fragmentShader: `
      varying float vTint;
      void main() {
        float distanceToCenter = length(gl_PointCoord - 0.5);
        float alpha = 1.0 - smoothstep(0.04, 0.5, distanceToCenter);
        vec3 tint = mix(vec3(0.62, 0.43, 1.0), vec3(0.2, 0.9, 1.0), vTint);
        gl_FragColor = vec4(tint, alpha * 0.9);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, blending: AdditiveBlending
  })
  group.add(new Points(nodeGeometry, nodeMaterial))

  const glowMaterial = new ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vHeight;
      void main() {
        float wave = sin(position.y * 7.0 + uTime * 0.6) * sin(position.x * 5.0 - uTime * 0.4);
        vec4 point = modelViewMatrix * vec4(position * (1.0 + wave * 0.015), 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = -point.xyz;
        vHeight = position.y;
        gl_Position = projectionMatrix * point;
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vHeight;
      void main() {
        float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.5);
        vec3 tint = mix(vec3(0.4, 0.2, 0.85), vec3(0.1, 0.75, 0.9), smoothstep(-1.0, 1.0, vHeight));
        gl_FragColor = vec4(tint * (0.4 + rim), 0.04 + rim * 0.35);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, blending: AdditiveBlending
  })
  group.add(new Mesh(geometry, glowMaterial))
  const core = new Mesh(new SphereGeometry(0.25, 32, 24), new MeshBasicMaterial({
    color: 0x9d7bff, transparent: true, opacity: 0.65
  }))
  group.add(core)

  const moteGeometry = new SphereGeometry(0.025, 8, 8)
  const orbits = [0x22d3ee, 0xa18aff].map((color, index) => {
    const orbit = new Group()
    const points = Array.from({ length: 128 }, (_, i) => {
      const angle = i / 128 * Math.PI * 2
      return new Vector3(Math.cos(angle) * 1.5, Math.sin(angle) * 0.65, 0)
    })
    orbit.add(new LineLoop(new BufferGeometry().setFromPoints(points), new LineBasicMaterial({
      color, transparent: true, opacity: 0.45
    })))
    const mote = new Mesh(moteGeometry, new MeshBasicMaterial({ color }))
    orbit.add(mote)
    orbit.rotation.set(0.4 + index * 0.8, 0.3 + index * 0.5, index ? -0.7 : 0.4)
    group.add(orbit)
    return { orbit, mote }
  })

  const stars = Array.from({ length: 90 }, (_, i) => {
    const angle = i * 2.399963
    const y = 1 - (i + 0.5) / 90 * 2
    const radius = 1.7 + (i % 7) * 0.1
    const ring = Math.sqrt(1 - y * y) * radius
    return [Math.cos(angle) * ring, y * radius, Math.sin(angle) * ring]
  }).flat()
  const starGeometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute(stars, 3))
  const starMaterial = nodeMaterial.clone()
  const starField = new Points(starGeometry, starMaterial)
  group.add(starField)
  return { group, core, orbits, glowMaterial, nodeMaterial, starMaterial, starField }
}

export function disposeOrbModel(root: Group | Scene) {
  const geometries = new Set<BufferGeometry>()
  const materials = new Set<Material>()
  root.traverse(object => {
    if (!(object instanceof Mesh || object instanceof Points || object instanceof LineSegments || object instanceof LineLoop)) return
    geometries.add(object.geometry)
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material)
  })
  for (const geometry of geometries) geometry.dispose()
  for (const material of materials) material.dispose()
}

export function createOrbScene(host: HTMLElement, state: () => OrbState, onContextLost: () => void) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
  renderer.setPixelRatio(ratio)
  renderer.setClearColor(new Color(0x06070d), 0)
  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 20)
  camera.position.z = 4.8
  const model = createOrbModel()
  model.nodeMaterial.uniforms.uRatio.value = ratio
  model.starMaterial.uniforms.uRatio.value = ratio * 0.55
  scene.add(model.group)
  host.appendChild(renderer.domElement)

  let elapsed = 0
  let lastFrame = 0
  const render = (time: number) => {
    const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0
    lastFrame = time
    elapsed += delta
    const { pointer, progress } = state()
    model.group.rotation.y = MathUtils.damp(model.group.rotation.y, elapsed * 0.07 + pointer.x * 0.2 + progress * 0.6, 4, delta)
    model.group.rotation.x = MathUtils.damp(model.group.rotation.x, pointer.y * 0.12 + progress * 0.35, 4, delta)
    model.glowMaterial.uniforms.uTime.value = elapsed
    model.core.scale.setScalar(1 + Math.sin(elapsed * 0.7) * 0.045)
    model.starField.rotation.y = -elapsed * 0.03
    for (const [index, { mote }] of model.orbits.entries()) {
      const angle = elapsed * (0.15 + index * 0.05) + index * Math.PI
      mote.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 0.65, 0)
    }
    renderer.render(scene, camera)
  }
  const resize = () => {
    const width = Math.max(host.clientWidth, 1)
    const height = Math.max(host.clientHeight, 1)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  const contextLost = (event: Event) => { event.preventDefault(); onContextLost() }
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  render(0)
  resize()

  return {
    setActive(active: boolean) {
      lastFrame = 0
      renderer.setAnimationLoop(active ? render : null)
    },
    dispose() {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      disposeOrbModel(scene)
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }
}
