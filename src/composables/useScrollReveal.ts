import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(rootRef: Ref<HTMLElement | undefined>) {
  let cleanup = () => {}

  onMounted(() => {
    const sections = rootRef.value?.querySelectorAll('.section:not(#hero)')
    if (!sections) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const revealed = new WeakSet<Element>()
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || reducedMotion.matches || revealed.has(entry.target)) continue
        revealed.add(entry.target)
        observer.unobserve(entry.target)
        const animation = entry.target.animate([
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' })
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
      }
    }, { rootMargin: '0px 0px -40px 0px' })

    const sync = () => {
      observer.disconnect()
      for (const animation of animations) animation.cancel()
      animations.clear()
      if (!reducedMotion.matches) {
        for (const section of sections) {
          if (!revealed.has(section)) observer.observe(section)
        }
      }
    }
    reducedMotion.addEventListener('change', sync)
    sync()

    cleanup = () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', sync)
      for (const animation of animations) animation.cancel()
    }
  })

  onUnmounted(() => cleanup())
}
