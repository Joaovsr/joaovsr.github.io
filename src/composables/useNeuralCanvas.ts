import { onMounted, onUnmounted, type Ref } from 'vue'

const MOBILE_BREAKPOINT = 768
const NODE_COUNT_MOBILE = 22
const NODE_COUNT_DESKTOP = 38
const MAX_EDGE_DIST = 180
const SIGNAL_SPAWN_MS = 320
const EDGE_COLOR = 'rgba(124, 92, 255'
const NODE_COLOR = 'rgba(183, 148, 246, 0.6)'
const SIGNAL_COLOR = '#22d3ee'

interface Node { x: number; y: number; vx: number; vy: number; r: number }
interface Signal { from: number; to: number; t: number; speed: number }

export function useNeuralCanvas(canvasRef: Ref<HTMLCanvasElement | undefined>) {
  let rafId: number | null = null
  let signalInterval: ReturnType<typeof setInterval> | null = null
  let resizeHandler: (() => void) | null = null

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()
    resizeHandler = resize
    window.addEventListener('resize', resize)

    const count = window.innerWidth < MOBILE_BREAKPOINT ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP
    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      r: (1 + Math.random() * 1.5) * dpr
    }))

    const ctx = canvas.getContext('2d')!
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
    signalInterval = setInterval(spawnSignal, SIGNAL_SPAWN_MS)

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
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
        s.t += s.speed
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
    frame()
  })

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    if (signalInterval !== null) clearInterval(signalInterval)
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  })
}
