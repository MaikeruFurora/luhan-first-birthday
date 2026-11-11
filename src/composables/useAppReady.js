import { ref } from 'vue'

/**
 * Module-scoped "app ready" gate.
 *
 * `appReady` is false while the loading splash (rendered straight from
 * index.html) covers the page. App.vue flips it to true the moment the
 * splash starts to lift, and the hero entrance listens for it so its
 * GSAP timeline never plays hidden behind the veil.
 */
const appReady = ref(false)

export function useAppReady() {
  /** Signal that the splash is lifting and the stage belongs to the app. */
  const markAppReady = () => {
    appReady.value = true
  }

  return { appReady, markAppReady }
}
