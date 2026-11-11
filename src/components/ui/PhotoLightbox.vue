<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, X } from '@lucide/vue'

import { usePrefersReducedMotion } from '@/composables/usePrefersReducedMotion'

/**
 * PhotoLightbox — full-screen "tap to view" photo viewer.
 *
 * - Opens with the gallery card's index via v-model (null = closed).
 * - Swipe left/right, arrow keys, dots and 48px+ prev/next buttons.
 * - Esc / backdrop tap / X button closes; focus returns to the
 *   card that opened it. Body scrolling is locked while open.
 * - Open/close and photo swaps are animated with GSAP (its ticker
 *   degrades gracefully to timers when rAF is unavailable), and
 *   every animation is skipped for prefers-reduced-motion.
 */
const props = defineProps({
  photos: { type: Array, required: true },
  /** Index of the open photo, or null when closed. */
  modelValue: { type: Number, default: null },
})
const emit = defineEmits(['update:modelValue'])

const isOpen = computed(() => props.modelValue !== null)
const activeIndex = computed(() => props.modelValue ?? 0)
const photo = computed(() => props.photos[activeIndex.value] ?? null)
const total = computed(() => props.photos.length)

const { prefersReducedMotion } = usePrefersReducedMotion()

const overlayEl = ref(null)
const imgEl = ref(null)
const closeButtonRef = ref(null)

// Drives the v-if — kept separate from the prop so we can fade
// the overlay out before unmounting it.
const visible = ref(false)

let lastFocused = null
let closeFallbackTimer = null

function close() {
  emit('update:modelValue', null)
}
function next() {
  emit('update:modelValue', (activeIndex.value + 1) % total.value)
}
function prev() {
  emit('update:modelValue', (activeIndex.value - 1 + total.value) % total.value)
}

function onKeydown(e) {
  if (!visible.value) return
  if (e.key === 'Escape') return close()
  if (e.key === 'ArrowRight') return next()
  if (e.key === 'ArrowLeft') return prev()

  // Keep keyboard focus inside the dialog while it is open.
  if (e.key === 'Tab' && overlayEl.value) {
    const focusables = overlayEl.value.querySelectorAll('button, [href]')
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

// Swipe with pointer events — only when the gesture is clearly
// horizontal, so vertical scrolls are never hijacked.
let pointerStart = null
function onPointerDown(e) {
  pointerStart = { x: e.clientX, y: e.clientY }
}
function onPointerUp(e) {
  if (!pointerStart) return
  const dx = e.clientX - pointerStart.x
  const dy = e.clientY - pointerStart.y
  pointerStart = null
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
    dx < 0 ? next() : prev()
  }
}

watch(isOpen, (open) => {
  clearTimeout(closeFallbackTimer)
  if (open) {
    lastFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    visible.value = true

    nextTick(() => {
      if (!prefersReducedMotion.value && overlayEl.value) {
        gsap.fromTo(
          overlayEl.value,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: 'power2.out' },
        )
      }
      // Move focus to the close button (setTimeout, not rAF, so it
      // also works when animation frames are unavailable).
      setTimeout(() => closeButtonRef.value?.focus(), 60)
    })
  } else {
    document.body.style.overflow = ''

    const hide = () => {
      visible.value = false
    }
    if (prefersReducedMotion.value || !overlayEl.value) {
      hide()
    } else {
      gsap.to(overlayEl.value, {
        opacity: 0,
        duration: 0.24,
        ease: 'power2.in',
        onComplete: hide,
      })
      // Safety net: never leave the overlay stuck if the ticker stalls.
      closeFallbackTimer = setTimeout(hide, 600)
    }

    lastFocused?.focus?.()
    lastFocused = null
  }
})

// Photo swap: a soft fade+scale on the new photo.
watch(activeIndex, () => {
  if (!visible.value || prefersReducedMotion.value || !imgEl.value) return
  gsap.fromTo(
    imgEl.value,
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' },
  )
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(closeFallbackTimer)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="overlayEl"
      class="fixed inset-0 z-[90] flex flex-col bg-plum/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      :aria-label="'Viewing photo ' + (activeIndex + 1) + ' of ' + total"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @click.self="close"
    >
      <!-- top bar: close button -->
      <div class="flex shrink-0 items-center justify-end p-3">
        <button
          ref="closeButtonRef"
          type="button"
          class="grid size-12 place-items-center rounded-full bg-white/85 text-plum shadow-md ring-1 ring-white/60 transition-transform active:scale-95 hover:text-blush"
          aria-label="Close photo viewer"
          @click="close"
        >
          <X class="size-6" aria-hidden="true" />
        </button>
      </div>

      <!-- the photo, shown whole (no cropping) -->
      <div class="flex min-h-0 flex-1 items-center justify-center px-4" @click.self="close">
        <img
          v-if="photo"
          ref="imgEl"
          :src="photo.src"
          :alt="photo.alt"
          class="max-h-full max-w-full rounded-3xl bg-white/85 p-2 shadow-2xl ring-1 ring-white/60"
          :width="photo.width"
          :height="photo.height"
          decoding="async"
          draggable="false"
        />
      </div>

      <!-- caption + controls -->
      <div
        v-if="photo"
        class="flex shrink-0 flex-col items-center gap-4 px-4 pt-4 pb-6 text-center"
      >
        <div>
          <p class="font-script text-3xl leading-snug text-white">{{ photo.caption }}</p>
          <p class="mt-1 text-xs font-bold tracking-[0.16em] text-white/70 uppercase">
            {{ activeIndex + 1 }} of {{ total }}
          </p>
        </div>

        <div class="flex items-center gap-5">
          <button
            type="button"
            class="grid size-12 place-items-center rounded-full bg-white/85 text-plum shadow-md transition-transform active:scale-95 hover:text-blush"
            aria-label="Previous photo"
            @click="prev"
          >
            <ChevronLeft class="size-6" aria-hidden="true" />
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="(p, i) in photos"
              :key="'lb-dot-' + p.src"
              type="button"
              class="grid h-12 w-7 place-items-center"
              :aria-label="'View photo ' + (i + 1)"
              :aria-current="i === activeIndex ? 'true' : undefined"
              @click="emit('update:modelValue', i)"
            >
              <span
                class="block h-2.5 rounded-full transition-all duration-300"
                :class="i === activeIndex ? 'w-5 bg-white' : 'w-2.5 bg-white/50'"
              ></span>
            </button>
          </div>

          <button
            type="button"
            class="grid size-12 place-items-center rounded-full bg-white/85 text-plum shadow-md transition-transform active:scale-95 hover:text-blush"
            aria-label="Next photo"
            @click="next"
          >
            <ChevronRight class="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
