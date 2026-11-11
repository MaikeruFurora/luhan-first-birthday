<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, Expand, Flower2, Star } from '@lucide/vue'

import AppContainer from '@/components/ui/AppContainer.vue'
import FairyButterfly from '@/components/ui/FairyButterfly.vue'
import PhotoLightbox from '@/components/ui/PhotoLightbox.vue'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { birthday } from '@/data/birthday'

const rootEl = ref(null)
const scrollerEl = ref(null)

useScrollReveal(rootEl, { stagger: 0.1, y: 24 })

const { prefersReducedMotion } = usePrefersReducedMotion()

const photos = birthday.photos
const activeIndex = ref(0)
const hasSwiped = ref(false)
// Which photo is open in the tap-to-view lightbox (null = closed).
const lightboxIndex = ref(null)

// DOM refs of the cards, filled by the v-for below.
const cardEls = ref([])

// Alternating washi-tape gradients + card tilts for a scrapbook feel.
const tapes = [
  'from-pastel-pink to-pastel-lavender',
  'from-pastel-lavender to-pastel-blue',
  'from-pastel-mint to-pastel-butter',
  'from-pastel-peach to-pastel-pink',
]

let observer = null
let onFirstScroll = null
let onPointerDown = null
let scrollTween = null

/** Stops any running tween and hands native snapping back. */
function stopTween() {
  scrollTween?.kill()
  scrollTween = null
  if (scrollerEl.value) scrollerEl.value.style.scrollSnapType = ''
}

function goTo(index) {
  const clamped = Math.max(0, Math.min(photos.length - 1, index))
  const card = cardEls.value[clamped]
  if (!card || !scrollerEl.value) return

  const scroller = scrollerEl.value
  // The last card rests flush with the end of the strip, so its snap
  // position can sit past the maximum scroll — clamp to what the
  // scroller can actually reach.
  const maxScroll = scroller.scrollWidth - scroller.clientWidth
  const target = Math.min(card.offsetLeft, maxScroll)

  stopTween()

  // Reduced motion: jump straight to the card, no animation.
  if (prefersReducedMotion.value) {
    scroller.scrollLeft = target
    return
  }

  // Tween a plain proxy object and apply scrollLeft in onUpdate:
  // tweening the element directly routes through CSSPlugin, which
  // writes to el.style (where scrollLeft does not exist). We also
  // pause native snap alignment while animating so it doesn't fight
  // the tween — it is restored the moment we stop or the guest
  // grabs the strip, landing exactly on a card.
  scroller.style.scrollSnapType = 'none'
  const proxy = { x: scroller.scrollLeft }
  scrollTween = gsap.to(proxy, {
    x: target,
    duration: 0.45,
    ease: 'power2.out',
    onUpdate: () => {
      scroller.scrollLeft = proxy.x
    },
    onComplete: () => stopTween(),
  })
}

onMounted(() => {
  if (!scrollerEl.value) return

  // Keep the dots in sync with whichever card the guest swiped to.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeIndex.value = cardEls.value.indexOf(entry.target)
        }
      })
    },
    { root: scrollerEl.value, threshold: 0.6 },
  )
  cardEls.value.forEach((el) => el && observer.observe(el))

  // Fade the swipe hint away after the very first swipe.
  onFirstScroll = () => {
    hasSwiped.value = true
  }
  scrollerEl.value.addEventListener('scroll', onFirstScroll, { once: true, passive: true })

  // If the guest grabs the strip mid-animation, hand control back to
  // their finger instead of fighting it.
  onPointerDown = () => stopTween()
  scrollerEl.value.addEventListener('pointerdown', onPointerDown, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  stopTween()
  scrollerEl.value?.removeEventListener('scroll', onFirstScroll)
  scrollerEl.value?.removeEventListener('pointerdown', onPointerDown)
})

const atFirst = computed(() => activeIndex.value === 0)
const atLast = computed(() => activeIndex.value === photos.length - 1)
</script>

<template>
  <section
    id="gallery"
    ref="rootEl"
    class="relative overflow-hidden bg-linear-to-b from-cream via-pastel-lavender/30 to-cream py-14 sm:py-16"
  >
    <!-- soft fairytale friends -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <span class="absolute top-[13%] left-[8%]">
        <Star class="size-5 animate-twinkle text-sunny" fill="currentColor" stroke-width="1.5" />
      </span>
      <span class="absolute top-[24%] right-[9%]">
        <Star class="size-6 animate-twinkle [animation-delay:0.9s] text-blush" fill="currentColor" stroke-width="1.5" />
      </span>
      <span class="absolute bottom-[20%] right-[12%]">
        <span class="block animate-sway text-blush"><FairyButterfly :size="26" /></span>
      </span>
      <span class="absolute bottom-[26%] left-[10%]">
        <Flower2 class="size-7 text-minty" />
      </span>
    </div>

    <AppContainer>
      <div class="relative">
        <!-- heading -->
        <div data-reveal class="text-center">
          <p class="font-script text-script text-lilac">Snaps from her first year</p>
          <h2 class="mt-2 font-display text-section font-extrabold text-plum">
            Luhan's little moments
          </h2>
          <p class="mx-auto mt-3 max-w-md text-pretty text-base text-plum-soft">
            Twelve months of tiny wonders — swipe through our favourite memories before the
            big day.
          </p>
        </div>

        <!-- swipeable scrapbook strip -->
        <div data-reveal class="mt-8">
          <ul
            ref="scrollerEl"
            class="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-6 pb-2"
          >
            <li
              v-for="(photo, i) in photos"
              :key="photo.src"
              ref="cardEls"
              class="relative w-[min(72%,17.5rem)] shrink-0 rounded-3xl bg-white/90 p-3 shadow-md ring-1 ring-white transition-transform duration-300 hover:rotate-0"
              :class="[
                i % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]',
                // The last card aligns its end edge instead: its start would
                // sit beyond the maximum scroll position of the strip.
                i === photos.length - 1 ? 'snap-end' : 'snap-start',
              ]"
            >
              <!-- washi tape -->
              <span
                class="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-linear-to-r opacity-85 shadow-sm"
                :class="tapes[i % tapes.length]"
                aria-hidden="true"
              ></span>

              <!-- tap a card to view the photo whole -->
              <button
                type="button"
                class="group block w-full cursor-pointer rounded-2xl text-left"
                :aria-label="'View photo: ' + photo.caption"
                @click="lightboxIndex = i"
              >
                <span
                  class="pointer-events-none absolute top-1.5 right-1.5 z-10 grid size-8 place-items-center rounded-full bg-white/85 text-plum opacity-90 shadow-sm transition-transform group-active:scale-90"
                  aria-hidden="true"
                >
                  <Expand class="size-4" />
                </span>

                <img
                  :src="photo.src"
                  :alt="photo.alt"
                  class="aspect-square w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  :width="photo.width"
                  :height="photo.height"
                  loading="lazy"
                  decoding="async"
                />
              </button>

              <p class="mt-3 mb-1 text-center font-script text-2xl leading-snug text-plum">
                {{ photo.caption }}
              </p>
            </li>
          </ul>

          <!-- swipe hint (phones only, until first swipe) -->
          <p
            v-if="!hasSwiped"
            class="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-plum-soft/70 sm:hidden"
          >
            Swipe for more magic
            <ChevronRight class="size-4 animate-nudge text-blush" aria-hidden="true" />
          </p>
        </div>

        <!-- controls: 48px+ targets, comfortable for one-handed use -->
        <div data-reveal class="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            class="grid size-12 place-items-center rounded-full bg-white/90 text-plum shadow-md ring-1 ring-pastel-lavender transition-transform active:scale-95 hover:text-blush disabled:pointer-events-none disabled:opacity-40"
            :disabled="atFirst"
            aria-label="Previous photo"
            @click="goTo(activeIndex - 1)"
          >
            <ChevronLeft class="size-6" aria-hidden="true" />
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="(photo, i) in photos"
              :key="'dot-' + photo.src"
              type="button"
              class="grid h-12 w-7 place-items-center"
              :aria-label="'Go to photo ' + (i + 1)"
              :aria-current="i === activeIndex ? 'true' : undefined"
              @click="goTo(i)"
            >
              <span
                class="block h-2.5 rounded-full transition-all duration-300"
                :class="i === activeIndex ? 'w-5 bg-blush' : 'w-2.5 bg-pastel-lavender'"
              ></span>
            </button>
          </div>

          <button
            type="button"
            class="grid size-12 place-items-center rounded-full bg-white/90 text-plum shadow-md ring-1 ring-pastel-lavender transition-transform active:scale-95 hover:text-blush disabled:pointer-events-none disabled:opacity-40"
            :disabled="atLast"
            aria-label="Next photo"
            @click="goTo(activeIndex + 1)"
          >
            <ChevronRight class="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </AppContainer>

    <!-- tap-to-view photo viewer -->
    <PhotoLightbox v-model="lightboxIndex" :photos="photos" />
  </section>
</template>
