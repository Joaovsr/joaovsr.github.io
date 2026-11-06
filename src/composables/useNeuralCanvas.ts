import { onMounted, onUnmounted, watch, type Ref } from 'vue'

const MOBILE_BREAKPOINT = 768
const NODE_COUNT_MOBILE = 12
const NODE_COUNT_DESKTOP = 28
const MAX_EDGE_DIST = 180
const SIGNAL_SPAWN_MS = 900
const EDGE_COLOR = 'rgba(124, 92, 255'
const NODE_COLOR = 'rgba(183, 148, 246, 0.6)'
const SIGNAL_COLOR = '#22d3ee'

interface Node { x: number; y: number; vx: number; vy: number; r: number }
interface Signal { from: number; to: number; t: number; speed: number }

export function useNeuralCanvas(canvasRef: Ref<HTMLCanvasElement | undefined>, active: Ref<boolean>) {
  let rafId: number | null = null
  let resizeHandler: (() => void) | null = null
  let stopWatching: (() => void) | undefined

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const count = window.innerWidth < MOBILE_BREAKPOINT ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (1 + Math.random() * 1.5) * dpr
      }))
    }
    resize()
    resizeHandler = resize
    window.addEventListener('resize', resize)

    const maxDist = MAX_EDGE_DIST * dpr
    let signals: Signal[] = []

    const spawnSignal = () => {
      if (nodes.length < 2) return
      const a = Math.floor(Math.random() * nodes.length)
      let b = Math.floor(Math.random() * nodes.length)
      if (a === b) b = (b + 1) % nodes.length
      const dx = nodes[a].x - nodes[b].x
      const dy = nodes[a].y - nodes[b].y
      if (Math.hypot(dx, dy) < maxDist) {
        signals.push({ from: a, to: b, t: 0, speed: 0.012 + Math.random() * 0.012 })
      }
    }
    let lastFrame = 0
    let lastSignal = 0
    const frame = (time: number) => {
      const delta = lastFrame ? Math.min((time - lastFrame) / (1000 / 60), 2) : 1
      lastFrame = time
      if (time - lastSignal > SIGNAL_SPAWN_MS) {
        spawnSignal()
        lastSignal = time
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const n of nodes) {
        n.x += n.vx * delta
        n.y += n.vy * delta
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      ctx.lineWidth = 0.6 * dpr
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDist) {
            const op = (1 - dist / maxDist) * 0.16
            ctx.strokeStyle = `${EDGE_COLOR}, ${op})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.fillStyle = NODE_COLOR
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      signals = signals.filter(s => s.t < 1)
      for (const s of signals) {
        s.t += s.speed * delta
        const a = nodes[s.from], b = nodes[s.to]
        if (!a || !b) continue
        const x = a.x + (b.x - a.x) * s.t
        const y = a.y + (b.y - a.y) * s.t
        ctx.beginPath()
        ctx.fillStyle = `rgba(34, 211, 238, ${1 - s.t})`
        ctx.shadowColor = SIGNAL_COLOR
        ctx.shadowBlur = 8 * dpr
        ctx.arc(x, y, 2.4 * dpr, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafId = requestAnimationFrame(frame)
    }
    stopWatching = watch(active, running => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
      lastFrame = 0
      lastSignal = performance.now()
      signals = []
      if (running) rafId = requestAnimationFrame(frame)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, { immediate: true })
  })

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    stopWatching?.()
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  })
}
