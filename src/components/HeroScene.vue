<template>
  <div ref="stage" class="hero-scene" aria-hidden="true">
    <div class="hero-scene__fallback" :class="{ 'hero-scene__fallback--hidden': ready }">
      <div class="hero-scene__dashboard"><img src="/projects/fictor360.webp" alt="" /></div>
      <div class="hero-scene__phone"><img src="/projects/super-app-mobile.webp" alt="" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const stage = ref<HTMLElement | null>(null)
const ready = ref(false)
let cleanup: (() => void) | undefined
let mounted = false
let request = 0

async function buildScene() {
  const host = stage.value
  if (!host || !window.matchMedia('(min-width: 800px) and (prefers-reduced-motion: no-preference)').matches) return
  const currentRequest = ++request

  try {
    const THREE = await import('three')
    const loader = new THREE.TextureLoader()
    const [dashboardTexture, phoneTexture] = await Promise.all([
      loader.loadAsync('/projects/fictor360.webp'),
      loader.loadAsync('/projects/super-app-mobile.webp')
    ])

    if (!mounted || currentRequest !== request) {
      dashboardTexture.dispose()
      phoneTexture.dispose()
      return
    }

    dashboardTexture.colorSpace = THREE.SRGBColorSpace
    phoneTexture.colorSpace = THREE.SRGBColorSpace

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.className = 'hero-scene__canvas'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-2.6, 2.6, 2.45, -2.45, 0.1, 30)
    camera.position.set(0, 0, 12)
    scene.add(new THREE.AmbientLight(0xffffff, 2.2))
    const light = new THREE.DirectionalLight(0xffffff, 2.6)
    light.position.set(-3, 5, 8)
    scene.add(light)
    const rim = new THREE.DirectionalLight(0x7297f5, 2)
    rim.position.set(4, -1, -2)
    scene.add(rim)

    const model = new THREE.Group()
    scene.add(model)

    function roundedPanel(width: number, height: number, radius: number, depth: number, color: number) {
      const shape = new THREE.Shape()
      const x = -width / 2
      const y = -height / 2
      shape.moveTo(x + radius, y)
      shape.lineTo(x + width - radius, y)
      shape.quadraticCurveTo(x + width, y, x + width, y + radius)
      shape.lineTo(x + width, y + height - radius)
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      shape.lineTo(x + radius, y + height)
      shape.quadraticCurveTo(x, y + height, x, y + height - radius)
      shape.lineTo(x, y + radius)
      shape.quadraticCurveTo(x, y, x + radius, y)
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.035,
        bevelSegments: 3,
        curveSegments: 8
      })
      return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, metalness: 0.48, roughness: 0.4 }))
    }

    const dashboard = new THREE.Group()
    dashboard.add(roundedPanel(4.45, 2.62, 0.14, 0.12, 0xdce5f3))
    const dashboardScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(4.17, 2.2),
      new THREE.MeshBasicMaterial({ map: dashboardTexture, toneMapped: false })
    )
    dashboardScreen.position.set(0, 0.025, 0.17)
    dashboard.add(dashboardScreen)
    const cameraDot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), new THREE.MeshBasicMaterial({ color: 0x8290a6 }))
    cameraDot.position.set(0, 1.22, 0.17)
    dashboard.add(cameraDot)
    dashboard.position.set(0.38, 0.38, -0.65)
    dashboard.rotation.set(0.08, -0.16, -0.045)
    model.add(dashboard)

    const phone = new THREE.Group()
    phone.add(roundedPanel(1.55, 3.22, 0.22, 0.19, 0x16243d))
    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.39, 2.89),
      new THREE.MeshBasicMaterial({ map: phoneTexture, toneMapped: false })
    )
    phoneScreen.position.set(0, -0.015, 0.24)
    phone.add(phoneScreen)
    const phoneCamera = new THREE.Mesh(new THREE.SphereGeometry(0.027, 12, 12), new THREE.MeshBasicMaterial({ color: 0x405473 }))
    phoneCamera.position.set(0, 1.54, 0.24)
    phone.add(phoneCamera)
    phone.position.set(-1.47, -0.59, 0.85)
    phone.rotation.set(-0.08, 0.2, -0.085)
    model.add(phone)

    const target = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }
    const onPointerLeave = () => { target.x = 0; target.y = 0 }
    const resize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      if (!width || !height) return
      const aspect = width / height
      const halfWidth = Math.max(2.95, 2.45 * aspect)
      camera.left = -halfWidth
      camera.right = halfWidth
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    }

    let frame = 0
    let visible = false
    const animate = (time: number) => {
      model.rotation.y += (target.x * 0.065 - model.rotation.y) * 0.055
      model.rotation.x += (-target.y * 0.045 - model.rotation.x) * 0.055
      model.position.y = Math.sin(time * 0.0007) * 0.055
      renderer.render(scene, camera)
      if (visible) frame = requestAnimationFrame(animate)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true
        frame = requestAnimationFrame(animate)
      } else if (!entry.isIntersecting && visible) {
        visible = false
        cancelAnimationFrame(frame)
      }
    })

    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', resize)
    resize()
    observer.observe(host)
    ready.value = true

    cleanup = () => {
      visible = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resize)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      dashboardTexture.dispose()
      phoneTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      ready.value = false
    }
  } catch {
    // The HTML fallback stays visible when WebGL or an image cannot load.
  }
}

onMounted(() => { mounted = true; buildScene() })
onBeforeUnmount(() => { mounted = false; request++; cleanup?.() })
</script>

<style scoped lang="scss">
.hero-scene { position: relative; width: 100%; height: 470px; isolation: isolate; }
.hero-scene::before { content: ''; position: absolute; inset: 8% -4% 0; border-radius: 50%; background: radial-gradient(ellipse, #e1e9f9 0%, #edf1f9 35%, transparent 70%); }
.hero-scene::after { content: ''; position: absolute; left: 5%; right: 3%; bottom: 9%; height: 1px; background: linear-gradient(90deg, transparent, #c6d4eb 22%, #c6d4eb 72%, transparent); }
:deep(.hero-scene__canvas) { position: relative; z-index: 2; display: block; width: 100%; height: 100%; }
.hero-scene__fallback { position: absolute; inset: 0; z-index: 1; transition: opacity .35s ease; }
.hero-scene__fallback--hidden { opacity: 0; }
.hero-scene__dashboard, .hero-scene__phone { position: absolute; overflow: hidden; box-shadow: 18px 24px 35px #20365a30; }
.hero-scene__dashboard { width: 82%; left: 17%; top: 18%; padding: 8px; border: 2px solid #cbd6e8; border-radius: 12px; background: #e4eaf4; transform: perspective(900px) rotateY(-9deg) rotateZ(-2deg); }
.hero-scene__dashboard img { display: block; width: 100%; border-radius: 3px; }
.hero-scene__phone { width: 29%; left: 4%; top: 29%; padding: 7px; border: 3px solid #17263d; border-radius: 20px; background: #17263d; transform: perspective(900px) rotateY(11deg) rotateZ(-5deg); }
.hero-scene__phone img { display: block; width: 100%; border-radius: 11px; }
@media (max-width: 1050px) { .hero-scene { height: 390px; } }
@media (max-width: 799px) { .hero-scene { height: min(78vw, 420px); max-width: 540px; margin-inline: auto; } }
@media (max-width: 650px) { .hero-scene { height: min(76vw, 340px); } }
@media (prefers-reduced-motion: reduce) { .hero-scene__fallback { transition: none; } }
</style>
