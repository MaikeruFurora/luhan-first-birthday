import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * Live countdown to a target date. Ticks every second and cleans
 * up after itself. Once the target passes, `finished` flips true
 * and every unit reads 0 — perfect for switching to a
 * "today is the day!" state.
 *
 * @param {string|number|Date} target - party start (e.g. birthday.date.iso)
 * @returns {{
 *   days: import('vue').Ref<number>,
 *   hours: import('vue').Ref<number>,
 *   minutes: import('vue').Ref<number>,
 *   seconds: import('vue').Ref<number>,
 *   finished: import('vue').Ref<boolean>,
 * }}
 */
export function useCountdown(target) {
  const targetMs = new Date(target).getTime()

  const nowMs = ref(Date.now())
  let timer = null

  onMounted(() => {
    // setInterval (not rAF) so the countdown keeps time in
    // background tabs and doesn't burn battery on invisible frames.
    timer = setInterval(() => {
      nowMs.value = Date.now()
    }, 1000)
  })

  onUnmounted(() => clearInterval(timer))

  const remainingMs = computed(() => Math.max(0, targetMs - nowMs.value))

  return {
    days: computed(() => Math.floor(remainingMs.value / 86_400_000)),
    hours: computed(() => Math.floor(remainingMs.value / 3_600_000) % 24),
    minutes: computed(() => Math.floor(remainingMs.value / 60_000) % 60),
    seconds: computed(() => Math.floor(remainingMs.value / 1000) % 60),
    finished: computed(() => nowMs.value >= targetMs),
  }
}
