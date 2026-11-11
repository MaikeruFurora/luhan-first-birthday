<script setup>
/**
 * FairyButterfly — a tiny hand-drawn butterfly SVG.
 * Uses `currentColor`, so color it from the parent (e.g. text-lilac).
 */
defineProps({
  /** Rendered size in px. */
  size: { type: [Number, String], default: 28 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <!-- antennae -->
    <path
      d="M31 25 C29 20 26 17.5 24 17.5 M33 25 C35 20 38 17.5 40 17.5"
      fill="none"
      stroke="#5c4152"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <!-- upper wings -->
    <path d="M31 27 C22 12 4 10 5 24 C6 34 20 40 31 36 Z" />
    <path d="M33 27 C42 12 60 10 59 24 C58 34 44 40 33 36 Z" />
    <!-- lower wings -->
    <path d="M31 38 C22 36 10 40 11 49 C12 57 25 54 31 45 Z" opacity="0.75" />
    <path d="M33 38 C42 36 54 40 53 49 C52 57 39 54 33 45 Z" opacity="0.75" />
    <!-- body -->
    <rect x="30.6" y="24" width="2.8" height="24" rx="1.4" fill="#5c4152" />
  </svg>
</template>
