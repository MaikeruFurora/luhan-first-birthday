import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Gentle reveal-on-scroll for sections: every element marked
 * `data-reveal` inside the root fades up once when the section
 * enters the viewport. Shared by all below-the-fold sections.
 *
 * Skipped entirely when the user prefers reduced motion, so the
 * content simply appears.
 *
 * @param {import('vue').Ref<HTMLElement>} rootRef - section root
 * @param {{ stagger?: number, y?: number }} [options]
 */
export function useScrollReveal(rootRef, { stagger = 0.08, y = 28 } = {}) {
  let ctx = null

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-reveal]')
      if (!els.length) return

      gsap.from(els, {
        y,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: rootRef.value,
          start: 'top 80%',
          once: true,
        },
      })
    }, rootRef.value)
  })

  onUnmounted(() => ctx?.revert())
}
