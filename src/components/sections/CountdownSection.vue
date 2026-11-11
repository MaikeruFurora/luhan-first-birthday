<script setup>
import { computed, ref } from 'vue'
import { Crown, Sparkles, Star } from '@lucide/vue'

import AppContainer from '@/components/ui/AppContainer.vue'
import FairyButterfly from '@/components/ui/FairyButterfly.vue'
import { useCountdown } from '@/composables/useCountdown'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { birthday } from '@/data/birthday'

const rootEl = ref(null)
useScrollReveal(rootEl, { stagger: 0.1, y: 24 })

const { days, hours, minutes, seconds, finished } = useCountdown(birthday.date.iso)

const pad = (n) => String(n).padStart(2, '0')

// Each card keeps its own pastel ring so the row reads like a
// little pastel rainbow without needing any extra decoration.
const units = computed(() => [
  { label: 'Days', value: String(days.value), ring: 'ring-pastel-pink' },
  { label: 'Hours', value: pad(hours.value), ring: 'ring-pastel-lavender' },
  { label: 'Mins', value: pad(minutes.value), ring: 'ring-pastel-blue' },
  { label: 'Secs', value: pad(seconds.value), ring: 'ring-pastel-mint' },
])
</script>

<template>
  <section
    id="countdown"
    ref="rootEl"
    class="relative overflow-hidden bg-linear-to-b from-cream via-pastel-butter/45 to-cream py-14 sm:py-16"
  >
    <!-- soft fairytale friends -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <span class="absolute top-[16%] left-[7%]">
        <Star class="size-5 animate-twinkle text-sunny" fill="currentColor" stroke-width="1.5" />
      </span>
      <span class="absolute top-[28%] right-[9%]">
        <Star class="size-6 animate-twinkle [animation-delay:0.8s] text-lilac" fill="currentColor" stroke-width="1.5" />
      </span>
      <span class="absolute bottom-[24%] left-[11%]">
        <Sparkles class="size-6 animate-twinkle [animation-delay:1.5s] text-blush" />
      </span>
      <span class="absolute right-[13%] bottom-[28%]">
        <span class="block animate-sway text-minty"><FairyButterfly :size="26" /></span>
      </span>
    </div>

    <AppContainer>
      <div class="relative text-center">
        <p data-reveal class="font-script text-script text-blush">
          Counting down to the magic
        </p>

        <h2 data-reveal class="mt-2 font-display text-section font-extrabold text-plum">
          {{ birthday.baby.name }}'s first birthday
        </h2>

        <p data-reveal class="mx-auto mt-3 max-w-md text-pretty text-base text-plum-soft">
          Join us on {{ birthday.date.label }} at {{ birthday.date.timeLabel }} — just a few
          wishes away!
        </p>

        <!-- ticking countdown -->
        <div v-if="!finished" data-reveal class="mt-8 grid grid-cols-4 gap-2.5 sm:gap-3.5">
          <div
            v-for="unit in units"
            :key="unit.label"
            class="rounded-2xl bg-white/85 px-1 py-4 shadow-sm ring-1"
            :class="unit.ring"
          >
            <p
              class="font-display text-[clamp(1.5rem,7vw,2.25rem)] leading-none font-extrabold text-plum tabular-nums"
            >
              {{ unit.value }}
            </p>
            <p class="mt-1.5 text-[0.68rem] font-bold tracking-[0.14em] text-plum-soft uppercase">
              {{ unit.label }}
            </p>
          </div>
        </div>

        <!-- party day state -->
        <div v-else data-reveal class="mt-8 flex flex-col items-center gap-3">
          <span
            class="grid size-12 place-items-center rounded-full bg-linear-to-br from-sunny to-peachy shadow-md"
          >
            <Crown class="size-6 text-white" fill="currentColor" stroke-width="1.5" />
          </span>
          <p class="font-display text-2xl font-extrabold text-plum">Today is the day!</p>
          <p class="text-base text-plum-soft">
            The celebration begins at {{ birthday.date.timeLabel }} — see you there!
          </p>
        </div>

        <p data-reveal class="mt-6 text-xs font-semibold tracking-wide text-plum-soft/80">
          <a
            :href="birthday.venue.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="decoration-none text-plum-soft/80 transition-colors hover:text-lilac"
          >
            {{ birthday.venue.name }}
          </a>
          · Please RSVP by {{ birthday.rsvp.deadline }}
        </p>
      </div>
    </AppContainer>
  </section>
</template>
