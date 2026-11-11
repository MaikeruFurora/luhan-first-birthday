<script setup>
/**
 * AppContainer — the mobile-first content column.
 *
 * - Caps content at 480px (--container-invite) and centers it on
 *   larger screens, so phones, tablets and desktops all share the
 *   exact same primary experience.
 * - Horizontal padding stays inside the 20–24px thumb-comfort range.
 */
defineProps({
  /** Render as another element, e.g. "nav" or "footer". */
  as: { type: [String, Object], default: 'div' },
})
</script>

<template>
  <component :is="as" class="mx-auto w-full max-w-invite px-5 sm:px-6">
    <slot />
  </component>
</template>
