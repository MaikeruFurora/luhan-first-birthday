import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Tracks the user's "prefers-reduced-motion" setting so GSAP
 * timelines can be skipped entirely for motion-sensitive guests.
 *
 * @returns {{ prefersReducedMotion: import('vue').Ref<boolean> }}
 */
export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false)

  let mediaQuery = null
  const update = () => {
    prefersReducedMotion.value = mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mediaQuery.addEventListener('change', update)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return { prefersReducedMotion }
}
