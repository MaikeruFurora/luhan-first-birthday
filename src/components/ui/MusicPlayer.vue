
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false)

const audioSrc = '/music/bgmusic.mp3'

async function playMusic() {
  const audio = audioRef.value

  if (!audio || isLoading.value) return

  try {
    isLoading.value = true

    await audio.play()
    isPlaying.value = true
  } catch (error) {
    console.warn('Autoplay blocked or music unavailable:', error)
    isPlaying.value = false
  } finally {
    isLoading.value = false
  }
}

async function toggleMusic() {
  const audio = audioRef.value

  if (!audio) return

  if (isPlaying.value) {
    audio.pause()
    return
  }

  await playMusic()
}

function handleAudioEnded() {
  isPlaying.value = false
}

function handleAudioPause() {
  isPlaying.value = false
}

function handleAudioPlay() {
  isPlaying.value = true
}

function handlePageLoaded() {
  playMusic()
}

onMounted(() => {
  const audio = audioRef.value

  if (audio) {
    audio.volume = 0.5
  }

  // Play after the entire page has loaded
  if (document.readyState === 'complete') {
    playMusic()
  } else {
    window.addEventListener('load', handlePageLoaded, { once: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('load', handlePageLoaded)
  audioRef.value?.pause()
})
</script>

<template>
  <audio
    ref="audioRef"
    :src="audioSrc"
    loop
    preload="auto"
    @play="handleAudioPlay"
    @ended="handleAudioEnded"
    @pause="handleAudioPause"
  ></audio>

  <button
    id="music-toggle"
    type="button"
    @click="toggleMusic"
    :disabled="isLoading"
    :aria-label="isPlaying ? 'Pause music' : 'Play music'"
    class="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-lilac shadow-2xl shadow-pastel-pink/25 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pastel-lilac"
  >
    <!-- Play icon -->
    <svg
      v-if="!isPlaying"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>

    <!-- Pause icon -->
    <svg
      v-else
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  </button>
</template>
