<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// Audio element for background music
const audioRef = ref(null)
const isPlaying = ref(false)

// Simply set the audio source and play/pause on toggle
// No complex first-interaction delays - user clicks to toggle

// Set audio source on mount and try to play immediately
onMounted(() => {
  if (audioRef.value) {
    // Set the audio source file
    audioRef.value.src = '/music/bg-music.mp3'
    // Attempt to play - will be allowed after user interaction
    audioRef.value.play().catch(() => {
      // Browser autoplay policy - user needs to click first
      // This is expected and normal
    })
  }
})

// Clean up on unmount
onUnmounted(() => {
  audioRef.value?.pause()
})

// Toggle function - simple play/pause
function toggleMusic() {
  if (isPlaying.value) {
    audioRef.value?.pause()
    isPlaying.value = false
  } else {
    audioRef.value?.play().catch(() => {
      // Browser autoplay policy - user needs to click first
      // This is expected and normal
    })
    isPlaying.value = true
  }
}
</script>

<template>
  <button
    id="music-toggle"
    class="fixed bottom-4 right-4 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-lilac p-3 shadow-2xl shadow-pastel-pink/25 transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-pastel-lilac active:scale-95 focus:outline-none focus:ring-2 focus:ring-pastel-lilac focus:ring-offset-pastel-pink"
    aria-label="Toggle background music"
    @click="toggleMusic"
  >
    <svg
      class="size-5 flex squeeze-0 transition-colors group-hover:text-pastel-lilac"
      :fill="isPlaying ? 'currentColor' : 'currentColor'"
      aria-hidden="true"
      :viewBox="isPlaying ? '0 0 24 24' : '0 0 24 24'"
    >
      <path
        v-if="!isPlaying"
        d="M6 4v16l8-8-8-8z"
      />
      <path
        v-else
        d="M17 3h2v14H4V3zm12 4h-2v14h2V7zM4.97 4.97l1.41 1.41L4 10.83l1.41 1.41l10.59-10.59L20.83 4.97l-1.41 1.41L19.17 7.4l1.41 1.41L12 19.17 4.97 12.05z"
      />
    </svg>
  </button>
</template>

<style scoped>
#music-toggle {
  width: 48px;
  height: 48px;
}

@media (prefers-reduced-motion: reduce) {
  #music-toggle {
    animation: none;
  }
}
</style>