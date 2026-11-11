<script setup>
// App shell — kept intentionally thin.
// Sections live in src/components/sections and are added here as they're built.
import { onMounted } from 'vue'
import gsap from 'gsap'

import HeroSection from '@/components/sections/HeroSection.vue'
import CountdownSection from '@/components/sections/CountdownSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAppReady } from '@/composables/useAppReady'

const { markAppReady } = useAppReady()

/** Minimum time the loading splash stays on screen (ms). */
const SPLASH_MIN_MS = 1400

onMounted(async () => {
  const startedAt = Number(window.__splashT0 ?? Date.now())

  // Let the pretty fonts settle so the hero shows its final face.
  try {
    await document.fonts.ready
  } catch {
    // Older browsers — carry on without waiting.
  }

  // Hold the splash for a pleasant beat so it never just flashes.
  const wait = Math.max(0, SPLASH_MIN_MS - (Date.now() - startedAt))
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait))

  const splash = document.getElementById('splash')
  if (splash) {
    const remove = () => splash.remove()
    gsap.to(splash, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: remove,
    })
    // Safety net: never leave the splash stuck if the ticker stalls.
    setTimeout(remove, 1300)
  }

  // The hero entrance begins as the veil starts to lift.
  markAppReady()
})
</script>

<template>
  <div id="top" class="min-h-dvh bg-cream font-body text-plum-soft">
    <a
      href="#home"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-plum focus:shadow-lg"
    >
      Skip to content
    </a>

    <main>
      <HeroSection />
      <CountdownSection />
      <GallerySection />

      <!-- Planned sections (built in later iterations): -->
      <!-- StorySection · DetailsSection · RsvpSection -->
    </main>

    <AppFooter />
  </div>
</template>
