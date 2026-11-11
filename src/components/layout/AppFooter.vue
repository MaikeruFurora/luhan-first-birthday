<script setup>
import { Heart, Sparkles, Mail } from '@lucide/vue'

import AppContainer from '@/components/ui/AppContainer.vue'
import { birthday } from '@/data/birthday'
</script>

 
<!-- 
<script setup>
import { Heart, Sparkles, Mail, Facebook, MapPin } from 'lucide-vue-next'

import AppContainer from '@/components/ui/AppContainer.vue'
import { birthday } from '@/data/birthday'
</script> -->

<template>
  <footer class="relative overflow-hidden border-t border-white/70 bg-gradient-to-b from-pastel-cream/70 to-white/90">

    <!-- Decorative background -->
    <div class="pointer-events-none absolute -left-12 bottom-0 size-40 rounded-full bg-pastel-pink/20 blur-3xl" />
    <div class="pointer-events-none absolute -right-12 top-0 size-40 rounded-full bg-pastel-lilac/20 blur-3xl" />

    <AppContainer>
      <div class="relative flex flex-col items-center gap-5 py-12 text-center">

        <!-- Decorative icon -->
        <div class="relative grid size-14 place-items-center rounded-full border border-white bg-gradient-to-br from-pastel-pink to-pastel-lilac shadow-lg shadow-pastel-pink/20">
          <Sparkles class="size-6 text-plum" />
          <span class="absolute -right-1 -top-1 text-sm">✨</span>
        </div>

        <!-- Closing message -->
        <div class="space-y-2">
          <p class="font-display text-2xl font-bold text-plum">
            Thank You for Celebrating!
          </p>

          <p class="mx-auto max-w-sm text-sm leading-relaxed text-plum-soft">
            Your presence makes this special day even more magical.
            We can't wait to celebrate with you!
          </p>
        </div>

       

        <!-- Divider -->
        <div class="h-px w-24 bg-gradient-to-r from-transparent via-pastel-lilac to-transparent" />

        <!-- Social links -->
        <div class="flex flex-wrap items-center justify-center gap-3">

          <a
  href="https://facebook.com/anyayadesigns"
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm text-plum shadow-sm ring-1 ring-white/60 transition-all hover:bg-white hover:text-lilac hover:ring-lilac active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.8H7.6v2.8h2.6V21h3.3z" />
  </svg>
  Anyaya Designs
</a>

          <a
            href="mailto:anyayadesigns@gmail.com"
            class="flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2.5 text-sm font-medium text-plum shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:text-lilac"
          >
            <Mail class="size-4" />
            anyayadesigns@gmail.com
          </a>

        </div>

        <!-- Brand signature -->
        <div class="space-y-1 pt-3">
          <p class="font-display text-sm font-bold tracking-widest text-plum">
            ANYAYA DESIGNS
          </p>

          <p class="text-[11px] tracking-wide text-plum-soft/70">
            Made with <Heart class="inline size-3 text-blush" fill="currentColor" /> and a little magic.
          </p>

          <p class="pt-2 text-[10px] text-plum-soft/50">
            © {{ new Date().getFullYear() }} Anya Designs. All rights reserved.
          </p>
        </div>

      </div>
    </AppContainer>
  </footer>
</template>
