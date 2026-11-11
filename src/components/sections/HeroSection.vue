<script setup>
import { onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import {
  ArrowDown,
  CalendarDays,
  Cloud,
  Crown,
  Flower2,
  Heart,
  MapPin,
  Sparkles,
  Star,
} from '@lucide/vue'

import AppContainer from '@/components/ui/AppContainer.vue'
import FairyButterfly from '@/components/ui/FairyButterfly.vue'
import { birthday } from '@/data/birthday'
import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'
import { useAppReady } from '@/composables/useAppReady'

const rootEl = ref(null)
const { prefersReducedMotion } = usePrefersReducedMotion()
const { appReady } = useAppReady()

let gsapContext = null

// The framed portrait in the banner — baby.photo in birthday.js.
const heroPhoto = birthday.baby.photo

// Opens the venue's Google Maps link in a new tab.
function openMaps() {
  window.open(birthday.venue.mapsUrl, '_blank', 'noopener noreferrer')
}

// Ambient star field — scattered twinkles so the sky feels magical.
const twinkles = [
  { left: '6%', top: '20%', size: 'size-5', color: 'text-sunny', delay: '0s' },
  { left: '16%', top: '52%', size: 'size-6', color: 'text-lilac', delay: '0.9s' },
  { left: '86%', top: '16%', size: 'size-5', color: 'text-blush', delay: '0.4s' },
  { left: '4%', top: '70%', size: 'size-6', color: 'text-sunny', delay: '1.4s' },
  { left: '90%', top: '48%', size: 'size-5', color: 'text-lilac', delay: '1.9s' },
  { left: '78%', top: '72%', size: 'size-6', color: 'text-sunny', delay: '0.7s' },
]

// One meaningful intro timeline: staggered content entrance.
// It waits for the loading splash to start lifting (appReady) so it
// never plays hidden behind the veil, and is skipped entirely for
// guests who prefer reduced motion.
watch(
  appReady,
  (ready) => {
    if (!ready || prefersReducedMotion.value || !rootEl.value) return

    gsapContext = gsap.context(() => {
      const timeline = gsap
        .timeline({ defaults: { duration: 0.9, ease: 'power3.out' } })
        .from('[data-animate="eyebrow"]', { y: 22, opacity: 0, duration: 0.75 })
        .from('[data-animate="title"]', { y: 32, opacity: 0 }, '-=0.55')
        .from('[data-animate="tagline"]', { y: 20, opacity: 0, duration: 0.75 }, '-=0.6')
        .from('[data-animate="chip"]', { y: 14, opacity: 0, stagger: 0.12, duration: 0.55 }, '-=0.55')
        .from(
          '[data-animate="photo"]',
          { scale: 0.86, opacity: 0, duration: 1.05, ease: 'back.out(1.4)' },
          '-=0.5',
        )
        .from('[data-animate="cta"]', { y: 14, opacity: 0, stagger: 0.1, duration: 0.55 }, '-=0.35')
        .from('[data-animate="decor"]', { opacity: 0, duration: 0.8, stagger: 0.05 }, 0.35)

      // Safety net: a ".from()" tween hides elements until it runs, so if
      // the ticker ever stalls (occluded window, frozen tab) guests would
      // see a half-empty hero forever. Jump to the end instead.
      setTimeout(() => timeline.progress(1), 5000)
    }, rootEl.value)
  },
  { immediate: true },
)

onUnmounted(() => {
  gsapContext?.revert()
})
</script>

<template>
  <section
    id="home"
    ref="rootEl"
    class="relative isolate flex min-h-svh flex-col justify-center overflow-hidden"
  >
    <!-- ── Layer 1 · dreamy pastel sky ─────────────────────────── -->
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-linear-to-b from-pastel-blue/70 via-pastel-lavender/35 to-cream"></div>
      <div class="absolute -top-24 -left-24 size-72 rounded-full bg-pastel-pink/50 blur-3xl"></div>
      <div class="absolute top-1/3 -right-28 size-80 rounded-full bg-pastel-peach/45 blur-3xl"></div>
      <div class="absolute -bottom-32 left-1/4 size-72 rounded-full bg-pastel-mint/40 blur-3xl"></div>
    </div>

    <!-- ── Layer 2 · faraway fairytale castle on the horizon ───── -->
    <svg
      class="hero-castle pointer-events-none absolute bottom-1 left-1/2 -z-[1] w-[min(88vw,22rem)] -translate-x-1/2"
      viewBox="0 0 320 190"
      aria-hidden="true"
    >
      <!-- soft hill -->
      <ellipse cx="160" cy="182" rx="150" ry="18" fill="#ffffff" opacity="0.55" />
      <!-- side walls + crenellations -->
      <rect x="92" y="118" width="46" height="66" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="182" y="118" width="46" height="66" rx="2" fill="#ffffff" opacity="0.85" />
      <path d="M92 118 H138" stroke="#ffffff" stroke-width="8" stroke-dasharray="9 7" opacity="0.85" />
      <path d="M182 118 H228" stroke="#ffffff" stroke-width="8" stroke-dasharray="9 7" opacity="0.85" />
      <!-- towers -->
      <rect x="48" y="92" width="44" height="92" rx="3" fill="#ffffff" opacity="0.95" />
      <rect x="228" y="92" width="44" height="92" rx="3" fill="#ffffff" opacity="0.95" />
      <rect x="138" y="64" width="44" height="120" rx="3" fill="#ffffff" opacity="0.98" />
      <!-- cone roofs -->
      <path d="M42 92 L70 44 L98 92 Z" fill="#ffd6e8" />
      <path d="M222 92 L250 44 L278 92 Z" fill="#c9dff7" />
      <path d="M130 64 L160 16 L190 64 Z" fill="#dcc9ff" />
      <!-- tower flags -->
      <path d="M70 44 V26" stroke="#e8699d" stroke-width="2.5" stroke-linecap="round" />
      <path d="M70 26 L86 31 L70 37 Z" fill="#e8699d" />
      <path d="M250 44 V26" stroke="#a184d9" stroke-width="2.5" stroke-linecap="round" />
      <path d="M250 26 L266 31 L250 37 Z" fill="#a184d9" />
      <path d="M160 16 V4" stroke="#6fa8dc" stroke-width="2.5" stroke-linecap="round" />
      <path d="M160 4 L178 9 L160 15 Z" fill="#6fa8dc" />
      <!-- windows -->
      <circle cx="70" cy="118" r="6" fill="#9db8dd" />
      <circle cx="250" cy="118" r="6" fill="#9db8dd" />
      <circle cx="160" cy="96" r="7" fill="#9db8dd" />
      <rect x="110" y="140" width="10" height="16" rx="5" fill="#9db8dd" />
      <rect x="200" y="140" width="10" height="16" rx="5" fill="#9db8dd" />
      <!-- little door -->
      <path d="M148 184 V160 A12 12 0 0 1 172 160 V184 Z" fill="#e8a9c4" />
    </svg>

    <!-- ── Layer 3 · party bunting across the top ─────────────── -->
    <svg
      class="hero-bunting pointer-events-none absolute inset-x-0 top-0 -z-[1] h-14 w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-bunting" width="360" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 8 H360" stroke="#b3a3c9" stroke-width="2" opacity="0.55" />
          <path d="M8 9 L46 9 L27 46 Z" fill="#ffd6e8" />
          <path d="M68 9 L106 9 L87 46 Z" fill="#dcc9ff" />
          <path d="M128 9 L166 9 L147 46 Z" fill="#c9dff7" />
          <path d="M188 9 L226 9 L207 46 Z" fill="#ffe3cc" />
          <path d="M248 9 L286 9 L267 46 Z" fill="#cbeddc" />
          <path d="M308 9 L346 9 L327 46 Z" fill="#fff3c7" />
          <!-- Additional buntings for fuller look -->
          <path d="M36 9 L74 9 L55 46 Z" fill="#ffd6e8" />
          <path d="M104 9 L142 9 L115 46 Z" fill="#dcc9ff" />
          <path d="M168 9 L206 9 L183 46 Z" fill="#c9dff7" />
          <path d="M232 9 L270 9 L251 46 Z" fill="#ffe3cc" />
          <path d="M296 9 L334 9 L315 46 Z" fill="#cbeddc" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-bunting)" />
    </svg>

    <!-- ── Layer 4 · scalloped icing edge at the bottom ───────── -->
    <svg
      class="hero-icing pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-3.5 w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-icing" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 A14 14 0 0 1 28 14 Z" fill="#fff9f3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-icing)" />
    </svg>

    <!-- ── Layer 5 · floating fairytale friends ───────────────── -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-[1]">
      <!-- clouds -->
      <span data-animate="decor" class="absolute top-[17%] left-[4%]">
        <span class="block animate-float"><Cloud class="size-14 text-white/90" fill="currentColor" /></span>
      </span>
      <span data-animate="decor" class="absolute top-[13%] right-[5%]">
        <span class="block animate-float [animation-delay:1.3s]"><Cloud class="size-10 text-white/70" fill="currentColor" /></span>
      </span>

      <!-- butterflies -->
      <span data-animate="decor" class="absolute top-[68%] left-[7%]">
        <span class="block animate-sway text-lilac"><FairyButterfly :size="30" /></span>
      </span>
      <span data-animate="decor" class="absolute top-[74%] right-[16%]">
        <span class="block animate-sway [animation-delay:1.1s] text-blush"><FairyButterfly :size="24" /></span>
      </span>

      <!-- heart & flower -->
      <span data-animate="decor" class="absolute top-[56%] left-[13%]">
        <span class="block animate-float [animation-delay:0.7s]"><Heart class="size-6 text-blush/80" fill="currentColor" /></span>
      </span>
      <span data-animate="decor" class="absolute top-[68%] right-[9%]">
        <span class="block animate-sway [animation-delay:0.5s]"><Flower2 class="size-7 text-minty" /></span>
      </span>

      <!-- star field -->
      <span
        v-for="(star, i) in twinkles"
        :key="i"
        data-animate="decor"
        class="absolute"
        :style="{ left: star.left, top: star.top }"
      >
        <Star
          class="animate-twinkle"
          :class="[star.size, star.color]"
          :style="{ animationDelay: star.delay }"
          fill="currentColor"
          stroke-width="1.5"
        />
      </span>
    </div>

    <!-- ── Layer 6 · invitation content (mobile-first column) ── -->
    <AppContainer>
      <div class="flex flex-col items-center py-2 text-center sm:py-20">
        <!-- eyebrow -->
        <p data-animate="eyebrow" class="font-script text-script text-blush mt-0 text-2xl sm:text-3xl font-medium tracking-wider">
          Once upon a time&hellip;
        </p>

        <!-- headline — "ONE!" and the star are grouped with whitespace-nowrap
     so the "!" can never orphan onto a line of its own -->
        <h1 data-animate="title" class="mt-1 font-display font-bold text-hero text-plum">
          {{ birthday.baby.name }} is turning
          <span class="inline-block whitespace-nowrap">
            <span class="relative inline-block">
              <span class="bg-gradient-to-r from-blush via-lilac to-baby bg-clip-text text-transparent">ONE!</span>
              <svg
                class="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 120 12"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 7 Q13 1 23 7 T43 7 T63 7 T83 7 T103 7 T117 7"
                  stroke="#e8699d"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-opacity="0.75"
                />
              </svg>
            </span><Star
              class="ml-0.5 inline size-6 animate-twinkle align-middle text-sunny sm:size-7"
              fill="currentColor"
              stroke-width="1.5"
            />
          </span>
        </h1>

        <!-- tagline -->
       <p
  data-animate="tagline"
  class="mt-1 max-w-xs px-3 text-pretty text-lead leading-relaxed text-plum-soft sm:mt-5 sm:max-w-md sm:px-0"
>
  {{ birthday.baby.tagline }}
</p>

        <!-- portrait with rainbow & clouds behind -->
        <div data-animate="photo" class="relative mt-6 w-60 sm:mt-6 sm:w-72">
          <div class="animate-float">
            <!-- rainbow arcing out from little clouds -->
            <svg
              class="hero-rainbow absolute top-1/2 left-1/2 -z-10 w-[190%] max-w-none -translate-x-1/2 -translate-y-[68%]"
              viewBox="0 0 320 160"
              fill="none"
              aria-hidden="true"
            >
              <g stroke-linecap="round" stroke-width="13">
                <path d="M30 150 A130 130 0 0 1 290 150" stroke="#ffd6e8" />
                <path d="M45 150 A115 115 0 0 1 275 150" stroke="#dcc9ff" />
                <path d="M60 150 A100 100 0 0 1 260 150" stroke="#c9dff7" />
                <path d="M75 150 A85 85 0 0 1 245 150" stroke="#cbeddc" />
                <path d="M90 150 A70 70 0 0 1 230 150" stroke="#fff3c7" />
              </g>
              <g fill="#ffffff">
                <ellipse cx="16" cy="142" rx="24" ry="14" />
                <ellipse cx="40" cy="135" rx="17" ry="11" />
                <ellipse cx="2" cy="139" rx="13" ry="9" />
                <ellipse cx="304" cy="142" rx="24" ry="14" />
                <ellipse cx="280" cy="135" rx="17" ry="11" />
                <ellipse cx="318" cy="139" rx="13" ry="9" />
              </g>
            </svg>

            <!-- framed photo -->
            <div class="relative rounded-[2rem] bg-white/85 p-3 ring-1 ring-white shadow-[0_18px_50px_-12px_rgba(232,105,157,0.35)]">
              <img
                :src="heroPhoto.src"
                :alt="heroPhoto.alt"
                class="aspect-square w-full rounded-3xl object-cover"
                :width="heroPhoto.width"
                :height="heroPhoto.height"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <span
                class="absolute -top-4 left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-linear-to-br from-sunny to-peachy shadow-md"
              >
                <Crown class="size-4 text-white" fill="currentColor" stroke-width="1.5" />
              </span>
            </div>
          </div>

          <!-- date & venue under the picture -->
          <div class="mt-6 flex w-full flex-col items-center gap-2.5">
            <span
              data-animate="chip"
              class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-plum shadow-md ring-2 ring-blush/50 whitespace-nowrap"
            >
              <CalendarDays class="size-4 shrink-0 text-blush" />
              {{ birthday.date.label }}
            </span>

            <!-- venue text under the picture -->
            <button
              data-animate="chip"
              class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-plum shadow-md ring-2 ring-blush/50 whitespace-nowrap"
              @click="openMaps"
              aria-label="Open {{ birthday.venue.name }} in Google Maps"
            >
              <MapPin class="size-4 shrink-0 text-lilac" />
              {{ birthday.venue.name }}
            </button>
          </div>

          <!-- sparkles orbiting the frame -->
          <span class="absolute -top-1 -right-3" aria-hidden="true">
            <Star class="size-6 animate-twinkle text-sunny" fill="currentColor" stroke-width="1.5" />
          </span>
          <span class="absolute top-1/3 -left-5" aria-hidden="true">
            <Star class="size-5 animate-twinkle [animation-delay:0.7s] text-lilac" fill="currentColor" stroke-width="1.5" />
          </span>
          <span class="absolute -bottom-3 -left-3" aria-hidden="true">
            <Sparkles class="size-7 animate-twinkle [animation-delay:1.2s] text-blush" />
          </span>
        </div>
      </div>
    </AppContainer>

    <!-- scroll hint -->
   <a
  href="#countdown"
  class="relative z-10 mt-2 mb-2 inline-flex shrink-0 self-center rounded-full bg-white/80 p-3 text-plum-soft shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-blush active:scale-95 sm:absolute sm:bottom-5 sm:left-1/2 sm:mb-0 sm:mt-0 sm:-translate-x-1/2"
  aria-label="Scroll to the countdown"
>
  <ArrowDown class="size-5 animate-bounce" />
</a>
  </section>
</template>
