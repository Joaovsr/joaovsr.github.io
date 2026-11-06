import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useHeroMotion(heroRef: Ref<HTMLElement | undefined>, orbRef: Ref<HTMLElement | undefined>) {
  const active = ref(false)
  const pointer = ref({ x: 0, y: 0 })
  const progress = ref(0)
  let cleanup = () => {}

  onMounted(() => {
    const hero = heroRef.value
    const orb = orbRef.value
    if (!hero || !orb) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let visible = false

    const reset = () => {
      pointer.value = { x: 0, y: 0 }
      orb.style.setProperty('--orb-x', '0px')
      orb.style.setProperty('--orb-y', '0px')
    }
    const scroll = () => {
      if (!active.value) return
      const bounds = hero.getBoundingClientRect()
      progress.value = Math.max(0, Math.min(1, -bounds.top / bounds.height))
    }
    const sync = () => {
      active.value = visible && !document.hidden && !reducedMotion.matches
      if (!active.value || !finePointer.matches) reset()
      if (reducedMotion.matches) progress.value = 0
      scroll()
    }
    const move = (event: PointerEvent) => {
      if (!active.value || !finePointer.matches || event.pointerType !== 'mouse') return
      const bounds = hero.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      pointer.value = { x, y }
      orb.style.setProperty('--orb-x', `${x * 8}px`)
      orb.style.setProperty('--orb-y', `${y * 6}px`)
    }
    let observer: IntersectionObserver | undefined
    const observe = () => {
      observer?.disconnect()
      const headerHeight = document.querySelector('.top')?.getBoundingClientRect().height ?? 0
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        sync()
      }, { rootMargin: `-${headerHeight}px 0px 0px` })
      observer.observe(hero)
    }
    observe()
    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', observe, { passive: true })
    document.addEventListener('visibilitychange', sync)
    reducedMotion.addEventListener('change', sync)
    finePointer.addEventListener('change', sync)

    cleanup = () => {
      observer?.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', observe)
      document.removeEventListener('visibilitychange', sync)
      reducedMotion.removeEventListener('change', sync)
      finePointer.removeEventListener('change', sync)
      reset()
    }
  })

  onUnmounted(() => cleanup())
  return { active, pointer, progress }
}
