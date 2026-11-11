<script setup>
import { Heart, Sparkles } from '@lucide/vue'

import AppContainer from '@/components/ui/AppContainer.vue'
import { birthday } from '@/data/birthday'
</script>

<template>
  <footer class="border-t border-white/60 bg-white/60">
    <AppContainer>
      <div class="flex flex-col items-center gap-3 py-10 text-center">
        <span
          class="grid size-10 place-items-center rounded-full bg-linear-to-br from-pastel-butter to-pastel-peach shadow-sm"
        >
          <Sparkles class="size-5 text-peachy" />
        </span>

        <p class="flex flex-wrap items-center justify-center gap-1.5 font-display text-base font-bold text-plum">
          Made with
          <Heart class="size-4 text-blush" fill="currentColor" />
          for {{ birthday.baby.name }}'s first birthday
        </p>

        <p class="max-w-md text-pretty text-sm text-plum-soft">
          <a
            :href="birthday.venue.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="decoration-none text-plum-soft transition-colors hover:text-lilac"
          >
            {{ birthday.venue.name }}
          </a>
          · {{ birthday.date.label }}
        </p>
      </div>
    </AppContainer>
  </footer>
</template>
